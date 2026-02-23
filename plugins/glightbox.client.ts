import GLightbox from 'glightbox'

export default defineNuxtPlugin(() => {
  // This is a .client.ts plugin, so it only runs on the client
  const initGLightbox = () => {
    const lightbox = GLightbox({
      selector: '[data-glightbox]',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    })
    return lightbox
  }

  // Initialize on mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGLightbox)
  } else {
    initGLightbox()
  }

  // Re-initialize after route changes
  const router = useRouter()
  router.afterEach(() => {
    setTimeout(() => {
      initGLightbox()
    }, 100)
  })
})
