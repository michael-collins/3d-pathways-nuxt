// stores/criteriaStore.js
import { defineStore } from 'pinia'

export const useCriteriaStore = defineStore('criteria', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    // Define a getter to find a criterion by its ID
    getCriteriaById: (state) => (id) => {
      return state.records.find((record) => record.id === id)
    },
    // Add any other getters here
  },

  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached criteria:', this.records.length)
        return
      }

      this.isLoading = true
      this.error = null

      try {
        console.log('Fetching criteria from cache...')
        const response = await fetch('/cache/criteria.json')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Cache data:', data)

        const criteria = data.criteria || []
        console.log('Criteria array:', criteria)

        // Filter and store criteria
        this.records = criteria.filter(record => {
          const isPublished = record?.fields?.published === true;
          console.log(`Record ${record?.id}: published = ${isPublished}`)
          return isPublished
        })

        console.log('Final records count:', this.records.length)
      } catch (error) {
        console.error('Error fetching criteria from cache:', error)
        this.error = error.message
        this.records = []
      } finally {
        this.isLoading = false
      }
    },
  },
})