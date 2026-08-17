import { defineEventHandler, readBody, createError } from 'h3'
import { db } from '~/server/database'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { url } = body
  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, message: 'URL is required' })
  }
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO settings (key, value) VALUES ('mapUrl', ?)
  `)
  stmt.run(url)
  return { success: true, url }
})