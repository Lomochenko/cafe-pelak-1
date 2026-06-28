import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const method = event.method

  if (method === 'PUT') {
    const body = await readBody(event)
    const index = store.galleryImages.findIndex(i => i.id === id)
    if (index === -1) throw createError({ statusCode: 404, message: 'Not found' })
    store.galleryImages[index] = { ...store.galleryImages[index], ...body, id }
    return store.galleryImages[index]
  }

  if (method === 'DELETE') {
    store.galleryImages = store.galleryImages.filter(i => i.id !== id)
    return { ok: true }
  }
})
