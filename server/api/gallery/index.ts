import { db } from '~/server/database'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    return db.prepare('SELECT * FROM gallery_images').all()
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      if (!body.src) {
        throw createError({ statusCode: 400, message: 'Image source is required' })
      }
      const result = db.prepare(
        'INSERT INTO gallery_images (src, thumb, alt) VALUES (?, ?, ?)'
      ).run(body.src, body.thumb || body.src, body.alt || '')
      return { ...body, id: Number(result.lastInsertRowid) }
    } catch (error: any) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 500, message: error.message || 'Failed to create image' })
    }
  }
})
