<template>
  <div class="s-menu__content">
    <!-- Title centered at the top -->
    <div class="menu-header">
      <h2 @click="scrollToMenu" class="text-display-title1">Our Menu</h2>
    </div>

    <!-- All categories and their items listed sequentially -->
    <div class="menu-items-container">
      <div
        v-for="category in categories"
        :key="category.id"
        class="menu-category-group"
      >
        <h3 class="menu-category-title">{{ category.name }}</h3>
        <ul class="menu-list" dir="rtl">
          <MenuItem
            v-for="item in category.items"
            :key="item.id"
            :item="item"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useMenu } from '~/composables/useMenu'

const { availableCategories, menuItems, fetchAll } = useMenu()

// Fetch data when component mounts on client
onMounted(async () => {
  if (!availableCategories.value.length) {
    await fetchAll()
  }
})

// Computed categories with their items
const categories = computed(() =>
  availableCategories.value.map(cat => ({
    id: cat.name.toLowerCase().replace(/\s+/g, '-'),
    name: cat.name,
    items: menuItems.value.filter(item => item.category === cat.name),
  }))
)
// Ensure 'menu' element exists
// Smooth scroll function
function scrollToMenu() {
  const menuElement = document.getElementById('menu')
  if (menuElement) {
    menuElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.s-menu__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--vspace-2) var(--gutter);
}

.menu-header {
  text-align: center;
  margin-bottom: var(--vspace-2);
}

.text-display-title1 {
  font-size: clamp(var(--text-display), var(--text-display) - 1rem + 1.5vw, var(--text-huge));
  margin: 0;
}

.menu-items-container {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-2);
}

.menu-category-group {
  border-bottom: 1px solid var(--color-border-light, rgba(255, 255, 255, 0.1));
  padding-bottom: var(--vspace-1_5);
}

.menu-category-group:last-child {
  border-bottom: none;
}

.menu-category-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-headings);
  margin-bottom: var(--vspace-1);
  text-align: right;
  font-family: var(--font-digi) !important;
  margin-top: 0 !important;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: var(--vspace-1);
}

/* Responsive */
@media screen and (max-width: 768px) {
  .menu-list {
    grid-template-columns: 1fr;
  }
}
</style>