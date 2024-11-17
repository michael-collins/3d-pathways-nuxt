// stores/filesStore.js
import { defineStore } from 'pinia'

export const useFilesStore = defineStore('files', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getFileById: (state) => (id) =>
      state.records.find(record => record.id === id),
    // Keep other getters if any
  },

  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached files:', this.records.length)
        return
      }

      this.isLoading = true
      this.error = null

      try {
        console.log('Fetching files from cache...')
        const response = await fetch('/cache/files.json')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Cache data:', data)

        const files = data.files || []
        console.log('Files array:', files)

        // Store records
        this.records = files

        console.log('Final records count:', this.records.length)
      } catch (error) {
        console.error('Error fetching files from cache:', error)
        this.error = error.message
        this.records = []
      } finally {
        this.isLoading = false
      }
    }
  }
})