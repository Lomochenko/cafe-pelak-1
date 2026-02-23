<template>
  <header class="header s-header" :class="{ 'header--sticky': isSticky }" dir="ltr">
    <div class="container s-header__content">
      <div class="header__content s-header__block">
        <div class="header__logo header-logo">
          <NuxtLink to="/" class="logo">
            <img src="/images/logo.svg" alt="Cafe Pelak 1" class="logo__img" />
          </NuxtLink>
        </div>

        <nav class="header__nav header-nav" :class="{ 'header__nav--active': mobileMenuOpen }">
          <ul class="nav__list header-nav__links">
            <li class="nav__item current">
              <a href="#hero" class="nav__link smoothscroll" @click="scrollToSection">Intro</a>
            </li>
            <li class="nav__item">
              <a href="#about" class="nav__link smoothscroll" @click="scrollToSection">About</a>
            </li>
            <li class="nav__item">
              <a href="#menu" class="nav__link smoothscroll" @click="scrollToSection">Menu</a>
            </li>
            <li class="nav__item">
              <a href="#gallery" class="nav__link smoothscroll" @click="scrollToSection">Gallery</a>
            </li>
          </ul>
        </nav>
        <div class="header-contact">
          <a href="tel:+" class="header-contact__num btn">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              width="24"
              height="24"
              color="#000000"
            >
              <defs></defs>
              <path
                class="cls-6376396cc3a86d32eae6f0dc-1"
                d="M19.64,21.25c-2.54,2.55-8.38.83-13-3.84S.2,6.9,2.75,4.36L5.53,1.57,10.9,6.94l-2,2A2.18,2.18,0,0,0,8.9,12L12,15.1a2.18,2.18,0,0,0,3.07,0l2-2,5.37,5.37Z"
              ></path>
            </svg>
            555-123-3456
          </a>
        </div>
        <!-- end header-contact -->
        <button
          class="header__toggle"
          :class="{ 'header__toggle--active': mobileMenuOpen }"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isSticky = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isSticky.value = window.scrollY > 50
}

const scrollToSection = (e: Event) => {
  e.preventDefault()
  const target = e.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  if (href) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      mobileMenuOpen.value = false
    }
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
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--color-bg), 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all var(--transition-base);
  border-bottom: 1px solid var(--color-border);
}

.header--sticky {
  box-shadow: var(--shadow-medium);
}

.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.header__logo {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo__img {
  height: 50px;
  width: auto;
}

.header__nav {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.nav__list {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav__link {
  color: var(--color-text);
  font-weight: 500;
  transition: color var(--transition-base);
}

.nav__link:hover {
  color: var(--color-link);
}

.header__toggle {
  display: none;
  flex-direction: column;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.header__toggle span {
  width: 25px;
  height: 2px;
  background-color: var(--color-text);
  transition: all var(--transition-base);
}

.header__toggle--active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.header__toggle--active span:nth-child(2) {
  opacity: 0;
}

.header__toggle--active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Mobile */
@media (max-width: 768px) {
  .header__toggle {
    display: flex;
  }

  .header__nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-bg);
    flex-direction: column;
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-base);
  }

  .header__nav--active {
    max-height: 300px;
  }

  .nav__list {
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    width: 100%;
  }
}
</style>
