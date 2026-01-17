import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const { collection, id } = getRouterParams(event)
  
  try {
    // Query content from the filesystem
    const content = await serverQueryContent(event)
      .where('_path', '=', `/${collection}/${id}`)
      .findOne()
    
    if (!content) {
      throw createError({
        statusCode: 404,
        statusMessage: `Content not found: /${collection}/${id}`
      })
    }
    
    return content
  } catch (error) {
    console.error('Content fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch content'
    })
  }
})
