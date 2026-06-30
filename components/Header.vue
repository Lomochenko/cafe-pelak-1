<template>
  <header class="s-header" :class="headerClasses">
    <div class="container s-header__content">
      <div class="s-header__block">
        <div class="header-logo">
          <a class="specialFont" href="#top">
            <span class="font-condensed">Pelak 1</span> Cafe
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
          <li :class="{ current: activeSection === 'menu' }">
            <a class="smoothscroll" href="#menu" @click="handleNavClick">Menu</a>
          </li>
          <li :class="{ current: activeSection === 'gallery' }">
            <a class="smoothscroll" href="#gallery" @click="handleNavClick">Gallery</a>
          </li>
        </ul>
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
