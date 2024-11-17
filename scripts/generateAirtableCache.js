// generateAirtableCache.js
import { getAirtableRecords } from '../services/AirtableService.js';
import fetch from 'node-fetch'; // Only if Node.js < 18
import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Utility function to sanitize filenames by replacing spaces and special characters
function sanitizeFileName(filename) {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

// Utility function to generate a safe filename using 'filename'
function generateFileName(filename, suffix = '') {
  // Sanitize filename
  const sanitizedFilename = sanitizeFileName(filename.replace(/\s+/g, '_'));
  
  const baseName = path.basename(sanitizedFilename, path.extname(sanitizedFilename)); // Remove extension
  const extension = path.extname(sanitizedFilename); // Get extension
  return suffix ? `${baseName}_${suffix}${extension}` : sanitizedFilename;
}

// Utility function to sanitize field keys by replacing spaces with underscores
function sanitizeFieldKey(fieldKey) {
  return fieldKey.replace(/\s+/g, '_');
}

// Utility function to extract the file extension from a URL
function getExtensionFromUrl(url) {
  try {
    const parsedUrl = new URL(url, 'http://dummybase'); // Base URL is required to parse relative URLs
    return path.extname(parsedUrl.pathname) || '';
  } catch (error) {
    console.error(`Invalid URL: ${url}`);
    return '';
  }
}

// Utility function to download a file with retry and skip if exists
async function downloadFileWithRetry(url, outputPath, retries = 3) {
  // Check if the file already exists
  if (await fs.pathExists(outputPath)) {
    console.log(`File already exists at ${outputPath}. Skipping download.`);
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.statusText}`);
      }
      const buffer = await response.buffer();

      // Ensure the directory exists
      await fs.mkdirp(path.dirname(outputPath));

      await fs.outputFile(outputPath, buffer);
      console.log(`Downloaded ${url} to ${outputPath}`);
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed to download ${url}:`, error);
      if (attempt === retries) {
        console.error(`Failed to download ${url} after ${retries} attempts`);
        // Log the error to a file
        await fs.appendFile('download-errors.log', `${new Date().toISOString()} - Failed to download ${url}\n`);
        return;
      }
      // Wait before retrying
      await new Promise(res => setTimeout(res, 1000 * attempt));
    }
  }
}

// Function to determine if a file type should be processed
function shouldProcessFile(fileType) {
  const allowedTypes = [
    /^image\//, // All image types
    /^application\/pdf$/, // PDF files
    /^application\/vnd\.openxmlformats-officedocument\.(wordprocessingml\.document|spreadsheetml\.document|presentationml\.presentation)$/, // DOCX, XLSX, PPTX
    /^application\/octet-stream$/, // Generic binary
    // Add more regex patterns here if needed
  ];

  return allowedTypes.some(regex => regex.test(fileType));
}

