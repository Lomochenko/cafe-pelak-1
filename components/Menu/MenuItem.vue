<template>
  <li class="menu-list__item">
    <div class="menu-list__item-desc">
      <h4>{{ item.name }}</h4>
      <p>{{ item.description }}</p>
    </div>
    <div class="menu-list__item-price"><span>$</span>{{ item.price.toFixed(2) }}</div>
  </li>
</template>

<script setup lang="ts">
interface MenuItem {
  id: number
  name: string
  description: string
  price: number
}

defineProps<{
  item: MenuItem
}>()
</script>