<template>
  <section id="menu" class="menu">
    <div class="container">
      <div class="menu__header">
        <h2 class="menu__title">Our Menu</h2>
        <p class="menu__subtitle">Discover our carefully curated selection</p>
      </div>

      <div class="menu__tabs">
        <button
          v-for="(category, index) in categories"
          :key="index"
          class="menu__tab"
          :class="{ 'menu__tab--active': activeTab === index }"
          @click="activeTab = index"
        >
          {{ category }}
        </button>
      </div>

      <div class="menu__items">
        <MenuItem
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
}

const activeTab = ref(0)

const categories = ['Signature Blends', 'Pastries', 'Gourmet Treats']

const items: MenuItem[] = [
  {
    id: 1,
    name: 'Lounge Elegance Espresso',
    description: 'Rich and full-bodied espresso',
    price: 3.5,
    category: 'Signature Blends',
  },
  {
    id: 2,
    name: 'Velvet Mocha Delight',
    description: 'Silky mocha infused with premium chocolate',
    price: 4.25,
    category: 'Signature Blends',
  },
  {
    id: 3,
    name: 'Croissant',
    description: 'Buttery French croissant',
    price: 3.0,
    category: 'Pastries',
  },
  {
    id: 4,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake slice',
    price: 4.5,
    category: 'Gourmet Treats',
  },
]

const filteredItems = computed(() => {
  return items.filter((item) => item.category === categories[activeTab.value])
})
</script>

<style scoped>
.menu {
  padding: var(--vspace-4) 0;
  background-color: var(--color-bg);
}

.menu__header {
  text-align: center;
  margin-bottom: var(--vspace-3);
}

.menu__title {
  margin-bottom: var(--vspace-0_5);
}

.menu__subtitle {
  color: var(--color-text-light);
  font-size: var(--text-md);
}

.menu__tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: var(--vspace-2);
  flex-wrap: wrap;
}

.menu__tab {
  padding: 0.8rem 1.6rem;
  background-color: var(--color-bg-neutral);
  color: var(--color-text);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  font-weight: 500;
}

.menu__tab:hover {
  border-color: var(--color-bg-primary);
  color: var(--color-bg-primary);
}

.menu__tab--active {
  background-color: var(--color-bg-primary);
  color: var(--color-white);
  border-color: var(--color-bg-primary);
}

.menu__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--vspace-2);
}

@media (max-width: 768px) {
  .menu__tabs {
    gap: 0.5rem;
  }

  .menu__tab {
    padding: 0.6rem 1.2rem;
    font-size: var(--text-sm);
  }

  .menu__items {
    grid-template-columns: 1fr;
  }
}
</style>

