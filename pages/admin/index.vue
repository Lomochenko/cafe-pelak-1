<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h3>Menu Items</h3>
        <p class="stat-number">{{ menuStats.total }}</p>
        <NuxtLink to="/admin/menu" class="btn btn-secondary">Manage Menu</NuxtLink>
      </div>

      <div class="dashboard-card">
        <h3>Gallery Images</h3>
        <p class="stat-number">{{ galleryStats.total }}</p>
        <NuxtLink to="/admin/gallery" class="btn btn-secondary">Manage Gallery</NuxtLink>
      </div>

      <div class="dashboard-card">
        <h3>Categories</h3>
        <p class="stat-number">{{ menuStats.categories }}</p>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Quick Actions</h3>
      <div class="action-buttons">
        <NuxtLink to="/admin/menu" class="btn btn-primary">Add Menu Item</NuxtLink>
        <NuxtLink to="/admin/gallery" class="btn btn-primary">Add Gallery Image</NuxtLink>
        <button @click="logout" class="btn btn-outline">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { menuItems } = useMenu()
const { galleryImages } = useGallery()
const { logout } = useAuth()

const menuStats = computed(() => ({
  total: menuItems.value.length,
  categories: new Set(menuItems.value.map((item) => item.category)).size,
}))

const galleryStats = computed(() => ({
  total: galleryImages.value.length,
}))
</script>

<style scoped>
.dashboard {
  padding: var(--spacing-4);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

.dashboard-card {
  background: var(--color-neutral-1);
  padding: var(--spacing-3);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.dashboard-card h3 {
  margin-bottom: var(--spacing-2);
  color: var(--color-1-dark);
}

.stat-number {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-bold);
  color: var(--color-1);
  margin-bottom: var(--spacing-2);
}

.recent-activity {
  background: var(--color-neutral-1);
  padding: var(--spacing-3);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.recent-activity h3 {
  margin-bottom: var(--spacing-3);
  color: var(--color-1-dark);
}

.action-buttons {
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .dashboard {
    padding: var(--spacing-2);
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .btn {
    width: 100%;
  }
}
</style>
