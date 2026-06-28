import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return store.galleryImages
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const image = { ...body, id: store.nextGalleryId++ }
    store.galleryImages.push(image)
    return image
  }
})
