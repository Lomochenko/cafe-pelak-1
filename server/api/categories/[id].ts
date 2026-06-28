import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const method = event.method

  if (method === 'PUT') {
    const body = await readBody(event)
    const index = store.categories.findIndex(c => c.id === id)
    if (index === -1) throw createError({ statusCode: 404, message: 'Not found' })
    const oldName = store.categories[index].name
    store.categories[index] = { ...store.categories[index], ...body, id }
    // Rename items in that category if name changed
    if (body.name && body.name !== oldName) {
      store.menuItems = store.menuItems.map(item =>
        item.category === oldName ? { ...item, category: body.name } : item
      )
    }
    return store.categories[index]
  }

  if (method === 'DELETE') {
    const cat = store.categories.find(c => c.id === id)
    if (!cat) throw createError({ statusCode: 404, message: 'Not found' })
    const others = store.categories.filter(c => c.id !== id)
    if (others.length > 0) {
      store.menuItems = store.menuItems.map(item =>
        item.category === cat.name ? { ...item, category: others[0].name } : item
      )
    }
    store.categories = others
    return { ok: true }
  }
})
