<template>
  <div class="admin-layout">

    <!-- Sidebar overlay (mobile) -->
    <div v-if="sidebarOpen" class="admin-overlay" @click="sidebarOpen = false"></div>

    <!-- Sidebar -->
    <aside class="admin-sidebar" :class="{ 'is-open': sidebarOpen }">
      <div class="sidebar-header">
        <span class="sidebar-title">Admin Panel</span>
        <button class="sidebar-close" @click="sidebarOpen = false" aria-label="Close sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink to="/admin" class="nav-link" :class="{ active: $route.path === '/admin' }" @click="sidebarOpen = false">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect>
          </svg>
          <span>Dashboard</span>
        </NuxtLink>
        <NuxtLink to="/admin/menu" class="nav-link" :class="{ active: $route.path === '/admin/menu' }" @click="sidebarOpen = false">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>
          </svg>
          <span>Menu Items</span>
        </NuxtLink>
        <NuxtLink to="/admin/categories" class="nav-link" :class="{ active: $route.path === '/admin/categories' }" @click="sidebarOpen = false">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Categories</span>
        </NuxtLink>
        <NuxtLink to="/admin/gallery" class="nav-link" :class="{ active: $route.path === '/admin/gallery' }" @click="sidebarOpen = false">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <span>Gallery</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main area -->
    <div class="admin-body">
      <header class="admin-header">
        <button class="hamburger-btn" @click="sidebarOpen = true" aria-label="Open sidebar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 class="admin-header-title">{{ pageTitle }}</h1>
      </header>

      <main class="admin-main">
        <div class="admin-content">
          <slot />
        </div>
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { logout, isAuthenticated } = useAuth()
const sidebarOpen = ref(false)

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/menu': 'Menu Management',
    '/admin/categories': 'Categories',
    '/admin/gallery': 'Gallery',
  }
  return titles[route.path] || 'Admin'
})

const handleLogout = () => {
  logout()
  sidebarOpen.value = false
  router.push('/admin/login')
}

onMounted(() => {
  if (!isAuthenticated.value) router.push('/admin/login')
})
</script>

<style scoped>
/* All sizes use px to avoid being affected by the 62.5% root font-size */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-bg);
  font-size: 16px; /* reset to 16px for the whole admin area */
}

/* ── Sidebar ─────────────────────────────── */
.admin-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--color-bg-neutral);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 200;
  transition: transform 0.28s cubic-bezier(0.28, 0.12, 0.22, 1);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-headings);
  font-family: var(--font-1);
}

.sidebar-close {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  line-height: 1;
}

.sidebar-close:hover { color: var(--color-text); background: var(--color-bg); }

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-1);
  font-weight: 500;
  transition: all 0.18s ease;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 0.18s;
}

.nav-link:hover, .nav-link.active {
  background: var(--color-bg);
  color: var(--color-bg-primary);
}
.nav-link:hover .nav-icon, .nav-link.active .nav-icon { opacity: 1; }

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--color-border);
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 16px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-light);
  font-size: 1.5rem;
  font-family: var(--font-1);
  cursor: pointer;
  transition: all 0.18s ease;
  border-color: #dc2626; color: #dc2626; background: rgba(220,38,38,0.06); 
}
/* ── Overlay (mobile) ────────────────────── */
.admin-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 199;
}

/* ── Body (header + main) ────────────────── */
.admin-body {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.28s cubic-bezier(0.28, 0.12, 0.22, 1);
}

.admin-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  height: 56px;
  background: var(--color-bg-neutral);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.hamburger-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  line-height: 1;
}
.hamburger-btn:hover { background: var(--color-bg); }

.admin-header-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  font-family: var(--font-1);
  color: var(--color-headings);
}

.admin-main {
  flex: 1;
  padding: 24px;
}

.admin-content {
  background: var(--color-bg-neutral);
  border-radius: 12px;
  padding: 24px;
  min-height: calc(100vh - 56px - 48px);
  font-size: 15px;
  font-family: var(--font-1);
}

/* ── Responsive ─────────────────────────── */
@media (max-width: 1024px) {
  /* Sidebar hidden off-screen by default on tablet/mobile */
  .admin-sidebar {
    transform: translateX(-100%);
    width: 260px;
    box-shadow: 4px 0 24px rgba(0,0,0,0.3);
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-close {
    display: flex;
  }

  .admin-overlay {
    display: block;
  }

  .admin-body {
    margin-left: 0;
  }

  .hamburger-btn {
    display: flex;
  }
}

@media (max-width: 600px) {
  .admin-sidebar {
    width: min(280px, 85vw);
  }

  .admin-header {
    padding: 0 16px;
    height: 50px;
  }

  .admin-header-title {
    font-size: 15px;
  }

  .admin-main {
    padding: 12px;
  }

  .admin-content {
    padding: 14px;
    border-radius: 8px;
    font-size: 14px;
  }
}
</style>
