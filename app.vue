<template>
  <div id="page" class="s-pagewrap ss-home">
    <AppLoader />
    <ClientOnly>
      <Toast />
      <template #fallback>
        <div style="display:none"></div>
      </template>
    </ClientOnly>
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
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

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>