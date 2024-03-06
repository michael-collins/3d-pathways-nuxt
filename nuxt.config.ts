// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    dataValue: 'theme', // activate data-theme in <html> tag
    preference: 'system', // default value of $colorMode.preference
    // fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    // globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
  target: 'static', // default is 'server'
  ssr: true,
  mode: 'static',
  router: {
    base: '/3d-pathways-nuxt/'
 },
 runtimeConfig: {
  // Public keys that will be exposed to the client, prefix with 'public'
  publicAirtableApiKey: '', // Keep this empty if you don't need it on the client-side
  // Private keys, kept server-side
  airtableApiKey: process.env.AIRTABLE_API_KEY,
},
})
