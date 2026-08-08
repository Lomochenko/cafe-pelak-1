const AUTH_KEY = 'cafe_pelak_admin_auth'

export const useAuth = () => {
  const isAuthenticated = ref(false)

  if (import.meta.client) {
    isAuthenticated.value = localStorage.getItem(AUTH_KEY) === 'true'
  }

  const login = async (password: string): Promise<boolean> => {
    try {
      await $fetch('/api/auth/login', { method: 'POST', body: { password } })
      isAuthenticated.value = true
      if (import.meta.client) localStorage.setItem(AUTH_KEY, 'true')
      return true
    } catch {
      return false
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
    isAuthenticated.value = false
    if (import.meta.client) localStorage.removeItem(AUTH_KEY)
  }

  const isAdmin = computed(() => isAuthenticated.value)

  return { isAuthenticated, isAdmin, login, logout }
}
