import { db } from '~/server/database'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return db.prepare('SELECT * FROM categories').all()
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      if (!body.name) {
        throw createError({ statusCode: 400, message: 'Category name is required' })
      }
      const result = db.prepare(
        'INSERT INTO categories (name, description) VALUES (?, ?)'
      ).run(body.name, body.description || '')
      return { ...body, id: Number(result.lastInsertRowid) }
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to create category' })
    }
  }
})
