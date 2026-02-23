<template>
  <Transition name="preloader">
    <div v-if="isLoading" class="preloader">
      <div class="preloader__content">
        <div class="preloader__spinner">
          <svg class="preloader__circle" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
        <p class="preloader__text">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-preloader-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.preloader__content {
  text-align: center;
}

.preloader__spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto 2rem;
}

.preloader__circle {
  color: var(--color-loader);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.preloader__text {
  color: var(--color-text);
  font-size: var(--text-sm);
}

/* Transition */
.preloader-enter-active,
.preloader-leave-active {
  transition: opacity var(--transition-slow);
}

.preloader-enter-from,
.preloader-leave-to {
  opacity: 0;
}
</style>

