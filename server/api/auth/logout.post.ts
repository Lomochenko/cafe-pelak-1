export default defineEventHandler((event) => {
  deleteCookie(event, 'admin_auth', { path: '/' })
  return { ok: true }
})
