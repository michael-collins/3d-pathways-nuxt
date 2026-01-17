/**
 * Composable for Canvas LMS LTI integration
 * Automatically sends height updates to Canvas when embedded
 */
export const useCanvasLTI = () => {
  const sendHeightToCanvas = () => {
    if (typeof window === 'undefined' || !window.parent) return;
    
    // Scroll to top
    window.parent.postMessage('{"subject":"lti.scrollToTop"}', "*");
    
    // Calculate and send height after a short delay to ensure content is rendered
    setTimeout(() => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(`{"subject":"lti.frameResize", "height":${height}}`, "*");
      window.parent.postMessage('{"subject":"lti.scrollToTop"}', "*");
    }, 100);
  };

  const initCanvasLTI = () => {
    if (typeof window === 'undefined') return;

    // Send initial height
    sendHeightToCanvas();

    // Listen for content changes and update height
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(() => {
        sendHeightToCanvas();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });

      // Cleanup on unmount
      onUnmounted(() => {
        observer.disconnect();
      });
    }

    // Also update on window resize
    const handleResize = () => {
      sendHeightToCanvas();
    };

    window.addEventListener('resize', handleResize);

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  };

  return {
    initCanvasLTI,
    sendHeightToCanvas
  };
};
