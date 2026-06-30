import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return store.menuItems
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      if (!body.name || !body.category) {
        throw createError({ statusCode: 400, message: 'Name and category are required' })
      }
      
      const item = { 
        ...body, 
        id: store.nextMenuId++,
        price: Number(body.price) || 0
      }
      store.menuItems.push(item)
      return item
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to create menu item' })
    }
  }
})
