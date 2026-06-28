export default defineNuxtConfig({
  compatibilityDate: '2026-02-23',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
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
    '~/assets/css/main.css',
    '~/assets/css/variables.css',
    'glightbox/dist/css/glightbox.css',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'fa' },
      title: 'کافه پلاک یک هشتگرد | Cafe Pelak 1 — کافه بیکری هشتگرد',
      titleTemplate: (title?: string) =>
        title && title.includes('Pelak') ? title : `${title} | Cafe Pelak 1`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'کافه پلاک یک هشتگرد (کیا کافه) | کافه و بیکری تخصصی با نان و شیرینی تازه. بهترین کافه بیکری در هشتگرد. Cafe Pelak 1 — specialty coffee & fresh bakery in Hashtgerd.',
        },
        {
          name: 'keywords',
          content:
            'کافه کیا, کافه هشتگرد, کافه بیکری, کافه بیکری هشتگرد, کیا کافه, kia cafe, cafe kia, pelak 1, cafe pelak 1, pelak yek, پلاک یک, پلاک یک هشتگرد, کافه پلاک یک, پلاک 1, کافه پلاک 1',
        },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'theme-color', content: '#090a0a' },
        { name: 'apple-mobile-web-app-title', content: 'Cafe Pelak 1' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Cafe Pelak 1' },
        { property: 'og:locale', content: 'fa_IR' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
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
})

