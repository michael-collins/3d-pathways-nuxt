/**
 * Generate a content cache for fallback API access on Vercel
 * This runs during build and creates JSON files with parsed markdown content
 */
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.resolve(__dirname, '../content');
const OUTPUT_DIR = path.resolve(__dirname, '../public/content-cache');

const COLLECTIONS = ['exercises', 'projects', 'lectures', 'pathways', 'specializations', 'docs'];

async function generateContentCache() {
  console.log('Generating content cache for fallback API...');
  
  // Ensure output directory exists
  await fs.ensureDir(OUTPUT_DIR);
  
  for (const collection of COLLECTIONS) {
    const collectionDir = path.join(CONTENT_DIR, collection);
    
    // Skip if collection directory doesn't exist
    if (!await fs.pathExists(collectionDir)) {
      console.log(`  Skipping ${collection} (directory not found)`);
      continue;
    }
    
    // Ensure collection output directory exists
    const collectionOutputDir = path.join(OUTPUT_DIR, collection);
    await fs.ensureDir(collectionOutputDir);
    
    // Read all markdown files in the collection
    const files = await fs.readdir(collectionDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    console.log(`  Processing ${collection}: ${mdFiles.length} files`);
    
    for (const file of mdFiles) {
      const filePath = path.join(collectionDir, file);
      const slug = path.basename(file, '.md');
      
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const { data: frontmatter, content: body } = matter(content);
        
        // Create the cached content object
        const cached = {
          ...frontmatter,
          path: `/${collection}/${slug}`,
          stem: `${collection}/${slug}`,
          slug,
          body,
          _id: `${collection}:${slug}.md`,
          _path: `/${collection}/${slug}`,
          _fallback: true,
        };
        
        // Write individual JSON file for each content item
        const outputPath = path.join(collectionOutputDir, `${slug}.json`);
        await fs.writeJson(outputPath, cached);
      } catch (error) {
        console.error(`  Error processing ${filePath}:`, error.message);
      }
    }
  }
  
  console.log('Content cache generation complete!');
}

generateContentCache().catch(console.error);
