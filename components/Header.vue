<template>
  <header class="s-header" :class="headerClasses">
    <div class="container s-header__content" v-motion="{ initial: { opacity: 0, y: -30 }, enter: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 2.1, ease: 'easeInOut' } } }">
      <div class="s-header__block">
        <div class="header-logo">
          <a class="logo" href="#top">
            <img src="/images/logo.svg" alt="Homepage" />
          </a>
        </div>
        <a class="header-menu-toggle" :class="{ 'is-clicked': menuOpen }" href="#0" @click.prevent="toggleMenu">
          <span>Menu</span>
        </a>
      </div>

      <nav class="header-nav">
        <ul class="header-nav__links">
          <li :class="{ current: activeSection === 'intro' }">
            <a class="smoothscroll" href="#intro" @click="handleNavClick">Intro</a>
          </li>
          <li :class="{ current: activeSection === 'about' }">
            <a class="smoothscroll" href="#about" @click="handleNavClick">About</a>
          </li>
          <li :class="{ current: activeSection === 'menu' }">
            <a class="smoothscroll" href="#menu" @click="handleNavClick">Menu</a>
          </li>
          <li :class="{ current: activeSection === 'gallery' }">
            <a class="smoothscroll" href="#gallery" @click="handleNavClick">Gallery</a>
          </li>
        </ul>

        <div class="header-contact" v-motion="{ initial: { opacity: 0, y: -30 }, enter: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 2.4, ease: 'easeInOut' } } }">
          <a href="tel:+" class="header-contact__num btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              width="24"
              height="24"
            >
              <!-- <defs>
                <style>
                  .cls-6376396cc3a86d32eae6f0dc-1 {
                    fill: none;
                    stroke: currentColor;
                    stroke-miterlimit: 10;
                  }
                </style>
              </defs> -->
              <path
                class="cls-6376396cc3a86d32eae6f0dc-1"
                d="M19.64,21.25c-2.54,2.55-8.38.83-13-3.84S.2,6.9,2.75,4.36L5.53,1.57,10.9,6.94l-2,2A2.18,2.18,0,0,0,8.9,12L12,15.1a2.18,2.18,0,0,0,3.07,0l2-2,5.37,5.37Z"
              ></path>
            </svg>
            555-123-3456
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const isSticky = ref(false)
const isOffset = ref(false)
const isScrolling = ref(false)
const activeSection = ref('intro')

const headerClasses = computed(() => ({
  sticky: isSticky.value,
  offset: isOffset.value,
  scrolling: isScrolling.value,
}))

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.classList.toggle('menu-is-open')
}

const handleNavClick = (e: Event) => {
  e.preventDefault()
  const target = e.target as HTMLAnchorElement
  const href = target.getAttribute('href')

  if (window.matchMedia('(max-width: 900px)').matches) {
    menuOpen.value = false
    document.body.classList.remove('menu-is-open')
  }

  if (href) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const handleScroll = () => {
  const hero = document.querySelector('#intro')
  if (!hero) return

  const triggerHeight = hero.clientHeight - 240
  const loc = window.scrollY

  isSticky.value = loc > triggerHeight
  isOffset.value = loc > triggerHeight + 20
  isScrolling.value = loc > triggerHeight + 150

  // Update active section
  const sections = document.querySelectorAll('.target-section')
  sections.forEach((section) => {
    const sectionTop = (section as HTMLElement).offsetTop - 50
    const sectionHeight = (section as HTMLElement).offsetHeight
    const sectionId = section.getAttribute('id')

    if (loc > sectionTop && loc <= sectionTop + sectionHeight) {
      activeSection.value = sectionId || 'intro'
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 901px)').matches) {
      if (document.body.classList.contains('menu-is-open')) {
        document.body.classList.remove('menu-is-open')
      }
      if (menuOpen.value) {
        menuOpen.value = false
      }
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
