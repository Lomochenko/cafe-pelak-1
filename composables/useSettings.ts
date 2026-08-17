import { ref } from 'vue'

export const useSettings = () => {
  const mapUrl = ref('')

  const fetchMapUrl = async () => {
    try {
      const data = await $fetch('/api/settings/map')
      mapUrl.value = data.url
    } catch (error) {
      console.error('Failed to fetch map URL:', error)
    }
  }

  const updateMapUrl = async (url: string) => {
    try {
      await $fetch('/api/settings/map', {
        method: 'PUT',
        body: { url }
      })
      mapUrl.value = url
      return true
    } catch (error) {
      console.error('Failed to update map URL:', error)
      return false
    }
  }

  return { mapUrl, fetchMapUrl, updateMapUrl }
}