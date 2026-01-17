/**
 * Plugin to set siteUrl dynamically based on current request/domain
 * This allows preview URLs and different environments to work automatically
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Only set on client side (after hydration)
  if (process.client) {
    // Get the current origin (protocol + domain)
    const origin = window.location.origin
    
    // Update the runtime config with the actual origin
    nuxtApp.$config.public.siteUrl = origin
  }
})
