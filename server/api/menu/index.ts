import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return store.menuItems
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const item = { ...body, id: store.nextMenuId++ }
    store.menuItems.push(item)
    return item
  }
})
