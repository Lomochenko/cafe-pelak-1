<template>
  <section id="gallery" class="gallery">
    <div class="container">
      <div class="gallery__header">
        <h2 class="gallery__title">Gallery</h2>
        <p class="gallery__subtitle">Explore our beautiful cafe spaces</p>
      </div>

      <div class="gallery__grid">
        <GalleryItem
          v-for="(image, index) in galleryImages"
          :key="index"
          :image="image"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface GalleryImage {
  id: number
  src: string
  thumb: string
  alt: string
}

const galleryImages = ref<GalleryImage[]>([
  {
    id: 1,
    src: '/images/gallery/gallery-01.jpg',
    thumb: '/images/gallery/gallery-01.jpg',
    alt: 'Cafe interior',
  },
  {
    id: 2,
    src: '/images/gallery/gallery-02.jpg',
    thumb: '/images/gallery/gallery-02.jpg',
    alt: 'Coffee preparation',
  },
  {
    id: 3,
    src: '/images/gallery/gallery-03.jpg',
    thumb: '/images/gallery/gallery-03.jpg',
    alt: 'Cafe ambiance',
  },
  {
    id: 4,
    src: '/images/gallery/gallery-04.jpg',
    thumb: '/images/gallery/gallery-04.jpg',
    alt: 'Pastries display',
  },
  {
    id: 5,
    src: '/images/gallery/gallery-05.jpg',
    thumb: '/images/gallery/gallery-05.jpg',
    alt: 'Seating area',
  },
  {
    id: 6,
    src: '/images/gallery/gallery-06.jpg',
    thumb: '/images/gallery/gallery-06.jpg',
    alt: 'Coffee cup',
  },
])
</script>

<style scoped>
.gallery {
  padding: var(--vspace-4) 0;
  background-color: var(--color-bg-neutral);
}

.gallery__header {
  text-align: center;
  margin-bottom: var(--vspace-3);
}

.gallery__title {
  margin-bottom: var(--vspace-0_5);
}

.gallery__subtitle {
  color: var(--color-text-light);
  font-size: var(--text-md);
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--vspace-1);
}

@media (max-width: 768px) {
  .gallery__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--vspace-0_75);
  }
}

@media (max-width: 480px) {
  .gallery__grid {
    grid-template-columns: 1fr;
  }
}
</style>

