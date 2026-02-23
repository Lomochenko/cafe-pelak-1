export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // Allow access to login page
  if (to.path === '/admin/login') {
    return
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated.value) {
    return navigateTo('/admin/login')
  }
})

