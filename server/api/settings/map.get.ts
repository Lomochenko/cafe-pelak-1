import { defineEventHandler } from 'h3'
import { db } from '~/server/database' // adjust import to your db export

export default defineEventHandler(() => {
  const stmt = db.prepare('SELECT value FROM settings WHERE key = ?')
  const result = stmt.get('mapUrl')
  return { url: result?.value || '' }
})