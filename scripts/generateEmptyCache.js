#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create public/cache directory if it doesn't exist
const cacheDir = path.join(__dirname, '..', 'public', 'cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// List of all cache files that need to exist
const cacheFiles = [
  'licenses.json',
  'files.json', 
  'exercises.json',
  'projects.json',
  'lectures.json',
  'pathways.json',
  'specializations.json',
  'lessons.json',
  'criteria.json',
  'rubrics.json',
  'competencies.json'
];

console.log('Generating empty cache files...');

// Create each cache file with empty array
cacheFiles.forEach(filename => {
  const filePath = path.join(cacheDir, filename);
  fs.writeFileSync(filePath, '[]', 'utf8');
  console.log(`  ✓ Created ${filename}`);
});

console.log('Empty cache files generated successfully!');