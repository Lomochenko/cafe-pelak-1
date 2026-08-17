<template>
  <AdminLayout dir="rtl">
    <div class="dashboard">
      <div class="dashboard-welcome">
        <h2>داشبورد مدیریتی</h2>
        <p>نگاهی به محتوای کافه شما</p>
      </div>

      <TransitionGroup dir="RTL" name="card" tag="div" class="dashboard-grid" appear>
        <div key="categories" class="dashboard-card" style="--order: 1">
          <div class="card-body">
            <span class="card-label">دسته بندی های منو <span class="card-icon">📁</span></span>
            <span class="card-value">{{ menuStats.categories }}</span>
          </div>
          <NuxtLink to="/admin/categories" class="card-link">ویرایش</NuxtLink>
        </div>
        <div key="menu" class="dashboard-card" style="--order: 0">
          <div class="card-body">
            <span class="card-label">آیتم های منو <span class="card-icon">☕</span></span>
            <span class="card-value">{{ menuStats.total }}</span>
          </div>
          <NuxtLink to="/admin/menu" class="card-link">ویرایش</NuxtLink>
        </div>

        <div key="gallery" class="dashboard-card" style="--order: 2">
          <div class="card-body">
            <span class="card-label">عکس های گالری <span class="card-icon">🖼</span></span>
            <span class="card-value">{{ galleryStats.total }}</span>
          </div>
          <NuxtLink to="/admin/gallery" class="card-link">ویرایش</NuxtLink>
        </div>
      </TransitionGroup>

      <div class="quick-actions" dir="rtl">
        <h3>دسترسی سریع</h3>
        <div class="action-grid">
          <NuxtLink to="/admin/categories" class="action-btn">
            <span class="action-btn__icon"></span>
            <span class="action-text">ویرایش دسته بندی</span>
          </NuxtLink>
          <NuxtLink to="/admin/menu" class="action-btn">
            <span class="action-btn__icon"></span>
            <span class="action-text">ویرایش آیتم ها</span>
          </NuxtLink>
          <NuxtLink to="/admin/gallery" class="action-btn">
            <span class="action-btn__icon"></span>
            <span class="action-text">ویرایش عکس ها</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMenu } from '~/composables/useMenu'
import { useGallery } from '~/composables/useGallery'
import AdminLayout from '~/components/AdminLayout.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const { menuItems,fetchAll } = useMenu()
const { galleryImages, fetchGallery } = useGallery()

const menuStats = computed(() => ({
  total: menuItems.value.length,
  categories: new Set(menuItems.value.map((item) => item.category)).size,
}))

const galleryStats = computed(() => ({
  total: galleryImages.value.length,
}))

onMounted(async () => {
  // Fetch both menu and gallery data on dashboard load
  await Promise.all([fetchAll(), fetchGallery()])
})
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
}

.dashboard-welcome {
  margin-bottom: 2rem;
  font-family: var(--font-digi);
}

.dashboard-welcome h2 {
  font-size: x-large;
  color: var(--color-headings);
  margin: 0 0 0.35rem;
  font-family: var(--font-digi);
}

.dashboard-welcome p {
  color: var(--color-text-light);
  font-size: larger;
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
  font-size: larger;
  line-height: 1;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-label {
  font-size: larger;
  font-family: var(--font-digi);
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
  font-size: large;
  font-family: var(--font-digi);
  color: var(--color-text);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: auto;
  font-weight: 500;
  border: 2px solid var(--color-bg-neutral);
  padding: .375rem;
  border-radius: var(--radius-md);
  margin-right: auto;
}

.card-link:hover {
  color: var(--color-bg-primary);
}

/* Quick Actions */
.quick-actions h3 {
  font-size: x-large;
  color: var(--color-headings);
  margin: 0 0 1rem;
  text-align: right;
  font-family: var(--font-digi);
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
  font-size: 1.7rem;
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
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}
.action-text {
  font-size: larger;
  font-family: var(--font-digi);
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