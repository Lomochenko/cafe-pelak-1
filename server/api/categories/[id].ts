import { db } from '~/server/database'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = getRouterParam(event, 'id')

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
        'INSERT INTO categories (name, icon, description) VALUES (?, ?, ?)'
      ).run(body.name, body.icon || '📦', body.description || '')
      return { ...body, id: Number(result.lastInsertRowid) }
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to create category' })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      const existing = db.prepare('SELECT * FROM categories WHERE id = ?').get(Number(id))
      if (!existing) throw createError({ statusCode: 404, message: 'Category not found' })

      db.prepare(
        'UPDATE categories SET name = ?, icon = ?, description = ? WHERE id = ?'
      ).run(
        body.name ?? existing.name,
        body.icon ?? existing.icon,
        body.description ?? existing.description,
        Number(id)
      )
      return db.prepare('SELECT * FROM categories WHERE id = ?').get(Number(id))
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to update category' })
    }
  }

  if (method === 'DELETE') {
    const result = db.prepare('DELETE FROM categories WHERE id = ?').run(Number(id))
    if (result.changes === 0) {
      throw createError({ statusCode: 404, message: 'Category not found' })
    }
    return { success: true }
  }
})
