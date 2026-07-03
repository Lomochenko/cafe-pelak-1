<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
      >
        <span class="toast__icon">{{ toast.icon }}</span>
        <p class="toast__message">{{ toast.message }}</p>
        <button class="toast__close" @click="remove(toast.id)" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 99998;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  padding-right: 0.75rem;
  border-radius: var(--radius-md, 0.5rem);
  background: var(--color-bg-neutral, #1c1e1d);
  border: 1px solid var(--color-border, #262827);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
  max-width: 380px;
  min-width: 280px;
}

.toast__icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.toast__message {
  flex: 1;
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text, #bfc1c0);
  line-height: 1.4;
}

.toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--color-text-light, #5f6362);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm, 0.25rem);
  display: flex;
  transition: color 0.2s, background 0.2s;
}

.toast__close:hover {
  color: var(--color-text, #bfc1c0);
  background: rgba(255, 255, 255, 0.05);
}

.toast--success {
  border-color: #468672;
}

.toast--success .toast__icon {
  color: #65a48f;
}

.toast--error {
  border-color: #dc2626;
}

.toast--error .toast__icon {
  color: #ef4444;
}

.toast--info {
  border-color: #3b82f6;
}

.toast--info .toast__icon {
  color: #60a5fa;
}

.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.28, 0.12, 0.22, 1);
}

.toast-leave-active {
  transition: all 0.25s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

@media (max-width: 480px) {
  .toast-container {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }

  .toast {
    min-width: 0;
    max-width: none;
  }
}
</style>
