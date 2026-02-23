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
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
    'glightbox/dist/css/glightbox.css',
  ],
  app: {
    head: {
      title: 'Cafe Pelak 1',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Cafe Pelak 1 - Premium Coffee Experience' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
  dir: {
    public: 'public',
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
})

