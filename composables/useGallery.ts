export const useGallery = () => {
  const galleryImages = useState('galleryImages', () => [] as any[])

  const fetchGallery = async () => {
    galleryImages.value = await $fetch<any[]>('/api/gallery')
  }

  const addImage = async (image: any) => {
    const created = await $fetch<any>('/api/gallery', { method: 'POST', body: image })
    galleryImages.value = [...galleryImages.value, created]
  }

  const updateImage = async (id: number, updates: any) => {
    const updated = await $fetch<any>(`/api/gallery/${id}`, { method: 'PUT', body: updates })
    galleryImages.value = galleryImages.value.map((i: any) => i.id === id ? updated : i)
  }

  const deleteImage = async (id: number) => {
    await $fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    galleryImages.value = galleryImages.value.filter((i: any) => i.id !== id)
  }

  return { galleryImages, fetchGallery, addImage, updateImage, deleteImage }
}
