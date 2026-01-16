// migrateToNuxtContent.js
import { getAirtableRecords } from '../services/AirtableService.js';
import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';
import slugify from 'slugify';

dotenv.config();

const apiKey = process.env.AIRTABLE_API_KEY;
const contentDir = './content';

// Mapping of Airtable record IDs to slugs
const idToSlugMap = new Map();
const recordCache = new Map();

// Utility: Create slug from name
function createSlug(name) {
  return slugify(name, { lower: true, strict: true });
}

// Utility: Get slug from record ID
function getSlugFromId(id, defaultName = 'unknown') {
  return idToSlugMap.get(id) || createSlug(defaultName);
}

// Utility: Convert Airtable attachment to local path
function getLocalFilePath(recordId, attachment, type = 'image', folder = 'exercises') {
  if (!attachment || !attachment.filename) return null;
  
  // Sanitize filename - replace spaces with underscores
  const sanitizedName = attachment.filename.replace(/\s+/g, '_');
  
  // Local files are stored as: rec{id}_{type}_{filename}
  // e.g., rec0apDu2F1wTfIoq_image_ianbrill_chess_set.png
  const localPath = `/assets/${folder}/${recordId}_${type}_${sanitizedName}`;
  
  return localPath;
}

// Utility: Get files for an exercise/project
function getFilesForRecord(recordId) {
  const files = recordCache.get('files') || [];
  const recordFiles = files.filter(file => {
    const fields = file.fields || {};
    return fields.exercises?.includes(recordId) || fields.projects?.includes(recordId);
  });
  
  return recordFiles.map(file => {
    const fields = file.fields || {};
    const attachments = fields.attachment || [];
    
    return {
      id: file.id,
      name: fields.name || fields.title || 'Untitled',
      description: fields.description,
      citation: fields.citation,
      sourceUrl: fields.sourceUrl,
      alt: fields.alt,
      attachments: attachments.map(att => ({
        filename: att.filename,
        url: `/assets/files/${file.id}_attachment_${att.filename.replace(/\s+/g, '_')}`,
        type: att.type,
        size: att.size
      }))
    };
  });
}

// Utility: Format array for YAML
function formatArray(arr) {
  if (!arr || arr.length === 0) return null;
  return arr;
}

// Utility: Escape YAML strings
function escapeYaml(str) {
  if (typeof str !== 'string') return str;
  // If string contains special chars, wrap in quotes
  if (str.includes(':') || str.includes('#') || str.includes('\n') || str.includes('"')) {
    return JSON.stringify(str);
  }
  return str;
}

// Utility: Generate frontmatter
function generateFrontmatter(data) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue;
    
    // Skip files - we'll add them separately
    if (key === 'files') continue;
    
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${key}:`);
      value.forEach(item => {
        if (typeof item === 'object') {
          lines.push(`  - ${JSON.stringify(item)}`);
        } else {
          lines.push(`  - ${escapeYaml(item)}`);
        }
      });
    } else if (typeof value === 'object') {
      lines.push(`${key}:`);
      const jsonStr = JSON.stringify(value, null, 2);
      jsonStr.split('\n').forEach(line => {
        lines.push(`  ${line}`);
      });
    } else {
      lines.push(`${key}: ${escapeYaml(value)}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

// Load cached files from public/cache
async function loadCachedFiles() {
  try {
    const filesPath = path.join('./public/cache', 'files.json');
    if (await fs.pathExists(filesPath)) {
      const filesData = await fs.readJson(filesPath);
      const files = filesData.files || [];
      recordCache.set('files', files);
      console.log(`  ✓ Loaded ${files.length} files from cache`);
      return files;
    }
  } catch (error) {
    console.error('  ✗ Error loading cached files:', error.message);
  }
  return [];
}

