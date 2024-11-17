// stores/licensesStore.js
import { defineStore } from 'pinia'

export const useLicensesStore = defineStore('licenses', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getLicenseById: (state) => (id) =>
      state.records.find(record => record.id === id),
    // Keep other getters if any
  },

  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached licenses:', this.records.length)
        return
      }

      this.isLoading = true
      this.error = null

      try {
        console.log('Fetching licenses from cache...')
        const response = await fetch('/cache/licenses.json')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Cache data:', data)

        const licenses = data.licenses || []
        console.log('Licenses array:', licenses)

        // Store records
        this.records = licenses

        console.log('Final records count:', this.records.length)
      } catch (error) {
        console.error('Error fetching licenses from cache:', error)
        this.error = error.message
        this.records = []
      } finally {
        this.isLoading = false
      }
    }
  }
})