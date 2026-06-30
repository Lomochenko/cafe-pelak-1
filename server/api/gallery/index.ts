import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return store.galleryImages
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      if (!body.src) {
        throw createError({ statusCode: 400, message: 'Image source is required' })
      }
      
      const image = { 
        ...body, 
        id: store.nextGalleryId++,
        thumb: body.thumb || body.src,
        alt: body.alt || ''
      }
      store.galleryImages.push(image)
      return image
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to create gallery image' })
    }
  }
})
