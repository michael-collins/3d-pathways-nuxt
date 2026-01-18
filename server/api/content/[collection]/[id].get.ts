/**
 * Fallback API endpoint for fetching content when queryCollection fails
 * This reads markdown files directly and parses them with gray-matter
 * Used as a fallback for Canvas LTI embeds or when Nuxt Content API fails
 */
import { promises as fs } from 'fs'
import { resolve, join } from 'path'
import matter from 'gray-matter'

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
  
  try {
    // Read the markdown file directly from content folder
    const contentDir = resolve(process.cwd(), 'content', collection)
    const filePath = join(contentDir, `${id}.md`)
    
    const fileContent = await fs.readFile(filePath, 'utf-8')
    
    // Parse frontmatter and content using gray-matter
    const { data: frontmatter, content } = matter(fileContent)
    
    // Return combined data matching what Nuxt Content provides
    return {
      ...frontmatter,
      path: `/${collection}/${id}`,
      stem: `${collection}/${id}`,
      slug: id,
      body: content,
      _id: `${collection}:${id}.md`,
      _path: `/${collection}/${id}`,
      _fallback: true, // Flag to indicate this came from fallback
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') {
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
