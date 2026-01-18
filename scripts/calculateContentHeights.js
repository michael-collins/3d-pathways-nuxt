/**
 * Pre-calculate iframe heights for content pages
 * This script generates height data for LTI embeds to prevent Canvas scrollbars
 * Handles embedded videos, presentations, and responsive iframes
 */

import { promises as fs } from 'fs'
import { join } from 'path'
import puppeteer from 'puppeteer'

const CONTENT_TYPES = ['exercises', 'projects', 'lectures', 'pathways', 'specializations']
const OUTPUT_FILE = './public/content-heights.json'
const BASE_URL = 'http://localhost:3000'

// Typical iframe dimensions in Canvas LTI context
const CANVAS_IFRAME_WIDTH = 800 // Canvas typically uses around 800px width

async function calculateContentHeights() {
  console.log('🔍 Starting content height calculation...')
  
  const heights = {}
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  // Set viewport to typical Canvas iframe size
  await page.setViewport({ width: CANVAS_IFRAME_WIDTH, height: 1200 })
  
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
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 })
            
            // Wait for Vue components and MDC to render
            await page.waitForTimeout(2000)
            
            // Wait for iframes to load and layout to stabilize
            console.log(`    🎥 Waiting for iframes to load...`)
            await page.evaluate(() => {
              return new Promise((resolve) => {
                const iframes = document.querySelectorAll('iframe')
                if (iframes.length === 0) {
                  resolve(true)
                  return
                }
                
                let loadedCount = 0
                const totalIframes = iframes.length
                
                iframes.forEach((iframe) => {
                  if (iframe.complete) {
                    loadedCount++
                  } else {
                    iframe.addEventListener('load', () => {
                      loadedCount++
                      if (loadedCount >= totalIframes) {
                        resolve(true)
                      }
                    })
                    // Fallback timeout for stubborn iframes
                    setTimeout(() => {
                      loadedCount++
                      if (loadedCount >= totalIframes) {
                        resolve(true)
                      }
                    }, 3000)
                  }
                })
                
                // If all were already loaded
                if (loadedCount >= totalIframes) {
                  resolve(true)
                }
              })
            })
            
            // Additional wait for aspect ratio calculations to settle
            await page.waitForTimeout(1000)
            
            // Get the full content height after all content has loaded
            const height = await page.evaluate(() => {
              // Force layout recalculation
              document.body.style.display = 'none'
              document.body.offsetHeight
              document.body.style.display = ''
              
              return Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
              )
            })
            
            // Add padding for safety (Canvas needs extra space)
            const finalHeight = Math.ceil(height + 100)
            heights[collection][slug] = finalHeight
            
            console.log(`    ✅ ${slug}: ${finalHeight}px`)
            
          } catch (error) {
            console.warn(`    ⚠️  Failed to measure ${slug}:`, error.message)
            // Fallback height for content with iframes
            heights[collection][slug] = 1000
          }
          
          // Brief pause between measurements
          await page.waitForTimeout(500)
        }
      } catch (error) {
        console.warn(`⚠️  Could not read ${collection} directory:`, error.message)
      }
    }
    
    // Save heights to JSON file
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(heights, null, 2))
    console.log(`💾 Content heights saved to ${OUTPUT_FILE}`)
    console.log(`📊 Summary:`)
    
    for (const [collection, items] of Object.entries(heights)) {
      const count = Object.keys(items).length
      const avgHeight = count > 0 
        ? Math.round(Object.values(items).reduce((a, b) => a + b, 0) / count)
        : 0
      console.log(`   ${collection}: ${count} items, avg height: ${avgHeight}px`)
    }
    
  } finally {
    await browser.close()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  calculateContentHeights().catch(console.error)
}

export { calculateContentHeights }