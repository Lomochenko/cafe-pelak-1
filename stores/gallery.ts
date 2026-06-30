import { defineStore } from 'pinia'

export interface GalleryImage {
  id: number
  src: string
  thumb: string
  alt: string
}

export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    images: [] as GalleryImage[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchGallery() {
      this.loading = true
      this.error = null
      try {
        this.images = await $fetch<GalleryImage[]>('/api/gallery')
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch gallery'
        console.error('[API] Gallery fetch error:', error)
      } finally {
        this.loading = false
      }
    },

    async addImage(image: Omit<GalleryImage, 'id'>) {
      try {
        const created = await $fetch<GalleryImage>('/api/gallery', { method: 'POST', body: image })
        this.images.push(created)
        return created
      } catch (error: any) {
        this.error = error.message || 'Failed to add image'
        throw error
      }
    },

    async updateImage(id: number, updates: Partial<GalleryImage>) {
      try {
        const updated = await $fetch<GalleryImage>(`/api/gallery/${id}`, { method: 'PUT', body: updates })
        const index = this.images.findIndex((i) => i.id === id)
        if (index !== -1) {
          this.images[index] = updated
        }
        return updated
      } catch (error: any) {
        this.error = error.message || 'Failed to update image'
        throw error
      }
    },

    async deleteImage(id: number) {
      try {
        await $fetch(`/api/gallery/${id}`, { method: 'DELETE' })
        this.images = this.images.filter((i) => i.id !== id)
      } catch (error: any) {
        this.error = error.message || 'Failed to delete image'
        throw error
      }
    },
  },
})