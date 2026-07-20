export default defineNuxtConfig({
  compatibilityDate: '2026-02-23',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
  ],

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  content: {
    sources: {
      content: {
        driver: 'fs',
        base: './content'
      }
    }
  },

  css: [
    '~/css/styles.css',
    '~/css/main.css',
    '~/css/variables.css'
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'fa' },
      title: 'کافه پلاک یک | Cafe Pelak yek',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: 'Cafe P1' },
        { name: 'description', content: 'کافه پلاک یک هشتگرد | کافه و بیکری تخصصی با نان و شیرینی تازه. بهترین کافه بیکری در هشتگرد. Cafe Pelak yek — specialty coffee & fresh bakery in Hashtgerd.' },
        { name: 'keywords', content: 'کافه کیا, کافه هشتگرد, کافه بیکری, کافه بیکری هشتگرد, کیا کافه, kia cafe, cafe kia, pelak yek, cafe pelak 1, pelak yek, پلاک یک, پلاک یک هشتگرد, کافه پلاک یک, پلاک 1, کافه پلاک 1' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'theme-color', content: '#090a0a' },
        { name: 'apple-mobile-web-app-title', content: 'Cafe Pelak yek' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Cafe Pelak yek' },
        { property: 'og:locale', content: 'fa_IR' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  dir: {
    public: 'public',
  },

  typescript: {
    strict: false,
    typeCheck: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  image: {
    provider: 'ipx',        // built‑in, uses sharp
    quality: 80,
    format: ['webp'],       // force WebP for all images
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    // If your images are hosted on external domains, add them here:
    // domains: ['your-domain.com'],
  },
})