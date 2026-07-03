<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Admin Dashboard</h1>
        <p class="login-subtitle">Enter your password to continue</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="password-wrapper">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Enter admin password"
                required
                autocomplete="current-password"
                @keydown.enter="handleLogin"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
              >
                <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>

        <p v-if="error" class="error-message" role="alert">{{ error }}</p>
      </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from 'nuxt/app'

definePageMeta({
  layout: false,
})

const { login } = useAuth()
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {
    const success = login(password.value)
    if (success) {
      await navigateTo('/admin')
    } else {
      error.value = 'Invalid password. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg) 100%);
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background-color: var(--color-bg-neutral);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-high);
}

.login-brand {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-bg-primary);
}

.login-title {
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--color-headings);
  font-size: 3rem;
}

.login-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-weight: 500;
}

.password-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: var(--text-base);
  transition: border-color var(--transition-base);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-bg-primary);
  box-shadow: 0 0 0 3px rgba(70, 134, 114, 0.1);
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0.25rem;
  color: var(--color-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
}

.password-toggle:hover {
  color: var(--color-text);
  background: var(--color-bg);
}

.btn {
  width: 100%;
  background-color: var(--color-bg);
  transition: background-color 0.3s;
  border: 1px solid var(--color-border);
}
.btn:hover:not(:disabled) {
  background-color: var(--color-bg-primary);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: var(--color-error-content);
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
}
</style>

