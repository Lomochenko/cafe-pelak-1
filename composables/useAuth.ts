import { ref, computed } from 'vue'

const ADMIN_PASSWORD = 'p1'
const AUTH_KEY = 'cafe_pelak_admin_auth'

export const useAuth = () => {
  const isAuthenticated = ref(false)

  // Check if already authenticated on mount
  if (import.meta.client) {
    const stored = localStorage.getItem(AUTH_KEY)
    isAuthenticated.value = stored === 'true'
  }

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      isAuthenticated.value = true
      if (import.meta.client) {
        localStorage.setItem(AUTH_KEY, 'true')
      }
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    if (import.meta.client) {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  const isAdmin = computed(() => isAuthenticated.value)

  return {
    isAuthenticated,
    isAdmin,
    login,
    logout,
  }
}

