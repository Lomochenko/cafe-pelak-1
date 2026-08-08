export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }

  setCookie(event, 'admin_auth', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })

  return { ok: true }
})
