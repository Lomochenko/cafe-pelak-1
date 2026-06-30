import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return store.categories
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      if (!body.name) {
        throw createError({ statusCode: 400, message: 'Category name is required' })
      }
      
      const category = { 
        ...body, 
        id: store.nextCategoryId++,
        icon: body.icon || '📦'
      }
      store.categories.push(category)
      return category
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to create category' })
    }
  }
})
