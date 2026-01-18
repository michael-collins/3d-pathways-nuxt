/**
 * Fallback API endpoint for fetching content when queryCollection fails
 * This fetches from static content-cache files served by the public directory
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
  
  // Fetch from static files served by the app (works everywhere)
  try {
    const origin = getRequestURL(event).origin
    const response = await $fetch(`${origin}/content-cache/${collection}/${id}.json`)
    
    // Mark as fallback content for testing purposes
    if (response && typeof response === 'object') {
      response._fallback = true
    }
    
    return response
  } catch (fetchError) {
    throw createError({
      statusCode: 404,
      statusMessage: `Content not found: ${collection}/${id}`
    })
  }
})
