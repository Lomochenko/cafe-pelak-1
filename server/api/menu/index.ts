import { db } from '~/server/database'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return db.prepare('SELECT * FROM menu_items').all()
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      if (!body.name || !body.category) {
        throw createError({ statusCode: 400, message: 'Name and category are required' })
      }
      const result = db.prepare(
        'INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)'
      ).run(body.name, body.description || '', Number(body.price) || 0, body.category)
      return { ...body, id: Number(result.lastInsertRowid) }
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to create item' })
    }
  }
})
