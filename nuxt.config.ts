// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 devtools: { enabled: true },
 plugins: ['~/plugins/airtable.js'],
 css: ['~/assets/css/main.css'],

 experimental: {
   payloadExtraction: false  // Simpler approach for SSR
 },

 // Simple loading indicator configuration
 loading: {
   color: '#3B82F6',
   height: '2px',
   continuous: true
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
           document.documentElement.style.visibility = 'hidden';
           document.addEventListener('DOMContentLoaded', function() {
             const checkStyles = () => {
               const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
               let loaded = 0;
               if (stylesheets.length === 0) {
                 document.documentElement.style.visibility = 'visible';
                 return;
               }
               stylesheets.forEach(sheet => {
                 if (sheet.sheet || sheet.disabled) loaded++;
               });
               if (loaded === stylesheets.length) {
                 document.documentElement.style.visibility = 'visible';
               } else {
                 setTimeout(checkStyles, 10);
               }
             };
             checkStyles();
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
 nitro: {
  externals: {
    inline: ['gray-matter']
  },
  // Vercel-specific optimizations for content
  experimental: {
    wasm: true
  },
  vercel: {
    functions: {
      maxDuration: 5
    }
  },
  storage: {
    'data': {
      driver: 'fs',
      base: './data'
    }
  },
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=3600'
      }
    }
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