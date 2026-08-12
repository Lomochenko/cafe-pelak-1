<template>
  <div class="landing">
    <div class="bg-animation">
      <div class="orb orb--1"></div>
      <div class="orb orb--2"></div>
      <div class="orb orb--3"></div>
    </div>

    <main class="landing__content" :class="{ 'is-ready': ready }">
      <div class="landing__brand">
        <img src="/images/intro-pic-primary@2x.jpg" alt="کافه پلاک یک" class="landing__logo" />
        <h1 class="landing__title">کافه پلاک یک</h1>
        <p class="landing__subtitle">به دنیای طعم و آرامش خوش آمدید</p>
      </div>

      <div class="landing__actions">
        <NuxtLink to="/#menu" class="action-btn action-btn--primary">
          <span class="action-btn__text">مشاهده  منو</span>
          <span class="action-btn__icon">📋</span>
        </NuxtLink>

        <a
          href="https://search.google.com/local/writereview?placeid=ChIJ4TCtKF2rjT8RPp7lPOWrgqE"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn action-btn--secondary"
        >
        <span class="action-btn__text">ثبت  نظر  در  گوگل</span>
        <span class="action-btn__icon">⭐</span>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({ layout: false })

const ready = ref(false)

onMounted(() => {
  const html = document.documentElement
  if (html.getAttribute('data-page-ready') === 'true') {
    ready.value = true
    return
  }
  const observer = new MutationObserver(() => {
    if (html.getAttribute('data-page-ready') === 'true') {
      ready.value = true
      observer.disconnect()
    }
  })
  observer.observe(html, { attributes: true, attributeFilter: ['data-page-ready'] })
})

useSeoMeta({
  title: 'cafe pelak yek menu - منو کافه پلاک یک',
  description: 'منوی کافه پلاک یک را مشاهده کنید یا نظر خود را در گوگل ثبت کنید.',
  ogTitle: 'cafe pelak yek menu - منو کافه پلاک یک',
  ogDescription: 'منوی کافه پلاک یک را مشاهده کنید یا نظر خود را در گوگل ثبت کنید.',
})
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.landing {
  min-height: 100vh;
  background-color: #090a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  direction: rtl;
  font-family: "Roboto Flex", sans-serif;
}
.action-btn__text{
  font-family: "Digi Lotos", "Playfair Display", serif;
}
/* ── Animated background ── */
.bg-animation {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  animation: drift 4s ease-in-out infinite alternate;
}

.orb--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #00ffb3, transparent 70%);
  top: -120px;
  right: -100px;
  animation-duration: 4s;
}

.orb--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #ff8000, transparent 70%);
  bottom: -100px;
  left: -80px;
  animation-duration: 2s;
  animation-delay: -4s;
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 40px) scale(1.08); }
}

@keyframes drift-center {
  from { transform: translate(-50%, -50%) scale(1); }
  to   { transform: translate(calc(-50% + 20px), calc(-50% + 30px)) scale(1.1); }
}

/* ── Content ── */
.landing__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  padding: 3.2rem 2rem;
  width: 100%;
  max-width: 560px;
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1),
              transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.landing__content.is-ready {
  opacity: 1;
  transform: translateY(0);
}

/* ── Brand ── */
.landing__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
}

.landing__logo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #366b5b;
  box-shadow: 0 0 0 6px rgba(54, 107, 91, 0.12);
}

.landing__title {
  font-family: "Digi Lotos", "Playfair Display", serif;
  font-size: clamp(2.8rem, 6vw, 4.2rem);
  font-weight: 700;
  color: #dfe0e0;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.landing__subtitle {
  font-family: "Digi Lotos", "Playfair Display", serif;
  font-size: clamp(2.4rem, 3vw, 2.8rem);
  color: #5f6362;
  line-height: 1.6;
}

/* ── Action buttons ── */
.landing__actions {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1.6rem 2.4rem;
  border-radius: 1000px;
  font-size: 2.7rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              background-color 0.25s;
  border: none;
}

.action-btn:hover,
.action-btn:focus-visible {
  transform: translateY(-3px);
  outline: none;
}

.action-btn--primary {
  background-color: #366b5b;
  color: #efefef;
  box-shadow: 0 4px 24px rgba(54, 107, 91, 0.3);
}

.action-btn--primary:hover,
.action-btn--primary:focus-visible {
  background-color: #468672;
  box-shadow: 0 8px 32px rgba(54, 107, 91, 0.45);
  color: #efefef;
}

.action-btn--secondary {
  background-color: #1c1e1d;
  color: #bfc1c0;
  border: 1px solid #393b3b;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.action-btn--secondary:hover,
.action-btn--secondary:focus-visible {
  background-color: #262827;
  border-color: #b1885e;
  color: #efefef;
  box-shadow: 0 8px 28px rgba(177, 136, 94, 0.2);
}

.action-btn__icon {
  font-size: 1.2em;
  line-height: 1;
}

/* ── Desktop: side-by-side ── */
@media screen and (min-width: 600px) {
  .landing__actions {
    flex-direction: row;
  }

  .action-btn {
    flex: 1;
  }
}
</style>
