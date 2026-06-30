import { defineStore } from 'pinia'

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
}

export interface Category {
  id: number
  name: string
  icon: string
  description: string
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuItems: [] as MenuItem[],
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    categoryNames: (state) => state.categories.map((c) => c.name),
  },

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const [items, cats] = await Promise.all([
          $fetch<MenuItem[]>('/api/menu'),
          $fetch<Category[]>('/api/categories'),
        ])
        this.menuItems = items
        this.categories = cats
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch data'
        console.error('[API] Fetch error:', error)
      } finally {
        this.loading = false
      }
    },

    async addMenuItem(item: Omit<MenuItem, 'id'>) {
      try {
        const created = await $fetch<MenuItem>('/api/menu', { method: 'POST', body: item })
        this.menuItems.push(created)
        return created
      } catch (error: any) {
        this.error = error.message || 'Failed to add menu item'
        throw error
      }
    },

    async updateMenuItem(id: number, updates: Partial<MenuItem>) {
      try {
        const updated = await $fetch<MenuItem>(`/api/menu/${id}`, { method: 'PUT', body: updates })
        const index = this.menuItems.findIndex((i) => i.id === id)
        if (index !== -1) {
          this.menuItems[index] = updated
        }
        return updated
      } catch (error: any) {
        this.error = error.message || 'Failed to update menu item'
        throw error
      }
    },

    async deleteMenuItem(id: number) {
      try {
        await $fetch(`/api/menu/${id}`, { method: 'DELETE' })
        this.menuItems = this.menuItems.filter((i) => i.id !== id)
      } catch (error: any) {
        this.error = error.message || 'Failed to delete menu item'
        throw error
      }
    },

    async addCategory(category: Omit<Category, 'id'>) {
      try {
        const created = await $fetch<Category>('/api/categories', { method: 'POST', body: category })
        this.categories.push(created)
        return created
      } catch (error: any) {
        this.error = error.message || 'Failed to add category'
        throw error
      }
    },

    async updateCategory(id: number, updates: Partial<Category>) {
      try {
        const updated = await $fetch<Category>(`/api/categories/${id}`, { method: 'PUT', body: updates })
        const index = this.categories.findIndex((c) => c.id === id)
        if (index !== -1) {
          this.categories[index] = updated
        }
        this.menuItems = await $fetch<MenuItem[]>('/api/menu')
        return updated
      } catch (error: any) {
        this.error = error.message || 'Failed to update category'
        throw error
      }
    },

    async deleteCategory(id: number) {
      try {
        await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
        this.categories = this.categories.filter((c) => c.id !== id)
        this.menuItems = await $fetch<MenuItem[]>('/api/menu')
      } catch (error: any) {
        this.error = error.message || 'Failed to delete category'
        throw error
      }
    },
  },
})