<template>
  <div class="gallery-item">
    <a
      :href="image.src"
      class="gallery-item__link"
      :data-glightbox="`gallery-${index}`"
      :title="image.alt"
    >
      <img :src="image.thumb" :alt="image.alt" class="gallery-item__image" />
      <div class="gallery-item__overlay">
        <svg class="gallery-item__icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path
            d="M21 15l-5-5L5 21"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  id: number
  src: string
  thumb: string
  alt: string
}

defineProps<{
  image: GalleryImage
  index: number
}>()
</script>

<style scoped>
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  aspect-ratio: 1;
}

.gallery-item__link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.gallery-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.gallery-item__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.gallery-item__icon {
  width: 40px;
  height: 40px;
  color: var(--color-white);
}

.gallery-item__link:hover .gallery-item__image {
  transform: scale(1.1);
}

.gallery-item__link:hover .gallery-item__overlay {
  opacity: 1;
}
</style>