// Phase 1: Load all records and build ID -> slug mapping
async function loadAllRecords() {
  console.log('\n📚 Phase 1: Loading all Airtable records...\n');
  
  const tables = [
    'pathways',
    'specializations',
    'lessons',
    'lectures',
    'exercises',
    'projects',
    'rubrics',
    'criteria',
    'licenses'
  ];
  
  for (const table of tables) {
    try {
      console.log(`Loading ${table}...`);
      const records = await getAirtableRecords(table, apiKey);
      const published = records.filter(r => r.fields.published === true);
      
      recordCache.set(table, published);
      
      // Build ID to slug mapping
      published.forEach(record => {
        const name = record.fields.name || record.fields.title || `${table}-${record.id}`;
        const slug = createSlug(name);
        idToSlugMap.set(record.id, slug);
      });
      
      console.log(`  ✓ Loaded ${published.length} published records from ${table}`);
    } catch (error) {
      console.error(`  ✗ Error loading ${table}:`, error.message);
    }
  }
  
  // Load cached files
  await loadCachedFiles();
  
  console.log(`\n✓ Built mapping for ${idToSlugMap.size} records\n`);
}

// Create component data files for rubrics and licenses
async function createComponentData() {
  console.log('\n🧩 Creating component data files...\n');
  
  // Create data directory
  await fs.ensureDir(path.join(contentDir, 'data'));
  
  // Process rubrics
  const rubrics = recordCache.get('rubrics') || [];
  const criteria = recordCache.get('criteria') || [];
  
  // Create criteria lookup
  const criteriaById = new Map();
  criteria.forEach(c => {
    criteriaById.set(c.id, {
      id: c.id,
      name: c.fields.name,
      description: c.fields.description
    });
  });
  
  // Build rubric data with embedded criteria
  const rubricData = rubrics.map(rubric => {
    const criteriaIds = rubric.fields.criteria || [];
    const rubricCriteria = criteriaIds
      .map(id => criteriaById.get(id))
      .filter(Boolean);
    
    return {
      id: rubric.id,
      slug: getSlugFromId(rubric.id),
      name: rubric.fields.name,
      description: rubric.fields.description,
      criteria: rubricCriteria
    };
  });
  
  await fs.writeJson(
    path.join(contentDir, 'data', 'rubrics.json'),
    rubricData,
    { spaces: 2 }
  );
  console.log(`✓ Created rubrics.json with ${rubricData.length} rubrics`);
  
  // Process licenses
  const licenses = recordCache.get('licenses') || [];
  const licenseData = licenses.map(license => ({
    id: license.id,
    slug: getSlugFromId(license.id),
    name: license.fields.name.trim(),
    url: license.fields.url
  }));
  
  await fs.writeJson(
    path.join(contentDir, 'data', 'licenses.json'),
    licenseData,
    { spaces: 2 }
  );
  console.log(`✓ Created licenses.json with ${licenseData.length} licenses`);
  
  // Process files data organized by record type and ID
  const files = recordCache.get('files') || [];
  const filesData = {};
  const filesBySlug = {}; // Also create slug-based mapping
  
  files.forEach(file => {
    const fields = file.fields;
    const fileData = {
      id: file.id,
      name: fields.name,
      description: fields.caption || fields.description,
      citation: fields.citation,
      sourceUrl: fields.sourceUrl,
      alt: fields.alt,
      attachments: (fields.attachment || []).map(att => ({
        filename: att.filename,
        url: att.url, // Already has local path from cache
        type: att.type,
        size: att.size
      }))
    };
    
    // Add to exercises by ID
    (fields.exercises || []).forEach(exerciseId => {
      if (!filesData[exerciseId]) filesData[exerciseId] = [];
      filesData[exerciseId].push(fileData);
      
      // Also add by slug
      const exerciseSlug = getSlugFromId(exerciseId);
      if (!filesBySlug[exerciseSlug]) filesBySlug[exerciseSlug] = [];
      filesBySlug[exerciseSlug].push(fileData);
    });
    
    // Add to projects by ID
    (fields.projects || []).forEach(projectId => {
      if (!filesData[projectId]) filesData[projectId] = [];
      filesData[projectId].push(fileData);
      
      // Also add by slug
      const projectSlug = getSlugFromId(projectId);
      if (!filesBySlug[projectSlug]) filesBySlug[projectSlug] = [];
      filesBySlug[projectSlug].push(fileData);
    });
  });
  
  await fs.writeJson(
    path.join(contentDir, 'data', 'files.json'),
    filesData,
    { spaces: 2 }
  );
  console.log(`✓ Created files.json with files for ${Object.keys(filesData).length} records`);
  
  await fs.writeJson(
    path.join(contentDir, 'data', 'files-by-slug.json'),
    filesBySlug,
    { spaces: 2 }
  );
  console.log(`✓ Created files-by-slug.json with files for ${Object.keys(filesBySlug).length} slugs\n`);
}

