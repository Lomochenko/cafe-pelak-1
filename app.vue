<template>
  <div class="app">
    <Preloader />
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    dir: 'rtl',
    lang: 'fa',
  },
})
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>

