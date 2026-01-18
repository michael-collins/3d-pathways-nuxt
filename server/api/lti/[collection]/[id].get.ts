/**
 * Simple LTI endpoint that serves iframe HTML with pre-calculated height
 * This eliminates the need for complex content fallback APIs
 */

export default defineEventHandler(async (event) => {
  const { collection, id } = getRouterParams(event)
  
  // Validate collection
  const allowedCollections = ['exercises', 'projects', 'lectures', 'pathways', 'specializations', 'docs']
  if (!allowedCollections.includes(collection)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid collection: ${collection}`
    })
  }
  
  // Validate id
  if (id.includes('/') || id.includes('..')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid content ID'
    })
  }
  
  try {
    // Get pre-calculated height
    const heightsData = await $fetch('/content-heights.json').catch(() => ({}))
    const height = heightsData[collection]?.[id] || 800 // Fallback height
    
    // Get the current origin for iframe src
    const origin = getRequestURL(event).origin
    const iframeSrc = `${origin}/${collection}/${id}?embed=true&hidePageElements=true`
    
    // Generate iframe HTML
    const iframeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LTI Content</title>
  <style>
    body { margin: 0; padding: 0; overflow: hidden; }
    iframe { border: none; width: 100%; height: 100vh; }
  </style>
</head>
<body>
  <iframe 
    src="${iframeSrc}" 
    width="100%" 
    height="${height}px"
    title="Content"
    style="border:none;">
  </iframe>
  
  <script>
    // Send height to parent for Canvas LTI
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'lti.frameResize',
        height: ${height}
      }, '*');
    }
  </script>
</body>
</html>`.trim()
    
    // Return HTML response
    setHeader(event, 'content-type', 'text/html')
    return iframeHtml
    
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to generate LTI content: ${error.message}`
    })
  }
})