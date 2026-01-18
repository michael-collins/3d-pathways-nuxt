/**
 * Server middleware to handle CORS for Nuxt Content API endpoints
 * This is needed for Canvas LTI embeds which make cross-origin POST requests
 */
import { defineEventHandler, getRequestURL, setResponseHeaders, getMethod } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  
  // Only apply to Nuxt Content API endpoints
  if (url.pathname.startsWith('/__nuxt_content')) {
    // Set CORS headers
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400'
    })
    
    // Handle preflight OPTIONS request
    if (getMethod(event) === 'OPTIONS') {
      event.node.res.statusCode = 204
      event.node.res.statusMessage = 'No Content'
      return ''
    }
  }
})
