<template>
  <div class="admin-layout-root">
    <AdminLayout>
      <slot />
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/components/AdminLayout.vue'
</script>

<style>
/* Reset font-size for admin pages - the main site uses 62.5% base which makes rem tiny */
.admin-layout-root {
  font-size: 16px;
}

.admin-layout-root *,
.admin-layout-root input,
.admin-layout-root textarea,
.admin-layout-root select,
.admin-layout-root button {
  font-family: var(--font-1), sans-serif;
}
</style>
