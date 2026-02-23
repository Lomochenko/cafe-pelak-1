import { ref } from 'vue'

export interface GalleryImage {
  id: number
  src: string
  thumb: string
  alt: string
}

export const useGallery = () => {
  const galleryImages = ref<GalleryImage[]>([
    {
      id: 1,
      src: '/images/gallery/gallery-01.jpg',
      thumb: '/images/gallery/gallery-01.jpg',
      alt: 'Cafe interior with cozy seating',
    },
    {
      id: 2,
      src: '/images/gallery/gallery-02.jpg',
      thumb: '/images/gallery/gallery-02.jpg',
      alt: 'Expert barista preparing coffee',
    },
    {
      id: 3,
      src: '/images/gallery/gallery-03.jpg',
      thumb: '/images/gallery/gallery-03.jpg',
      alt: 'Warm cafe ambiance with lighting',
    },
    {
      id: 4,
      src: '/images/gallery/gallery-04.jpg',
      thumb: '/images/gallery/gallery-04.jpg',
      alt: 'Fresh pastries display',
    },
    {
      id: 5,
      src: '/images/gallery/gallery-05.jpg',
      thumb: '/images/gallery/gallery-05.jpg',
      alt: 'Comfortable seating area',
    },
    {
      id: 6,
      src: '/images/gallery/gallery-06.jpg',
      thumb: '/images/gallery/gallery-06.jpg',
      alt: 'Perfectly crafted coffee cup',
    },
  ])

  const addImage = (image: Omit<GalleryImage, 'id'>) => {
    const newId = Math.max(0, ...galleryImages.value.map(i => i.id)) + 1
    galleryImages.value.push({ ...image, id: newId })
  }

  const deleteImage = (id: number) => {
    galleryImages.value = galleryImages.value.filter((img) => img.id !== id)
  }

  const updateImage = (id: number, updates: Partial<GalleryImage>) => {
    const index = galleryImages.value.findIndex((img) => img.id === id)
    if (index !== -1) {
      galleryImages.value[index] = { ...galleryImages.value[index], ...updates }
    }
  }

  return {
    galleryImages,
    addImage,
    deleteImage,
    updateImage,
  }
}

