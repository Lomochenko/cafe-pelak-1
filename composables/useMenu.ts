// useMenu — fetches from /api/menu and /api/categories, all mutations go through the API
export const useMenu = () => {
  const menuItems = useState('menuItems', () => [] as any[])
  const availableCategories = useState('availableCategories', () => [] as any[])

  const fetchAll = async () => {
    const [items, cats] = await Promise.all([
      $fetch<any[]>('/api/menu'),
      $fetch<any[]>('/api/categories'),
    ])
    menuItems.value = items
    availableCategories.value = cats
  }

  const categories = computed(() => availableCategories.value.map((c: any) => c.name))

  const addMenuItem = async (item: any) => {
    const created = await $fetch<any>('/api/menu', { method: 'POST', body: item })
    menuItems.value = [...menuItems.value, created]
  }

  const updateMenuItem = async (id: number, updates: any) => {
    const updated = await $fetch<any>(`/api/menu/${id}`, { method: 'PUT', body: updates })
    menuItems.value = menuItems.value.map((i: any) => i.id === id ? updated : i)
  }

  const deleteMenuItem = async (id: number) => {
    await $fetch(`/api/menu/${id}`, { method: 'DELETE' })
    menuItems.value = menuItems.value.filter((i: any) => i.id !== id)
  }

  const addCategory = async (category: any) => {
    const created = await $fetch<any>('/api/categories', { method: 'POST', body: category })
    availableCategories.value = [...availableCategories.value, created]
  }

  const updateCategory = async (id: number, updates: any) => {
    const updated = await $fetch<any>(`/api/categories/${id}`, { method: 'PUT', body: updates })
    availableCategories.value = availableCategories.value.map((c: any) => c.id === id ? updated : c)
    menuItems.value = await $fetch<any[]>('/api/menu')
  }

  const deleteCategory = async (id: number) => {
    await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
    availableCategories.value = availableCategories.value.filter((c: any) => c.id !== id)
    menuItems.value = await $fetch<any[]>('/api/menu')
  }

  return {
    menuItems,
    availableCategories,
    categories,
    fetchAll,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}
