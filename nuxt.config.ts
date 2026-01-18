// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 devtools: { enabled: true },
 // plugins: ['~/plugins/airtable.js'], // Disabled for testing
 css: ['~/assets/css/main.css'],

 experimental: {
   payloadExtraction: false  // Simpler approach for SSR
 },

 // Enhanced loading indicator configuration for ISR
 loading: {
   color: '#3B82F6',
   height: '3px',
   continuous: true,
   duration: 2000,
   throttle: 0
 },

 modules: [
  '@nuxtjs/tailwindcss',
  '@nuxtjs/color-mode',
  '@nuxt/icon',
  '@pinia/nuxt',
  '@nuxt/content',
  '@nuxtjs/mdc',
  '@nuxt/image'
],
content: {
  debug: false, // Disable debug in production
  // Ensure content is processed during build for Vercel
  experimental: {
    clientDB: true  // Enable client-side database for better SSR support
  },
  // Include all content types
  sources: {
    content: {
      driver: 'fs',
      base: './content'
    }
  }
},
 image: {
  // unoptimized: true, // Disable all image optimization. Default: false
  // domains: [
  //   'v5.airtableusercontent.com'
  // ],
  // format: ['webp']
},

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

 postcss: {
   plugins: {
     tailwindcss: {},
     autoprefixer: {},
   },
 },
 mdc: {
  headings: {
    components: {
      prose: false, // Disable predefined prose components
      // map: {
      //   p: 'MyCustomPComponent'
      // }
    },
    anchorLinks: {
      // Enable/Disable heading anchor links. { h1: true, h2: false }
      h1: false, h2: false, h3: false, h4: false, h5: false, h6: false
    }
  },
  // toc: {
  //   enable: true, maxDepth: 3
  //   // Enable/Disable table of contents. { enable: true, maxDepth: 3 }
  // },
},
 app: {
   // baseURL: '/3d-pathways-nuxt/', // baseURL: '/<repository>/'
   // buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  //   pageTransition: { 
  //     name: 'page',
  //     mode: 'out-in' 
  // },
   head: {
     htmlAttrs: {
       lang: 'en'
     },
     link: [
       { rel: "icon", type: "image/png", href: "/favicon.ico" }
     ],
     script: [
       {
         innerHTML: `
           // Enhanced FOUC prevention for ISR
           document.documentElement.style.visibility = 'hidden';
           document.documentElement.style.opacity = '0';
           
           document.addEventListener('DOMContentLoaded', function() {
             const showContent = () => {
               document.documentElement.style.visibility = 'visible';
               document.documentElement.style.opacity = '1';
               document.documentElement.style.transition = 'opacity 0.1s ease-in';
             };
             
             const checkStyles = () => {
               const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
               let loaded = 0;
               
               if (stylesheets.length === 0) {
                 showContent();
                 return;
               }
               
               stylesheets.forEach(sheet => {
                 if (sheet.sheet || sheet.disabled) {
                   loaded++;
                 } else {
                   sheet.addEventListener('load', () => {
                     loaded++;
                     if (loaded === stylesheets.length) {
                       showContent();
                     }
                   });
                 }
               });
               
               if (loaded === stylesheets.length) {
                 showContent();
               }
             };
             
             // Check immediately and fallback after 1.5 seconds
             checkStyles();
             setTimeout(showContent, 1500);
           });
         `
       }
     ]
   }
 },

 public: {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
},
 ssr: true,
 
 // Enhanced ISR (Incremental Static Regeneration) configuration
 routeRules: {
   // Homepage - prerender and cache with ISR
   '/': { 
     prerender: true,
     headers: { 'cache-control': 's-maxage=3600' }
   },
   // Static pages - prerender for better performance
   '/about': { prerender: true },
   '/colors': { prerender: true },
   '/license': { prerender: true },
   
   // Docs - ISR with 1 hour cache
   '/docs/**': { 
     isr: 3600,  // Regenerate every hour
     headers: { 'cache-control': 's-maxage=3600' }
   },
   
   // Content pages - Enhanced ISR with error handling
   '/exercises/**': { 
     isr: 7200,  // Regenerate every 2 hours
     headers: { 
       'cache-control': 's-maxage=7200',
       'x-content-type': 'exercise'
     },
     // Ensure content is available during generation
     experimentalNoScripts: false
   },
   '/projects/**': { 
     isr: 7200,  // Regenerate every 2 hours
     headers: { 
       'cache-control': 's-maxage=7200',
       'x-content-type': 'project'
     },
     experimentalNoScripts: false
   },
   '/lectures/**': { 
     isr: 7200,  // Regenerate every 2 hours
     headers: { 
       'cache-control': 's-maxage=7200',
       'x-content-type': 'lecture'
     },
     experimentalNoScripts: false
   },
   '/pathways/**': { 
     isr: 7200,  // Regenerate every 2 hours
     headers: { 
       'cache-control': 's-maxage=7200',
       'x-content-type': 'pathway'
     },
     experimentalNoScripts: false
   },
   '/lessons/**': { 
     isr: 7200,  // Regenerate every 2 hours
     headers: { 
       'cache-control': 's-maxage=7200',
       'x-content-type': 'lesson'
     },
     experimentalNoScripts: false
   },
   '/specializations/**': { 
     isr: 7200,  // Regenerate every 2 hours
     headers: { 
       'cache-control': 's-maxage=7200',
       'x-content-type': 'specialization'
     },
     experimentalNoScripts: false
   },
   
   // Index pages - ISR with moderate cache
   '/exercises': { 
     isr: 1800,  // Regenerate every 30 minutes
     headers: { 'cache-control': 's-maxage=1800' }
   },
   '/projects': { 
     isr: 1800,  // Regenerate every 30 minutes
     headers: { 'cache-control': 's-maxage=1800' }
   },
   '/lectures': { 
     isr: 1800,  // Regenerate every 30 minutes
     headers: { 'cache-control': 's-maxage=1800' }
   },
   '/pathways': { 
     isr: 1800,  // Regenerate every 30 minutes
     headers: { 'cache-control': 's-maxage=1800' }
   },
   '/lessons': { 
     isr: 1800,  // Regenerate every 30 minutes
     headers: { 'cache-control': 's-maxage=1800' }
   },
   '/specializations': { 
     isr: 1800,  // Regenerate every 30 minutes
     headers: { 'cache-control': 's-maxage=1800' }
   },
   
   // API routes - cache for better performance
   '/api/**': {
     cors: true,
     headers: {
       'Access-Control-Allow-Methods': 'GET',
       'Cache-Control': 'public, max-age=3600'
     }
   }
 },

 nitro: {
  externals: {
    inline: ['gray-matter']
  },
  // Enhanced content processing for ISR
  experimental: {
    wasm: true
  },
  vercel: {
    functions: {
      maxDuration: 10  // Increased for content generation
    }
  },
  storage: {
    'data': {
      driver: 'fs',
      base: './data'
    }
  },
  // Ensure content is available during generation
  prerender: {
    failOnError: false,  // Don't fail the entire build if one route fails
    crawlLinks: true,    // Discover more content routes
    concurrency: 1       // Process one at a time to avoid conflicts
  },
  devStorage: {
    data: {
      driver: 'fs',
      base: './data'
    }
  }
},
//  nitro: {
//   static: true,
//    prerender: {
//      crawlLinks: true,
//      routes: ['/'],
//      // ignore: ["/api"]
//    }
//  },

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
    siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  },
  // Private keys, kept server-side
  AirtableApiKey: process.env.AIRTABLE_API_KEY,
},

 compatibilityDate: '2024-08-27',
})