import { db } from '~/server/database'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const method = event.method
  const id = getRouterParam(event, 'id')

  if (method === 'GET') {
    const image = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(Number(id))
    if (!image) throw createError({ statusCode: 404, message: 'Image not found' })
    return image
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      const existing = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(Number(id))
      if (!existing) throw createError({ statusCode: 404, message: 'Image not found' })

      db.prepare(
        'UPDATE gallery_images SET src = ?, thumb = ?, alt = ? WHERE id = ?'
      ).run(
        body.src ?? existing.src,
        body.thumb ?? existing.thumb,
        body.alt ?? existing.alt,
        Number(id)
      )
      return db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(Number(id))
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to update image' })
    }
  }

  if (method === 'DELETE') {
    const result = db.prepare('DELETE FROM gallery_images WHERE id = ?').run(Number(id))
    if (result.changes === 0) {
      throw createError({ statusCode: 404, message: 'Image not found' })
    }
    return { success: true }
  }
})
