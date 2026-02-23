import { ref, computed } from 'vue'

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
}

export const useMenu = () => {
  const menuItems = ref<MenuItem[]>([
    {
      id: 1,
      name: 'Lounge Elegance Espresso',
      description: 'Rich and full-bodied espresso with a smooth finish',
      price: 3.5,
      category: 'Signature Blends',
    },
    {
      id: 2,
      name: 'Velvet Mocha Delight',
      description: 'Silky mocha infused with premium chocolate and espresso',
      price: 4.25,
      category: 'Signature Blends',
    },
    {
      id: 3,
      name: 'Butter Croissant',
      description: 'Flaky French croissant with layers of butter',
      price: 3.0,
      category: 'Pastries',
    },
    {
      id: 4,
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with ganache frosting',
      price: 4.5,
      category: 'Gourmet Treats',
    },
  ])

  const categories = computed(() => {
    return Array.from(new Set(menuItems.value.map((item) => item.category)))
  })

  const getItemsByCategory = (category: string) => {
    return menuItems.value.filter((item) => item.category === category)
  }

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newId = Math.max(0, ...menuItems.value.map(i => i.id)) + 1
    menuItems.value.push({ ...item, id: newId })
  }

  const updateMenuItem = (id: number, updates: Partial<MenuItem>) => {
    const index = menuItems.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      menuItems.value[index] = { ...menuItems.value[index], ...updates }
    }
  }

  const deleteMenuItem = (id: number) => {
    menuItems.value = menuItems.value.filter((item) => item.id !== id)
  }

  return {
    menuItems,
    categories,
    getItemsByCategory,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  }
}

