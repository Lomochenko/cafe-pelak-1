<template>
  <div id="page" class="s-pagewrap ss-home">
    <!-- <Preloader /> -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

useHead({
  htmlAttrs: {
    lang: 'fa',
    class: 'no-js',
  },
})

onMounted(() => {
  document.documentElement.classList.remove('no-js')
  document.documentElement.classList.add('js')
})
</script>