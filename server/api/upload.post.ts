import { readMultipartFormData, createError } from 'h3'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const filePart = parts?.find((p) => p.name === 'file')

  if (!filePart?.data || !filePart.filename) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const ext = filePart.filename.split('.').pop()?.toLowerCase() || 'jpg'
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif']
  if (!allowed.includes(ext)) {
    throw createError({ statusCode: 400, message: 'Invalid file type' })
  }

  const filename = `${randomUUID()}.${ext}`
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await writeFile(join(uploadDir, filename), filePart.data)

  return { path: `/uploads/${filename}` }
})
