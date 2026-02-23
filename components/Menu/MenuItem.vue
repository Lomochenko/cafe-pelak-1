<template>
  <div class="menu-item">
    <div class="menu-item__header">
      <h3 class="menu-item__name">{{ item.name }}</h3>
      <span class="menu-item__price">${{ item.price.toFixed(2) }}</span>
    </div>
    <p class="menu-item__description">{{ item.description }}</p>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
}

defineProps<{
  item: MenuItem
}>()
</script>

<style scoped>
.menu-item {
  padding: var(--vspace-1);
  background-color: var(--color-bg-neutral);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-bg-primary);
  transition: all var(--transition-base);
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.menu-item__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.menu-item__name {
  font-size: var(--text-md);
  color: var(--color-headings);
  margin: 0;
}

.menu-item__price {
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--color-bg-primary);
  white-space: nowrap;
}

.menu-item__description {
  font-size: var(--text-sm);
  color: var(--color-text-light);
  margin: 0;
}
</style>

