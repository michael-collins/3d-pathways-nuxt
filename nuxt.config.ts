// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: ['~/plugins/airtable.js'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  // buildModules: ["nuxt-hero-icons"],
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
//   router: {
//     base: '/3d-pathways-nuxt/'
//  },
//  deploy with nuxt build, You can statically generate Nuxt routes at build time using the prerender option
//  routeRules: {
//   // prerender index route by default
//   '/': { prerender: true },
//   // prerender this route and all child routes
//   '/prerender-multiple/**': { prerender: true },
// },
// build your project with nuxt generate. You should set nitro.static to true to enable Vercel features
//  nitro: {
//   serveStatic: true,
// },
 runtimeConfig: {
  // Public keys that will be exposed to the client, prefix with 'public'
  public: {
    AirtableApiKey: process.env.AIRTABLE_API_KEY, // Keep this empty if you don't need it on the client-side
  },
  // Private keys, kept server-side
  AirtableApiKey: process.env.AIRTABLE_API_KEY,
},
})
