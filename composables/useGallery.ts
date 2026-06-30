import { storeToRefs } from 'pinia'
import { useGalleryStore } from '~/stores/gallery'

export const useGallery = () => {
  const galleryStore = useGalleryStore()
  
  const { images } = storeToRefs(galleryStore)

  return {
    galleryImages: images,
    fetchGallery: galleryStore.fetchGallery,
    addImage: galleryStore.addImage,
    updateImage: galleryStore.updateImage,
    deleteImage: galleryStore.deleteImage,
  }
}