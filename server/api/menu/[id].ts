import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const method = event.method

  if (method === 'PUT') {
    const body = await readBody(event)
    const index = store.menuItems.findIndex(i => i.id === id)
    if (index === -1) throw createError({ statusCode: 404, message: 'Not found' })
    store.menuItems[index] = { ...store.menuItems[index], ...body, id }
    return store.menuItems[index]
  }

  if (method === 'DELETE') {
    store.menuItems = store.menuItems.filter(i => i.id !== id)
    return { ok: true }
  }
})
