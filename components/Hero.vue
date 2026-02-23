<template>
  <section id="hero" class="hero">
    <div class="hero__background">
      <img
        src="/images/intro-pic-primary.jpg"
        alt="Cafe Pelak"
        class="hero__image"
      />
    </div>

    <div class="hero__overlay"></div>

    <div class="container">
      <div class="hero__content">
        <h1 class="hero__title">Cafe Pelak 1</h1>
        <p class="hero__subtitle">Experience Premium Coffee Culture</p>
        <NuxtLink to="#menu" class="btn btn-primary">Explore Menu</NuxtLink>
      </div>
    </div>

    <div class="hero__scroll-indicator">
      <svg class="hero__scroll-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const handleScroll = () => {
  const scrollIndicator = document.querySelector('.hero__scroll-indicator')
  if (scrollIndicator) {
    const opacity = Math.max(0, 1 - window.scrollY / 300)
    ;(scrollIndicator as HTMLElement).style.opacity = opacity.toString()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 70px;
}

.hero__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: -1;
}

.hero__content {
  text-align: center;
  color: var(--color-white);
  z-index: 1;
}

.hero__title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-family: var(--type-headings);
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out;
}

.hero__subtitle {
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero__scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  animation: bounce 2s infinite;
}

.hero__scroll-icon {
  width: 30px;
  height: 30px;
  color: var(--color-white);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

@media (max-width: 768px) {
  .hero {
    height: 80vh;
    margin-top: 60px;
  }

  .hero__title {
    font-size: clamp(2rem, 6vw, 4rem);
  }

  .hero__subtitle {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
  }
}
</style>

