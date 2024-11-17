// server/api/projects.ts
import { defineEventHandler, createError } from 'h3'
import Airtable from 'airtable'
import { useStorage } from '#internal/nitro'

const CACHE_KEY = 'airtable-projects'
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

interface AirtableFields {
  name: string
  slug: string
  description?: string
  published?: boolean
  [key: string]: any
}

interface AirtableRecord {
  id: string
  fields: AirtableFields
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const storage = useStorage('cache')

  if (!config.airtableApiKey) {
    throw createError({
      statusCode: 500,
      message: 'Airtable API key not configured'
    })
  }

  try {
    // Check cache first
    const cached = await storage.getItem(CACHE_KEY)
    if (cached) {
      const cachedData = JSON.parse(cached as string)
      if (cachedData.timestamp > Date.now() - CACHE_DURATION) {
        return { projects: cachedData.data }
      }
    }

    // Fetch fresh data
    const base = new Airtable({ apiKey: config.airtableApiKey })
      .base('appErImxpeRDom8je')
    
    const records = await base('projects')
      .select({ view: 'Grid view' })
      .all()
    
    const projects = records.map(record => ({
      id: record.id,
      fields: record.fields as AirtableFields
    }))

    // Cache the data
    await storage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: projects
    }))

    return { projects }
  } catch (error) {
    console.error('Airtable fetch error:', error)
    return { projects: [] } // Return empty array instead of throwing
  }
})