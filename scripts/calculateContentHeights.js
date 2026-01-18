/**
 * Pre-calculate iframe heights for content pages
 * This script generates height data for LTI embeds to prevent Canvas scrollbars
 */

import { promises as fs } from 'fs'
import { join } from 'path'
import puppeteer from 'puppeteer'

const CONTENT_TYPES = ['exercises', 'projects', 'lectures', 'pathways', 'specializations']
const OUTPUT_FILE = './public/content-heights.json'
const BASE_URL = 'http://localhost:3000'

async function calculateContentHeights() {
  console.log('🔍 Starting content height calculation...')
  
  const heights = {}
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  // Set viewport to typical iframe size
  await page.setViewport({ width: 1200, height: 800 })
  
  try {
    for (const collection of CONTENT_TYPES) {
      console.log(`📏 Calculating heights for ${collection}...`)
      heights[collection] = {}
      
      // Get all content files for this collection
      const contentDir = `./content/${collection}`
      try {
        const files = await fs.readdir(contentDir)
        const mdFiles = files.filter(file => file.endsWith('.md'))
        
        for (const file of mdFiles) {
          const slug = file.replace('.md', '')
          const url = `${BASE_URL}/${collection}/${slug}?embed=true&hidePageElements=true`
          
          try {
            console.log(`  ⏱️  Measuring ${slug}...`)
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 })
            
            // Wait for content to load
            await page.waitForTimeout(1000)
            
            // Get the full content height
            const height = await page.evaluate(() => {
              return Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
              )
            })
            
            // Add some padding for safety
            heights[collection][slug] = Math.ceil(height + 50)
            console.log(`    ✅ ${slug}: ${heights[collection][slug]}px`)
            
          } catch (error) {
            console.warn(`    ⚠️  Failed to measure ${slug}:`, error.message)
            // Fallback height
            heights[collection][slug] = 800
          }
        }
      } catch (error) {
        console.warn(`⚠️  Could not read ${collection} directory:`, error.message)
      }
    }
    
    // Save heights to JSON file
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(heights, null, 2))
    console.log(`💾 Content heights saved to ${OUTPUT_FILE}`)
    
  } finally {
    await browser.close()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  calculateContentHeights().catch(console.error)
}

export { calculateContentHeights }