// Function to process and cache records
async function processTable(tableName, data, assetsDir) {
  const filteredData = data.filter(record => record?.fields?.published === true); // Adjust filter if needed

  // Process assets in records
  for (const record of filteredData) {
    for (const [fieldKey, fieldValue] of Object.entries(record.fields)) {

      const sanitizedFieldKey = sanitizeFieldKey(fieldKey);

      // Handle array fields (e.g., multiple attachments)
      if (Array.isArray(fieldValue)) {
        record.fields[fieldKey] = await Promise.all(
          fieldValue.map(async (file) => {
            if (file.type && shouldProcessFile(file.type)) {
              
              // Use 'filename' to generate the filename with extension
              const mainFileName = `${record.id}_${sanitizedFieldKey}_${generateFileName(file.filename)}`;
              const mainLocalPath = `assets/${tableName}/${mainFileName}`; // Relative path
              const mainAbsolutePath = path.resolve(process.cwd(), 'public', mainLocalPath);

              await downloadFileWithRetry(file.url, mainAbsolutePath);

              // Initialize updated file object
              const updatedFile = {
                ...file,
                url: (await fs.pathExists(mainAbsolutePath)) ? `/${mainLocalPath}` : file.url, // Update URL to point to the local asset
              };

              // Process thumbnails if they exist
              if (file.thumbnails) {
                const updatedThumbnails = {};
                for (const [thumbKey, thumbValue] of Object.entries(file.thumbnails)) {
                  if (thumbValue.url) {
                    const sanitizedThumbKey = sanitizeFieldKey(thumbKey);
                    
                    // Extract extension from thumbnail URL
                    let thumbExtension = getExtensionFromUrl(thumbValue.url).toLowerCase();
                    if (!thumbExtension || thumbExtension === path.extname(file.filename).toLowerCase()) {
                      thumbExtension = '.jpg'; // Default to .jpg if no extension or same as main file
                    }

                    const thumbFileName = `${record.id}_${sanitizedFieldKey}_thumbnail_${sanitizedThumbKey}_${generateFileName(file.filename, `thumbnail_${sanitizedThumbKey}`)}`;
                    
                    // Replace the main file's extension with the thumbnail's extension
                    const thumbFileNameWithExt = thumbFileName.replace(path.extname(thumbFileName), thumbExtension);

                    const thumbLocalPath = `assets/${tableName}/${thumbFileNameWithExt}`;
                    const thumbAbsolutePath = path.resolve(process.cwd(), 'public', thumbLocalPath);

                    await downloadFileWithRetry(thumbValue.url, thumbAbsolutePath);

                    updatedThumbnails[sanitizedThumbKey] = {
                      ...thumbValue,
                      url: (await fs.pathExists(thumbAbsolutePath)) ? `/${thumbLocalPath}` : thumbValue.url,
                    };
                  }
                }
                updatedFile.thumbnails = updatedThumbnails;
              }

              // Return updated file object only if main download succeeded
              if (await fs.pathExists(mainAbsolutePath)) {
                console.log(`Processed file: ${file.filename} -> ${updatedFile.url}`);
                return updatedFile;
              }
              return file; // Return original if main download fails
            }
            return file; // Return original if not an asset type you're handling
          })
        );
      }

      // Handle object fields representing single attachments
      else if (typeof fieldValue === 'object' && fieldValue.url && fieldValue.type) {
        const file = record.fields[fieldKey];
        if (file && shouldProcessFile(file.type)) {
          
          // Use 'filename' to generate the filename with extension
          const mainFileName = `${record.id}_${sanitizedFieldKey}_${generateFileName(file.filename)}`;
          const mainLocalPath = `assets/${tableName}/${mainFileName}`; // Relative path
          const mainAbsolutePath = path.resolve(process.cwd(), 'public', mainLocalPath);

          await downloadFileWithRetry(file.url, mainAbsolutePath);

          // Initialize updated file object
          const updatedFile = {
            ...file,
            url: (await fs.pathExists(mainAbsolutePath)) ? `/${mainLocalPath}` : file.url,
          };

          // Process thumbnails if they exist
          if (file.thumbnails) {
            const updatedThumbnails = {};
            for (const [thumbKey, thumbValue] of Object.entries(file.thumbnails)) {
              if (thumbValue.url) {
                const sanitizedThumbKey = sanitizeFieldKey(thumbKey);
                
                // Extract extension from thumbnail URL
                let thumbExtension = getExtensionFromUrl(thumbValue.url).toLowerCase();
                if (!thumbExtension || thumbExtension === path.extname(file.filename).toLowerCase()) {
                  thumbExtension = '.jpg'; // Default to .jpg if no extension or same as main file
                }

                const thumbFileName = `${record.id}_${sanitizedFieldKey}_thumbnail_${sanitizedThumbKey}_${generateFileName(file.filename, `thumbnail_${sanitizedThumbKey}`)}`;
                
                // Replace the main file's extension with the thumbnail's extension
                const thumbFileNameWithExt = thumbFileName.replace(path.extname(thumbFileName), thumbExtension);

                const thumbLocalPath = `assets/${tableName}/${thumbFileNameWithExt}`;
                const thumbAbsolutePath = path.resolve(process.cwd(), 'public', thumbLocalPath);

                await downloadFileWithRetry(thumbValue.url, thumbAbsolutePath);

                updatedThumbnails[sanitizedThumbKey] = {
                  ...thumbValue,
                  url: (await fs.pathExists(thumbAbsolutePath)) ? `/${thumbLocalPath}` : thumbValue.url,
                };
              }
            }
            updatedFile.thumbnails = updatedThumbnails;
          }

          // Update the record's field to point to the local asset only if main download succeeded
          if (await fs.pathExists(mainAbsolutePath)) {
            console.log(`Processed file: ${file.filename} -> ${updatedFile.url}`);
            record.fields[fieldKey] = updatedFile;
          }
        }
      }

      // Handle string fields that are URLs (e.g., fields ending with '_url')
      else if (typeof fieldValue === 'string' && fieldValue.startsWith('http')) {
        const fileUrl = fieldValue;

        // Identify fields that should contain file URLs
        // Adjust the condition based on your Airtable schema
        if (fieldKey.endsWith('_url')) {
          // Attempt to find the corresponding filename from 'files' or similar fields
          // This part may need customization based on your Airtable setup

          const fileNameMatch = fileUrl.match(/\/([^\/]+\.[a-zA-Z0-9]+)(?:\?.*)?$/);
          const filename = fileNameMatch ? fileNameMatch[1] : 'downloaded_file';

          const fileNameWithPath = `${record.id}_${sanitizedFieldKey}_${generateFileName(filename)}`;
          const localPath = `assets/${tableName}/${fileNameWithPath}`; // Relative path
          const absolutePath = path.resolve(process.cwd(), 'public', localPath);

          await downloadFileWithRetry(fileUrl, absolutePath);

          // Update the field to point to the local asset only if download succeeded
          if (await fs.pathExists(absolutePath)) {
            record.fields[fieldKey] = `/${localPath}`;
            console.log(`Processed URL field: ${fieldKey} -> /${localPath}`);
          }
        }
      }
    }
  }

  // Save the processed data with local asset URLs
  const outputData = {
    timestamp: Date.now(),
    [tableName]: filteredData,
  };

  const cacheFilePath = path.join('public', 'cache', `${tableName}.json`);
  await fs.writeFile(cacheFilePath, JSON.stringify(outputData, null, 2));
  console.log(`Cache generated for ${tableName}`);
}

// Main function to generate cache
async function generateCache() {
  const tables = [
    'projects',
    'exercises',
    'criteria',
    'lectures',
    'lessons',
    'pathways',
    'rubrics',
    'specializations',
    'files' // Add the 'files' table here
  ];
  const cacheDir = path.resolve(process.cwd(), 'public/cache');
  const assetsDir = path.resolve(process.cwd(), 'public/assets');

  // Ensure cache and assets directories exist
  await fs.mkdirp(cacheDir);
  await fs.mkdirp(assetsDir);

  for (const tableName of tables) {
    try {
      console.log(`Processing table: ${tableName}`);
      const data = await getAirtableRecords(tableName, process.env.AIRTABLE_API_KEY);
      if (!data || data.length === 0) {
        console.warn(`No records found for table: ${tableName}`);
        continue;
      }
      await processTable(tableName, data, assetsDir);
    } catch (error) {
      console.error(`Failed to generate cache for ${tableName}:`, error);
      // Continue with next table instead of exiting
    }
  }
}

generateCache();