// Migrate Pathways
async function migratePathways() {
  console.log('\n🛤️  Migrating Pathways...\n');
  
  const pathways = recordCache.get('pathways') || [];
  const pathwaysDir = path.join(contentDir, 'pathways');
  await fs.ensureDir(pathwaysDir);
  
  for (const record of pathways) {
    const fields = record.fields;
    const slug = getSlugFromId(record.id);
    
    // Get related specializations (note: current Airtable has exercises, we'll need specializations)
    const specializationIds = fields.specializations || [];
    const specializationSlugs = specializationIds.map(id => getSlugFromId(id));
    
    const frontmatter = {
      title: fields.name,
      slug: slug,
      type: 'oer:Course',
      description: fields.description || '',
      published: true,
      
      oer: {
        '@context': 'https://oerschema.org/',
        '@type': 'Course',
        courseCode: slug,
        name: fields.name,
        description: fields.description || '',
        teaches: fields.learningObjectives ? [fields.learningObjectives] : [],
        hasPart: specializationSlugs.map(s => ({
          slug: s,
          type: 'oer:LearningComponent'
        })),
        duration: 'PT6M',
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
      }
    };
    
    const content = `
# ${fields.name}

${fields.description || ''}

## Learning Objectives

${fields.learningObjectives || 'To be defined'}

## Examples

${fields.examples || ''}

## Specializations

This pathway includes the following specializations:

${specializationSlugs.map(s => `- [${s}](/specializations/${s})`).join('\n')}
`;
    
    const markdown = generateFrontmatter(frontmatter) + '\n' + content;
    
    await fs.writeFile(
      path.join(pathwaysDir, `${slug}.md`),
      markdown
    );
    
    console.log(`✓ Created pathway: ${slug}.md`);
  }
}

// Migrate Specializations
async function migrateSpecializations() {
  console.log('\n🎯 Migrating Specializations...\n');
  
  const specializations = recordCache.get('specializations') || [];
  const specializationsDir = path.join(contentDir, 'specializations');
  await fs.ensureDir(specializationsDir);
  
  for (const record of specializations) {
    const fields = record.fields;
    const slug = getSlugFromId(record.id);
    
    // Get related lessons
    const lessonIds = fields.lessons || [];
    const lessonSlugs = lessonIds.map(id => getSlugFromId(id));
    
    // Parse learning objectives if string
    let learningObjectives = [];
    if (fields.learningObjectives) {
      if (Array.isArray(fields.learningObjectives)) {
        learningObjectives = fields.learningObjectives;
      } else if (typeof fields.learningObjectives === 'string') {
        learningObjectives = fields.learningObjectives
          .split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.\s*/, '').trim());
      }
    }
    
    const frontmatter = {
      title: fields.name,
      slug: slug,
      type: 'oer:LearningComponent',
      whoItsFor: fields.whoItsFor || fields['Who it\'s for'] || '',
      targetRole: fields.targetRole || '',
      prerequisite: fields.prerequisitePathway || null,
      published: true,
      
      oer: {
        '@context': 'https://oerschema.org/',
        '@type': 'LearningComponent',
        name: fields.name,
        componentType: 'Unit',
        teaches: learningObjectives,
        hasPart: lessonSlugs.map(s => ({
          slug: s,
          type: 'oer:LearningComponent'
        })),
        duration: 'PT8W',
        educationalLevel: fields.educationalLevel || 'Beginner',
        inLanguage: 'en-US',
        license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
      }
    };
    
    if (fields.competencyRequired) {
      const competencies = Array.isArray(fields.competencyRequired) 
        ? fields.competencyRequired 
        : fields.competencyRequired.split('\n').filter(c => c.trim());
      frontmatter.oer.competencyRequired = competencies;
    }
    
    const content = `
# ${fields.name}

## Who It's For

${fields.whoItsFor || fields['Who it\'s for'] || 'To be defined'}

## Learning Objectives

${learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

${fields.notes ? `## Notes\n\n${fields.notes}` : ''}

