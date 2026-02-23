<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Admin Dashboard</h1>
        <p class="login-subtitle">Enter your password to continue</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-input"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>

          <p v-if="error" class="error-message">{{ error }}</p>
        </form>

        <p class="login-hint">Demo password: <code>admin123</code></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'admin',
})

const { login } = useAuth()
const password = ref('')
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
  padding: 3rem 2rem;
  box-shadow: var(--shadow-high);
}

.login-title {
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--color-headings);
}

.login-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: 2rem;
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

.btn {
  width: 100%;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: var(--color-error-content);
  font-size: var(--text-sm);
  margin-top: 1rem;
  text-align: center;
}

.login-hint {
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--text-sm);
}

code {
  background-color: var(--color-bg);
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  color: var(--color-bg-primary);
  font-family: var(--font-mono);
}
</style>

