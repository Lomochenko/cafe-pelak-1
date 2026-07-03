import { ref, readonly } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  icon: string
}

let idCounter = 0
const toasts = ref<Toast[]>([])

export function useToast() {
  const add = (message: string, type: Toast['type'] = 'info') => {
    const icons: Record<Toast['type'], string> = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
    }
    const id = ++idCounter
    toasts.value.push({ id, message, type, icon: icons[type] })
    setTimeout(() => remove(id), 4000)
  }

  const remove = (id: number) => {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  return {
    toasts: readonly(toasts),
    add,
    remove,
  }
}
