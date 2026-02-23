<template>
      <div class="admin-layout">
        <aside class="admin-sidebar">
          <div class="sidebar-header">
            <h2 class="sidebar-title">Admin Panel</h2>
      </div>
    
          <nav class="sidebar-nav">
            <NuxtLink to="/admin" class="nav-link" :class="{ active: $route.path === '/admin' }">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/admin/menu" class="nav-link" :class="{ active: $route.path === '/admin/menu' }">
              Menu Items
            </NuxtLink>
            <NuxtLink to="/admin/gallery" class="nav-link" :class="{ active: $route.path === '/admin/gallery' }">
              Gallery
            </NuxtLink>
      </nav>
    
          <div class="sidebar-footer">
            <button @click="handleLogout" class="btn btn-secondary btn-small">
              Logout
            </button>
      </div>
    </aside>
    
        <main class="admin-main">
          <div class="admin-header">
            <h1 class="admin-title">{{ pageTitle }}</h1>
      </div>
          <div class="admin-content">
            <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout, isAuthenticated } = useAuth()
const route = useRoute()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/menu': 'Menu Management',
    '/admin/gallery': 'Gallery Management',
  }
  return titles[route.path] || 'Admin'
})

const handleLogout = () => {
  logout()
  navigateTo('/admin/login')
}

onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/admin/login')
  }
})
</script>

<style scoped>
.admin-layout {
      display: flex;
      min-height: 100vh;
      background-color: var(--color-bg);
}

.admin-sidebar {
      width: 250px;
      background-color: var(--color-bg-neutral);
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
}

.sidebar-header {
      padding: 0 2rem;
      margin-bottom: 2rem;
}

.sidebar-title {
      margin: 0;
      color: var(--color-headings);
      font-size: var(--text-lg);
}

.sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
}

.nav-link {
      padding: 1rem 2rem;
      color: var(--color-text);
      text-decoration: none;
      transition: all var(--transition-base);
      border-left: 3px solid transparent;
}

.nav-link:hover {
      background-color: var(--color-bg);
      color: var(--color-bg-primary);
}

.nav-link.active {
      background-color: var(--color-bg);
      color: var(--color-bg-primary);
      border-left-color: var(--color-bg-primary);
}

.sidebar-footer {
      padding: 2rem;
      border-top: 1px solid var(--color-border);
}

.admin-main {
      flex: 1;
      margin-left: 250px;
      padding: 2rem;
}

.admin-header {
      margin-bottom: 2rem;
}

.admin-title {
      margin: 0;
      color: var(--color-headings);
}

.admin-content {
      background-color: var(--color-bg-neutral);
      border-radius: var(--radius-lg);
      padding: 2rem;
}

.btn-small {
      padding: 0.6rem 1.2rem;
      font-size: var(--text-sm);
}

@media (max-width: 768px) {
      .admin-sidebar {
        width: 100%;
        height: auto;
        position: relative;
        border-right: none;
        border-bottom: 1px solid var(--color-border);
  }

  .admin-main {
        margin-left: 0;
        padding: 1rem;
  }

  .admin-content {
        padding: 1rem;
  }
}
</style>