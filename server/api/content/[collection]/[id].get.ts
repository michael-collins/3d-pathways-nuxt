/**
 * Fallback API endpoint for fetching content when queryCollection fails
 * This reads from pre-generated JSON cache files bundled as server assets
 * Used as a fallback for Canvas LTI embeds or when Nuxt Content API fails on Vercel
 */
import { promises as fs } from 'fs'
import { join, resolve } from 'path'

export default defineEventHandler(async (event) => {
  const { collection, id } = getRouterParams(event)
  
  // Validate collection to prevent directory traversal
  const allowedCollections = ['exercises', 'projects', 'lectures', 'pathways', 'specializations', 'docs']
  if (!allowedCollections.includes(collection)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid collection: ${collection}`
    })
  }
  
  // Validate id to prevent path traversal
  if (id.includes('/') || id.includes('..')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid content ID'
    })
  }
  
  const cacheFileName = `${id}.json`
  
  // Approach 1: Try Nitro server assets (works in production builds)
  try {
    const storage = useStorage('assets:server')
    const assetKey = `content-cache:${collection}:${cacheFileName}`
    
    if (await storage.hasItem(assetKey)) {
      const cached = await storage.getItem(assetKey)
      if (cached) {
        return typeof cached === 'string' ? JSON.parse(cached) : cached
      }
    }
  } catch (e) {
    // Server assets not available, try filesystem
  }
  
  // Approach 2: Direct filesystem read (works in dev and some deployments)
  const possiblePaths = [
    resolve(process.cwd(), 'public', 'content-cache', collection, cacheFileName),
    resolve(process.cwd(), '.output', 'public', 'content-cache', collection, cacheFileName),
  ]
  
  for (const filePath of possiblePaths) {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      return JSON.parse(content)
    } catch {
      // Try next path
    }
  }
  
  // Approach 3: Fetch from static files served by the app (last resort)
  try {
    const origin = getRequestURL(event).origin
    const response = await fetch(`${origin}/content-cache/${collection}/${cacheFileName}`)
    if (response.ok) {
      return await response.json()
    }
  } catch {
    // All approaches failed
  }
  
  throw createError({
    statusCode: 404,
    statusMessage: `Content not found: ${collection}/${id}`
  })
})
