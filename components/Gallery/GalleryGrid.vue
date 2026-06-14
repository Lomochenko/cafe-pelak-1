<template>
  <section id="gallery" class="content" ref="sectionRef">
    <div class="gallery__wrapper" ref="wrapperRef">
      <div class="gallery__image__container" ref="containerRef">
        <picture 
          v-for="(image, index) in images" 
          :key="index" 
          class="gallery__media"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="gallery__media__image"
            draggable="false"
          />
        </picture>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface GalleryImage {
  src: string
  alt: string
}

const images = ref<GalleryImage[]>([
  { src: '/images/gallery/gallery-01.jpg', alt: 'Gallery 1' },
  { src: '/images/gallery/gallery-02.jpg', alt: 'Gallery 2' },
  { src: '/images/gallery/gallery-03.jpg', alt: 'Gallery 3' },
  { src: '/images/gallery/gallery-04.jpg', alt: 'Gallery 4' },
  { src: '/images/gallery/gallery-05.jpg', alt: 'Gallery 5' },
  { src: '/images/gallery/gallery-06.jpg', alt: 'Gallery 6' },
  { src: '/images/gallery/gallery-07.jpg', alt: 'Gallery 7' },
  { src: '/images/gallery/gallery-08.jpg', alt: 'Gallery 8' },
])

const sectionRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const scroll = {
  current: 0,
  target: 0,
  ease: 0.1,
  limit: 0,
}

let rafId = 0
let isInGallery = false

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}

const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t
}

const setLimit = () => {
  if (!containerRef.value || !wrapperRef.value) return

  const containerWidth = containerRef.value.scrollWidth
  const wrapperWidth = wrapperRef.value.clientWidth
  scroll.limit = Math.max(0, containerWidth - wrapperWidth)

  console.log('✅ [GALLERY] Scroll limit:', scroll.limit, 'px')
}

const handleScroll = () => {
  if (!sectionRef.value || !wrapperRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const sectionTop = rect.top
  const sectionHeight = rect.height
  const windowHeight = window.innerHeight

  // Check if gallery is in viewport
  if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
    isInGallery = true
    
    // Calculate scroll progress through the gallery section
    // Extended calculation to ensure all images are visible including last ones
    const scrollProgress = clamp(-sectionTop / (sectionHeight - windowHeight * 1), 0, 1)
    scroll.target = clamp(scrollProgress * scroll.limit, 0, scroll.limit)

    console.log('🎯 [GALLERY]', {
      progress: (scrollProgress * 100).toFixed(1) + '%',
      target: scroll.target.toFixed(0) + 'px',
    })
  } else {
    isInGallery = false
  }
}

const applyParallaxEffect = () => {
  if (!containerRef.value) return

  const vw = window.innerWidth
  const viewportCenter = vw * 0.5
  const images = containerRef.value.querySelectorAll<HTMLImageElement>('.gallery__media__image')

  images.forEach((image) => {
    const parent = image.parentElement as HTMLElement
    if (!parent) return

    const rect = parent.getBoundingClientRect()
    const elementCenter = rect.left + rect.width * 0.5
    const t = clamp((elementCenter - viewportCenter) / viewportCenter, -1, 1)
    const maxShift = 10
    const shift = -t * maxShift
    
    image.style.transform = `translate3d(${shift}%, 0, 0)`
  })
}

const render = () => {
  scroll.current = lerp(scroll.current, scroll.target, scroll.ease)

  if (containerRef.value) {
    containerRef.value.style.transform = `translateX(${-scroll.current}px)`
  }

  applyParallaxEffect()
  
  rafId = requestAnimationFrame(render)
}

const onResize = () => {
  setLimit()
}

onMounted(async () => {
  console.log('🚀 [GALLERY] Initializing...')

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve)
    })
  })

  scroll.current = 0
  scroll.target = 0
  
  setLimit()

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', onResize)

  rafId = requestAnimationFrame(render)
  
  console.log('✅ [GALLERY] Ready! Scroll page to move gallery horizontally')

  ;(window as any).testGallery = () => {
    console.log('🧪 [TEST]', {
      current: scroll.current.toFixed(0),
      target: scroll.target.toFixed(0),
      limit: scroll.limit.toFixed(0),
      progress: ((scroll.current / scroll.limit) * 100).toFixed(1) + '%',
      isInGallery,
    })
  }
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', onResize)
  delete (window as any).testGallery
})
</script>

<style scoped>
.content {
  padding: var(--vspace-4, 2.5rem) 0;
  padding-bottom: var(--vspace-6, 4rem);
  width: 100%;
  position: relative;
  min-height: 320vh;
}

.gallery__wrapper {
  position: sticky;
  top: 20vh;
  width: 100%;
  overflow: hidden;
  user-select: none;
  height: 60vh;
}

.gallery__image__container {
  display: flex;
  gap: 2rem;
  will-change: transform;
  height: 100%;
  padding: 0 2rem;
  padding-right: calc(2rem + 100vw);
}

.gallery__media {
  flex-shrink: 0;
  aspect-ratio: 4 / 3;
  height: 60vh;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.gallery__media__image {
  position: absolute;
  top: 0;
  left: -12.5%;
  width: 125%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
  pointer-events: none;
}

@media (max-width: 1200px) {
  .content {
    min-height: 300vh;
    padding-bottom: var(--vspace-5, 3.125rem);
  }

  .gallery__wrapper {
    height: 55vh;
  }

  .gallery__image__container {
    gap: 1.5rem;
    padding-right: calc(1.5rem + 100vw);
  }

  .gallery__media {
    height: 55vh;
  }
}

@media (max-width: 768px) {
  .content {
    padding: var(--vspace-3, 1.875rem) 0;
    padding-bottom: var(--vspace-4, 2.5rem);
    min-height: 280vh;
  }

  .gallery__wrapper {
    height: 50vh;
    top: 15vh;
  }

  .gallery__image__container {
    gap: 1rem;
    padding: 0 1rem;
    padding-right: calc(1rem + 100vw);
  }

  .gallery__media {
    height: 50vh;
    border-radius: 6px;
  }
}

@media (max-width: 480px) {
  .content {
    padding: var(--vspace-2, 1.25rem) 0;
    padding-bottom: var(--vspace-3, 1.875rem);
    min-height: 250vh;
  }

  .gallery__wrapper {
    height: 45vh;
    top: 10vh;
  }

  .gallery__image__container {
    gap: 0.75rem;
    padding: 0 0.75rem;
    padding-right: calc(0.75rem + 100vw);
  }

  .gallery__media {
    height: 45vh;
    border-radius: 4px;
  }

  .gallery__media__image {
    left: -10%;
    width: 120%;
  }
}
</style>
