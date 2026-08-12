import { readMultipartFormData, createError } from 'h3'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'
import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const filePart = parts?.find((p) => p.name === 'file')

  if (!filePart?.data || !filePart.filename) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const mimeType = filePart.type || ''
  if (!mimeType.startsWith('image/')) {
    throw createError({ statusCode: 400, message: 'Invalid file type' })
  }

  const uploadDir = process.env.UPLOAD_PATH || join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  const filename = `${randomUUID()}.webp`
  const optimized = await sharp(filePart.data)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  await writeFile(join(uploadDir, filename), optimized)

  return { path: `/api/uploads/${filename}` }
})