## Lessons

${lessonSlugs.map(s => `- [${s}](/lessons/${s})`).join('\n') || 'To be defined'}

${fields.testingOutRequirements ? `
## Testing Out Requirements

${fields.testingOutRequirements}
` : ''}
`;
    
    const markdown = generateFrontmatter(frontmatter) + '\n' + content;
    
    await fs.writeFile(
      path.join(specializationsDir, `${slug}.md`),
      markdown
    );
    
    console.log(`✓ Created specialization: ${slug}.md`);
  }
}

// Migrate Lessons
async function migrateLessons() {
  console.log('\n📖 Migrating Lessons...\n');
  
  const lessons = recordCache.get('lessons') || [];
  const lessonsDir = path.join(contentDir, 'lessons');
  await fs.ensureDir(lessonsDir);
  
  for (const record of lessons) {
    const fields = record.fields;
    const slug = getSlugFromId(record.id);
    
    // Get related content
    const lectureIds = fields.lectures || [];
    const exerciseIds = fields.exercises || [];
    const projectIds = fields.projects || [];
    
    const lectureSlugs = lectureIds.map(id => getSlugFromId(id));
    const exerciseSlugs = exerciseIds.map(id => getSlugFromId(id));
    const projectSlugs = projectIds.map(id => getSlugFromId(id));
    
    const frontmatter = {
      title: fields.name,
      slug: slug,
      type: 'oer:LearningComponent',
      order: fields.order || 0,
      published: true,
      
      oer: {
        '@context': 'https://oerschema.org/',
        '@type': 'LearningComponent',
        name: fields.name,
        componentType: 'Lesson',
        teaches: fields.teaches || [],
        hasSupportingMaterial: lectureSlugs.map(s => ({
          slug: s,
          type: 'oer:SupportingMaterial',
          materialType: 'Lecture'
        })),
        hasPractice: exerciseSlugs.map(s => ({
          slug: s,
          type: 'oer:Practice'
        })),
        hasAssessment: projectSlugs.map(s => ({
          slug: s,
          type: 'oer:Assessment'
        })),
        duration: 'PT2W',
        educationalLevel: fields.educationalLevel || 'Beginner'
      },
      
      isPartOf: fields.specialization ? [{
        slug: getSlugFromId(fields.specialization),
        type: 'oer:LearningComponent'
      }] : []
    };
    
    const content = `
# ${fields.name}

${fields.description || ''}

## Lectures

${lectureSlugs.map(s => `- [${s}](/lectures/${s})`).join('\n') || 'No lectures yet'}

## Exercises

${exerciseSlugs.map(s => `- [${s}](/exercises/${s})`).join('\n') || 'No exercises yet'}

## Projects

${projectSlugs.map(s => `- [${s}](/projects/${s})`).join('\n') || 'No projects yet'}
`;
    
    const markdown = generateFrontmatter(frontmatter) + '\n' + content;
    
    await fs.writeFile(
      path.join(lessonsDir, `${slug}.md`),
      markdown
    );
    
    console.log(`✓ Created lesson: ${slug}.md`);
  }
}

// Migrate Lectures
async function migrateLectures() {
  console.log('\n📊 Migrating Lectures...\n');
  
  const lectures = recordCache.get('lectures') || [];
  const lecturesDir = path.join(contentDir, 'lectures');
  await fs.ensureDir(lecturesDir);
  
  for (const record of lectures) {
    const fields = record.fields;
    const slug = getSlugFromId(record.id);
    
    const frontmatter = {
      title: fields.name,
      slug: slug,
      type: 'oer:SupportingMaterial',
      googleSlidesID: fields.googleSlidesID || '',
      topics: Array.isArray(fields.topics) ? fields.topics : (fields.topics ? [fields.topics] : []),
      author: fields.author || '',
      published: true,
      
      oer: {
        '@context': 'https://oerschema.org/',
        '@type': 'SupportingMaterial',
        name: fields.name,
        materialType: 'Slide Deck',
        about: Array.isArray(fields.topics) ? fields.topics : (fields.topics ? [fields.topics] : []),
        encodingFormat: 'application/vnd.google-apps.presentation',
        duration: 'PT45M',
        inLanguage: 'en-US',
        license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
      },
      
      isPartOf: fields.lesson ? [{
        slug: getSlugFromId(fields.lesson),
        type: 'oer:LearningComponent'
      }] : []
    };
    
    const content = `
