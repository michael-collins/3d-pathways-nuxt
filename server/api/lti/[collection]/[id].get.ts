/**
 * Simple LTI endpoint that serves iframe HTML with pre-calculated height
 * This eliminates the need for complex content fallback APIs
 * Includes fallback height estimation for content with embedded media
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
    // Get pre-calculated height from static file
    let height = getDefaultHeight(collection) // Collection-based default
    
    try {
      const origin = getRequestURL(event).origin
      const heightsData = await $fetch(`${origin}/content-heights.json`)
      height = heightsData[collection]?.[id] || heightsData[collection]?.default || getDefaultHeight(collection)
    } catch (e) {
      // Use default height if content-heights.json not found
      console.warn('Could not fetch content heights, using defaults')
    }
    
    // Get the current origin for iframe src
    const origin = getRequestURL(event).origin
    const iframeSrc = `${origin}/${collection}/${id}?embed=true&hidePageElements=true`
    
    // Generate iframe HTML with dynamic height support
    const iframeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LTI Content - ${collection}/${id}</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      overflow: hidden; 
      font-family: system-ui, sans-serif;
    }
    iframe { 
      border: none; 
      width: 100%; 
      height: 100vh; 
      display: block;
    }
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="loading" id="loading">Loading content...</div>
  <iframe 
    id="contentFrame"
    src="${iframeSrc}" 
    width="100%" 
    height="${height}px"
    title="Content"
    style="display:none;border:none;">
  </iframe>
  
  <script>
    const iframe = document.getElementById('contentFrame');
    const loading = document.getElementById('loading');
    let initialHeight = ${height};
    
    // Show iframe when loaded
    iframe.onload = function() {
      loading.style.display = 'none';
      iframe.style.display = 'block';
      
      // Send initial height to Canvas LTI
      sendHeightToParent(initialHeight);
      
      // Try to get actual content height after a delay (for iframes to load)
      setTimeout(() => {
        try {
          const contentDocument = iframe.contentDocument || iframe.contentWindow.document;
          if (contentDocument) {
            const actualHeight = Math.max(
              contentDocument.body.scrollHeight,
              contentDocument.documentElement.scrollHeight
            );
            if (actualHeight > initialHeight) {
              iframe.style.height = actualHeight + 100 + 'px';
              sendHeightToParent(actualHeight + 100);
            }
          }
        } catch (e) {
          // Cross-origin restrictions, stick with initial height
          console.warn('Cannot access iframe content for height calculation');
        }
      }, 3000);
    };
    
    function sendHeightToParent(height) {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'lti.frameResize',
          height: height
        }, '*');
      }
    }
    
    // Fallback timeout
    setTimeout(() => {
      if (iframe.style.display === 'none') {
        loading.style.display = 'none';
        iframe.style.display = 'block';
        sendHeightToParent(initialHeight);
      }
    }, 10000);
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

// Helper function to get sensible default heights by collection type
function getDefaultHeight(collection: string): number {
  const defaults = {
    exercises: 1200,  // Exercises often have videos and detailed instructions
    projects: 1000,   // Projects have descriptions and requirements
    lectures: 900,    // Lectures typically have embedded videos
    pathways: 800,    // Pathways are usually shorter
    specializations: 900,
    docs: 800
  }
  
  return defaults[collection] || 800
}