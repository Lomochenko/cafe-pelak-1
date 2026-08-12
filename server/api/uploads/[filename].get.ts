import { createError, setHeader } from 'h3'
import { readFile } from 'fs/promises'
import { join, basename, extname } from 'path'

const MIME: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
}

export default defineEventHandler(async (event) => {
  const filename = basename(getRouterParam(event, 'filename') || '')
  if (!filename) throw createError({ statusCode: 400, message: 'Invalid filename' })

  const uploadDir = process.env.UPLOAD_PATH || join(process.cwd(), 'public', 'uploads')
  const filePath = join(uploadDir, filename)

  try {
    const data = await readFile(filePath)
    const mime = MIME[extname(filename).toLowerCase()] || 'application/octet-stream'
    setHeader(event, 'Content-Type', mime)
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    return data
  } catch {
    throw createError({ statusCode: 404, message: 'File not found' })
  }
})
