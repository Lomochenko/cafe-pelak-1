<template>
  <Transition name="loader">
    <div v-if="visible" class="app-loader">
      <div class="app-loader__inner">
        <div class="app-loader__brand">
          <span class="app-loader__dot"></span>
          <span class="app-loader__text">P<span class="font-condensed">1</span> CAFE</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)

onMounted(async () => {
  const hide = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        visible.value = false
        // Trigger page animations after loader fades out
        setTimeout(() => {
          document.documentElement.setAttribute('data-page-ready', 'true')
        }, 300)
      })
    })
  }
  
  // Minimum display so loader animation is visible
  const minTime = new Promise(r => setTimeout(r, 1400))
  
  // Wait for full page load (images, fonts, data)
  const pageLoaded = new Promise(r => {
    if (document.readyState === 'complete') return r(undefined)
    window.addEventListener('load', r, { once: true })
  })
  
  await Promise.all([minTime, pageLoaded])
  hide()
})
</script>

<style scoped>
.app-loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #090a0a;
}

.app-loader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.app-loader__brand {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.app-loader__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #468672;
  animation: loaderPulse 1.2s ease-in-out infinite;
  margin-right: 10px;
}

.app-loader__text {
  font-family: "Playfair Display", Serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  color: #f4f9f7;
  letter-spacing: 0.04em;
  animation: loaderFadeIn 0.8s ease-out both;
}

.app-loader__subtitle {
  font-family: "Roboto Flex";
  font-size: clamp(0.85rem, 2.5vw, 1.1rem);
  color: #9fa1a1;
  letter-spacing: 0.12em;
  margin: 0;
  animation: loaderFadeIn 0.8s ease-out 0.3s both;
}

@keyframes loaderPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.6);
  }
}

@keyframes loaderFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loader-enter-active {
  transition: opacity 0.3s ease;
}

.loader-leave-active {
  transition: opacity 0.4s ease 0.1s;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>
