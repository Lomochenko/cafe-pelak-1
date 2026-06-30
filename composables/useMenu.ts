import { storeToRefs } from 'pinia'
import { useMenuStore } from '~/stores/menu'

export const useMenu = () => {
  const menuStore = useMenuStore()
  
  const { menuItems, categories, categoryNames } = storeToRefs(menuStore)

  return {
    menuItems,
    availableCategories: categories,
    categories: categoryNames,
    fetchAll: menuStore.fetchAll,
    addMenuItem: menuStore.addMenuItem,
    updateMenuItem: menuStore.updateMenuItem,
    deleteMenuItem: menuStore.deleteMenuItem,
    addCategory: menuStore.addCategory,
    updateCategory: menuStore.updateCategory,
    deleteCategory: menuStore.deleteCategory,
  }
}