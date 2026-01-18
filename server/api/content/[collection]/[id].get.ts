/**
 * Fallback API endpoint for fetching content when queryCollection fails
 * This reads from pre-generated JSON cache files in /public/content-cache/
 * Used as a fallback for Canvas LTI embeds or when Nuxt Content API fails on Vercel
 */

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
  
  try {
    // Fetch from the pre-generated content cache in public folder
    const cacheUrl = `/content-cache/${collection}/${id}.json`
    
    // Use $fetch to get the cached content (works both locally and on Vercel)
    const cached = await $fetch(cacheUrl, {
      baseURL: getRequestURL(event).origin
    })
    
    return cached
  } catch (error: any) {
    if (error.statusCode === 404 || error.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: `Content not found: ${collection}/${id}`
      })
    }
    console.error('Content fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch content'
    })
  }
})
