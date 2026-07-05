<template>
  <AdminLayout>
    <div class="dashboard">
      <div class="dashboard-welcome">
        <h2>Dashboard</h2>
        <p>Overview of your cafe's content</p>
      </div>

      <TransitionGroup name="card" tag="div" class="dashboard-grid" appear>
        <div key="menu" class="dashboard-card" style="--order: 0">
          <div class="card-icon">☕</div>
          <div class="card-body">
            <span class="card-label">Menu Items</span>
            <span class="card-value">{{ menuStats.total }}</span>
          </div>
          <NuxtLink to="/admin/menu" class="card-link">Manage</NuxtLink>
        </div>

        <div key="categories" class="dashboard-card" style="--order: 1">
          <div class="card-icon">📁</div>
          <div class="card-body">
            <span class="card-label">Categories</span>
            <span class="card-value">{{ menuStats.categories }}</span>
          </div>
          <NuxtLink to="/admin/categories" class="card-link">Manage</NuxtLink>
        </div>

        <div key="gallery" class="dashboard-card" style="--order: 2">
          <div class="card-icon">🖼</div>
          <div class="card-body">
            <span class="card-label">Gallery Images</span>
            <span class="card-value">{{ galleryStats.total }}</span>
          </div>
          <NuxtLink to="/admin/gallery" class="card-link">Manage</NuxtLink>
        </div>
      </TransitionGroup>

      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="action-grid">
          <NuxtLink to="/admin/menu" class="action-btn">
            <span class="action-btn__icon">+</span>
            <span>Add Menu Item</span>
          </NuxtLink>
          <NuxtLink to="/admin/categories" class="action-btn">
            <span class="action-btn__icon">+</span>
            <span>Add Category</span>
          </NuxtLink>
          <NuxtLink to="/admin/gallery" class="action-btn">
            <span class="action-btn__icon">+</span>
            <span>Add Gallery Image</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMenu } from '~/composables/useMenu'
import { useGallery } from '~/composables/useGallery'
import { useAuth } from '~/composables/useAuth'
import AdminLayout from '~/components/AdminLayout.vue'

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

const recentItems = computed(() => {
  return [...menuItems.value]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)
})
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
}

.dashboard-welcome {
  margin-bottom: 2rem;
}

.dashboard-welcome h2 {
  font-size: 1.75rem;
  color: var(--color-headings);
  margin: 0 0 0.35rem;
}

.dashboard-welcome p {
  color: var(--color-text-light);
  font-size: 1.5rem;
  margin: 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.dashboard-card {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid var(--color-border);
  transition: transform 0.25s var(--ease-snappy-polished),
              box-shadow 0.25s var(--ease-snappy-polished);
}

.dashboard-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.card-icon {
  font-size: 1.75rem;
  line-height: 1;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-label {
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-light);
}

.card-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-headings);
  line-height: 1.1;
}

.card-link {
  font-size: 1.7rem;
  color: var(--color-bg-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: auto;
  margin-left: auto;
  font-weight: 500;
  border: 2px solid var(--color-bg-neutral);
  padding: .375rem;
  border-radius: var(--radius-md);
}

.card-link:hover {
  color: var(--color-text);
}

/* Recent Section */
.recent-section {
  margin-bottom: 2.5rem;
}

.recent-section h3 {
  font-size: 1rem;
  color: var(--color-headings);
  margin: 0 0 1rem;
}

.recent-list {
  background: var(--color-bg-neutral);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  transition: background 0.2s;
}

.recent-item:last-child {
  border-bottom: none;
}

.recent-item:hover {
  background: var(--color-bg);
}

.recent-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.recent-name {
  font-weight: 500;
  color: var(--color-headings);
}

.recent-category {
  font-size: 1rem;
  color: var(--color-text-light);
}

.recent-price {
  font-weight: 600;
  color: var(--color-bg-primary);
}

.no-items {
  text-align: center;
  color: var(--color-text-light);
  padding: 2rem;
  background: var(--color-bg-neutral);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

/* Quick Actions */
.quick-actions h3 {
  font-size: 1.52rem;
  color: var(--color-headings);
  margin: 0 0 1rem;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.25rem;
  background: var(--color-bg-neutral);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  border: 1px solid var(--color-bg-primary);
}

.action-btn:hover {
  background: var(--color-bg);
  border-color: var(--color-bg-primary);
  color: var(--color-bg-primary);
}

.action-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--color-bg-primary);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* TransitionGroup animations */
.card-enter-active {
  transition: all 0.5s var(--ease-snappy-polished);
  transition-delay: calc(0.1s * var(--order, 0));
}

.card-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive */
@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-card {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .card-body {
    flex: 1;
  }

  .card-icon {
    font-size: 1.5rem;
  }

  .card-value {
    font-size: 1.75rem;
  }

  .card-link {
    margin-top: 0;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }

  .action-btn {
    justify-content: center;
  }

  .recent-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .recent-price {
    align-self: flex-end;
  }

  .dashboard-card:hover {
    transform: none;
  }
}
</style>