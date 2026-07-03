import { db } from '~/server/database'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(Number(id))
    if (!item) throw createError({ statusCode: 404, message: 'Item not found' })
    return item
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      const existing = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(Number(id))
      if (!existing) throw createError({ statusCode: 404, message: 'Item not found' })

      db.prepare(
        'UPDATE menu_items SET name = ?, description = ?, price = ?, category = ? WHERE id = ?'
      ).run(
        body.name ?? existing.name,
        body.description ?? existing.description,
        Number(body.price) ?? existing.price,
        body.category ?? existing.category,
        Number(id)
      )
      return db.prepare('SELECT * FROM menu_items WHERE id = ?').get(Number(id))
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to update item' })
    }
  }

  if (method === 'DELETE') {
    const result = db.prepare('DELETE FROM menu_items WHERE id = ?').run(Number(id))
    if (result.changes === 0) {
      throw createError({ statusCode: 404, message: 'Item not found' })
    }
    return { success: true }
  }
})
