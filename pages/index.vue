<template>
  <div class="home">
    <Hero />
    <About />
    <Menu />
    <Gallery />
    <Testimonials />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
.home {
  width: 100%;
}
</style>

