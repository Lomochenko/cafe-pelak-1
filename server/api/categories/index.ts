import { store } from '~/server/store'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return store.categories
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const category = { ...body, id: store.nextCategoryId++ }
    store.categories.push(category)
    return category
  }
})
