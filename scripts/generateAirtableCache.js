// scripts/generateAirtableCache.js
import { getAirtableRecords } from '../services/AirtableService.js'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

async function generateCache() {
  const tables = ['projects', 'exercises', 'licenses', 'files', 'competencies', 'pathways', 'specializations', 'rubrics', 'lessons', 'criteria', 'lectures'] // Add your table names here
  const cacheDir = path.resolve(process.cwd(), 'public/cache')
  await fs.mkdir(cacheDir, { recursive: true })

  for (const tableName of tables) {
    try {
      const data = await getAirtableRecords(tableName, process.env.AIRTABLE_API_KEY)
      const filteredData = data.filter(record => record?.fields?.published !== false) // Adjust filter if needed

      await fs.writeFile(
        path.join(cacheDir, `${tableName}.json`),
        JSON.stringify({
          timestamp: Date.now(),
          [tableName]: filteredData
        }, null, 2)
      )

      console.log(`Cache generated for ${tableName}`)
    } catch (error) {
      console.error(`Failed to generate cache for ${tableName}:`, error)
      process.exit(1)
    }
  }
}

generateCache()