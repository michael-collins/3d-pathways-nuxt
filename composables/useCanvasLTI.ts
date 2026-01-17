/**
 * Composable for Canvas LMS LTI integration
 * Automatically sends height updates to Canvas when embedded
 */
import { onUnmounted, onMounted } from 'vue'

export const useCanvasLTI = () => {
  const isEmbedded = () => {
    // Only attempt messaging when inside an iframe
    return typeof window !== 'undefined' && window.self !== window.top
  }

  const sendHeightToCanvas = () => {
    if (!isEmbedded()) return

    // Scroll to top
    window.parent.postMessage('{"subject":"lti.scrollToTop"}', '*')

    // Calculate and send height after a short delay to ensure content is rendered
    setTimeout(() => {
      const height = document.body.scrollHeight
      window.parent.postMessage(`{"subject":"lti.frameResize", "height":${height}}`, '*')
      window.parent.postMessage('{"subject":"lti.scrollToTop"}', '*')
    }, 100)
  }

  const initCanvasLTI = () => {
    if (typeof window === 'undefined') return
    if (!isEmbedded()) return

    // Send initial height
    sendHeightToCanvas()

    // Recalculate on image/content load
    const images = Array.from(document.images)
    images.forEach((img) => {
      if (img.complete) return
      img.addEventListener('load', () => sendHeightToCanvas())
      img.addEventListener('error', () => sendHeightToCanvas())
    })

    // Listen for DOM changes and update height
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(() => {
        sendHeightToCanvas()
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      })

      // Cleanup on unmount
      onUnmounted(() => {
        observer.disconnect()
      })
    }

    // Also update on window resize
    const handleResize = () => {
      sendHeightToCanvas()
    }

    window.addEventListener('resize', handleResize)

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  }

  // Ensure initial run when mounted in components using this composable
  onMounted(() => {
    // Safe no-op outside iframes
    if (isEmbedded()) sendHeightToCanvas()
  })

  return {
    initCanvasLTI,
    sendHeightToCanvas
  }
}
