<template>
  <div class="row s-menu__content">
    <div class="column xl-4 lg-5 md-12 s-menu__content-start">
      <div class="section-header anim-fade-in-up" style="animation-delay: 0.3s">
        <h2 class="text-display-title">Our Menu</h2>
      </div>

      <nav class="tab-nav" ref="tabNavRef" :class="{ 'tab-nav--sticky': isSticky }">
        <ul class="tab-nav__list">
          <li
            v-for="(category, index) in categories"
            :key="index"
            :data-tab-active="activeTab === index ? '' : undefined"
          >
            <a :href="'#tab-' + category.id" @click.prevent="scrollToCategory(index)">
              <span>{{ category.name }}</span>
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                  fill-rule="nonzero"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="column xl-6 lg-6 md-12 s-menu__content-end" ref="menuContentRef">
      <div class="tab-content menu-block">
        <div
          v-for="(category, index) in categories"
          :key="index"
          :id="'tab-' + category.id"
          class="menu-block__group tab-content__item"
          :data-tab-active="activeTab === index ? '' : undefined"
        >
          <h6 class="menu-block__cat-name" dir="rtl">{{ category.name }}</h6>

          <ul class="menu-list">
            <MenuItem v-for="item in category.items" :key="item.id" :item="item" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useMenu } from '~/composables/useMenu'

const activeTab = ref(0)
const isSticky = ref(false)
const tabNavRef = ref<HTMLElement | null>(null)
const menuContentRef = ref<HTMLElement | null>(null)

const scrollToCategory = (index: number) => {
  activeTab.value = index
  const element = document.getElementById('tab-' + categories.value[index].id)
  if (element) {
    const firstItem = element.querySelector('.menu-list__item')
    const targetElement = firstItem || element
    
    const stickyNavHeight = tabNavRef.value?.offsetHeight || 60
    const additionalOffset = 250
    const totalOffset = isSticky.value ? stickyNavHeight + additionalOffset : additionalOffset
    
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - totalOffset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (window.innerWidth < 1000 && menuContentRef.value && tabNavRef.value) {
    const rect = menuContentRef.value.getBoundingClientRect()
    const menuEndRect = document.querySelector('.s-menu__content')?.getBoundingClientRect()
    isSticky.value = rect.top <= 0 && (menuEndRect ? menuEndRect.bottom > 0 : true)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const { availableCategories, menuItems } = useMenu()

// Fetch data when component mounts on client
onMounted(async () => {
  const { fetchAll } = useMenu()
  if (!availableCategories.value.length) {
    await fetchAll()
  }
})

// Default to first category when categories load
watch(availableCategories, (cats) => {
  if (cats.length && activeTab.value === 0) activeTab.value = 0
}, { immediate: true })

const categories = computed(() =>
  availableCategories.value.map(cat => ({
    id: cat.name.toLowerCase().replace(/\s+/g, '-'),
    name: cat.name,
    items: menuItems.value.filter(item => item.category === cat.name),
  }))
)
</script>

<style scoped>
.tab-nav {
  position: relative;
  z-index: 10;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-nav--sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--vspace-0_375) 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-nav:not(.tab-nav--sticky) {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

.tab-nav--sticky .tab-nav__list li a {
  color: rgba(255, 255, 255, 0.8);
}

.tab-nav--sticky .tab-nav__list li a:hover {
  color: rgba(255, 255, 255, 1);
}

.tab-nav--sticky .tab-nav__list li[data-tab-active] a {
  color: rgba(255, 255, 255, 1);
  border-bottom-color: rgba(255, 255, 255, 0.8);
}

.tab-nav__list {
  display: flex;
  gap: var(--vspace-0_5);
  padding: 0 var(--gutter);
  margin: 0;
  list-style: none;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.tab-nav__list li a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: var(--vspace-0_5) var(--vspace-0_75);
  white-space: nowrap;
  font-size: var(--text-sm);
  color: var(--color-text-light);
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-nav__list li a:hover {
  color: var(--color-text);
}

.tab-nav__list li[data-tab-active] a {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}

.tab-nav__list svg {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

@media screen and (max-width: 1000px) {
  .tab-nav--sticky {
    padding: var(--vspace-0_375) 0;
  }

  .tab-nav__list {
    gap: 0;
  }

  .tab-nav__list li a {
    padding: var(--vspace-0_375) var(--vspace-0_5);
    font-size: calc(var(--text-size) * 0.9);
  }
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

.anim-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s ease both;
  animation-play-state: paused;
}

[data-page-ready] .anim-fade-in-up {
  animation-play-state: running;
}

.s-menu__content-start {
  text-align: center;
}

@media screen and (max-width: 768px) {
  .s-menu__content-start {
    text-align: center;
  }

  .section-header {
    text-align: center;
  }
}
</style>