# ${fields.name}

${fields.description || ''}

${fields.googleSlidesID ? `
## Presentation

::iframe-component
---
src: https://docs.google.com/presentation/d/${fields.googleSlidesID}/embed
title: ${fields.name}
---
::
` : ''}

${frontmatter.topics && frontmatter.topics.length ? `
## Topics Covered

${frontmatter.topics.map(t => `- ${t}`).join('\n')}
` : ''}
`;
    
    const markdown = generateFrontmatter(frontmatter) + '\n' + content;
    
    await fs.writeFile(
      path.join(lecturesDir, `${slug}.md`),
      markdown
    );
    
    console.log(`✓ Created lecture: ${slug}.md`);
  }
}

// Migrate Exercises
async function migrateExercises() {
  console.log('\n✏️  Migrating Exercises...\n');
  
  const exercises = recordCache.get('exercises') || [];
  const exercisesDir = path.join(contentDir, 'exercises');
  await fs.ensureDir(exercisesDir);
  
  for (const record of exercises) {
    const fields = record.fields;
    const slug = getSlugFromId(record.id);
    
    // Get difficulty
    const difficulty = Array.isArray(fields.difficulty) 
      ? fields.difficulty[0] 
      : fields.difficulty || 'beginner';
    
    // Get license
    const licenseId = Array.isArray(fields.licenses) ? fields.licenses[0] : fields.licenses;
    const licenseSlug = licenseId ? getSlugFromId(licenseId) : null;
    
    // Get rubric
    const rubricId = Array.isArray(fields.rubric) ? fields.rubric[0] : fields.rubric;
    const rubricSlug = rubricId ? getSlugFromId(rubricId) : null;
    
    // Get AI usage constraints (to be added to Airtable schema)
    const aiWriting = fields.aiUsageWriting || null;
    const aiImages = fields.aiUsageImages || null;
    const aiCode = fields.aiUsageCode || null;
    
    // Get associated files
    const exerciseFiles = getFilesForRecord(record.id);
    
    // Parse learning objectives
    let learningObjectives = [];
    if (fields.learningObjectives) {
      learningObjectives = fields.learningObjectives
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, '').trim());
    }
    
    // Simplified frontmatter - just essential metadata
    const frontmatter = {
      recordId: record.id,
      title: fields.name,
      slug: slug,
      type: 'oer:Practice',
      difficulty: difficulty,
      youtubePlaylistID: fields.youtubePlaylistID || null,
      vimeoPlaylistID: fields.vimeoPlaylistID || null,
      image: getLocalFilePath(record.id, fields.image?.[0], 'image'),
      imageAlt: fields.image?.[0]?.filename || fields.name,
      license: licenseSlug,
      rubric: rubricSlug,
      tags: fields.topics || null,
      aiUsageWriting: aiWriting,
      aiUsageImages: aiImages,
      aiUsageCode: aiCode,
      published: true
    };
    
    const content = `
# ${fields.name}

${fields.description || ''}

${fields.youtubePlaylistID ? `
## Tutorial Video

::iframe-component
---
src: https://youtube.com/embed/videoseries?list=${fields.youtubePlaylistID}
title: ${fields.name} Tutorial
---
::
` : ''}

## Learning Objectives

${learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

## Instructions

${fields.instructions || 'Instructions to be added'}

${(aiWriting || aiImages || aiCode) ? `
## AI Usage Policy

::aiul-component
---
title: ${fields.name}
slug: ${slug}${aiWriting ? `
writing: ${aiWriting}` : ''}${aiImages ? `
images: ${aiImages}` : ''}${aiCode ? `
code: ${aiCode}` : ''}
---
::
` : ''}

${rubricSlug ? `
## Grading Rubric

::rubric-component{id="${rubricSlug}"}
::
` : ''}

${licenseSlug ? `
## License

::license-component{id="${licenseSlug}"}
::
` : ''}
`;
    
    const markdown = generateFrontmatter(frontmatter) + '\n' + content;
    
    await fs.writeFile(
      path.join(exercisesDir, `${slug}.md`),
      markdown
    );
    
    console.log(`✓ Created exercise: ${slug}.md`);
  }
}

// Migrate Projects
async function migrateProjects() {
  console.log('\n🎨 Migrating Projects...\n');
  
  const projects = recordCache.get('projects') || [];
  const projectsDir = path.join(contentDir, 'projects');
  await fs.ensureDir(projectsDir);
  
  for (const record of projects) {
    const fields = record.fields;
    const slug = getSlugFromId(record.id);
    
    // Get difficulty
    const difficulty = Array.isArray(fields.difficulty) 
      ? fields.difficulty[0] 
      : fields.difficulty || 'intermediate';
    
    // Get license
    const licenseId = Array.isArray(fields.licenses) ? fields.licenses[0] : fields.licenses;
    const licenseSlug = licenseId ? getSlugFromId(licenseId) : null;
    
    // Get rubric
    const rubricId = Array.isArray(fields.rubric) ? fields.rubric[0] : fields.rubric;
    const rubricSlug = rubricId ? getSlugFromId(rubricId) : null;
    
    // Get AI usage constraints (to be added to Airtable schema)
    const aiWriting = fields.aiUsageWriting || null;
    const aiImages = fields.aiUsageImages || null;
    const aiCode = fields.aiUsageCode || null;
    
    // Get associated files
    const projectFiles = getFilesForRecord(record.id);
    
    // Parse learning objectives
    let learningObjectives = [];
    if (fields.learningObjectives) {
      learningObjectives = fields.learningObjectives
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, '').trim());
    }
    
    const frontmatter = {
      recordId: record.id,
      title: fields.name,
      slug: slug,
      type: 'oer:Assessment',
      difficulty: difficulty,
      youtubePlaylistID: fields.youtubePlaylistID || null,
      vimeoPlaylistID: fields.vimeoPlaylistID || null,
      image: getLocalFilePath(record.id, fields.image?.[0], 'image', 'projects'),
      imageAlt: fields.image?.[0]?.filename || fields.name,
      license: licenseSlug,
      rubric: rubricSlug,
      tags: fields.topics || null,
      aiUsageWriting: aiWriting,
      aiUsageImages: aiImages,
      aiUsageCode: aiCode,
      published: true
    };
    
    const content = `
# ${fields.name}

${fields.description || ''}

## Learning Objectives

${learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

## Requirements

${fields.requirements || 'Requirements to be added'}

## Instructions

${fields.instructions || 'Instructions to be added'}

${(aiWriting || aiImages || aiCode) ? `
## AI Usage Policy

::aiul-component
---
title: ${fields.name}
slug: ${slug}${aiWriting ? `
writing: ${aiWriting}` : ''}${aiImages ? `
images: ${aiImages}` : ''}${aiCode ? `
code: ${aiCode}` : ''}
---
::
` : ''}

${rubricSlug ? `
## Grading Rubric

::rubric-component{id="${rubricSlug}"}
::
` : ''}

${licenseSlug ? `
## License

::license-component{id="${licenseSlug}"}
::
` : ''}
`;
    
    const markdown = generateFrontmatter(frontmatter) + '\n' + content;
    
    await fs.writeFile(
      path.join(projectsDir, `${slug}.md`),
      markdown
    );
    
    console.log(`✓ Created project: ${slug}.md`);
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting Airtable to Nuxt Content Migration\n');
  console.log('=' .repeat(50));
  
  try {
    // Phase 1: Load all records
    await loadAllRecords();
    
    // Phase 2: Create component data
    await createComponentData();
    
    // Phase 3: Migrate content
    await migratePathways();
    await migrateSpecializations();
    await migrateLessons();
    await migrateLectures();
    await migrateExercises();
    await migrateProjects();
    
    console.log('\n' + '='.repeat(50));
    console.log('✨ Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Review generated content in ./content/');
    console.log('2. Create Rubric and License components');
    console.log('3. Test with Nuxt Content queries');
    console.log('4. Update navigation and routing');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate();
