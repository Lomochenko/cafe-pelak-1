<template>
  <li class="menu-list__item" dir="rtl">
    <div class="menu-list__item-desc">
      <h4>{{ item.name }}</h4>
      <p>{{ item.description }}</p>
    </div>
    <div class="menu-list__item-price">{{ item.price.toFixed(3) }} <span>T</span></div>
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
