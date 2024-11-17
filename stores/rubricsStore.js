// stores/rubricsStore.js
import { defineStore } from 'pinia'
import { useCriteriaStore } from './criteriaStore' // Import criteriaStore if needed

export const useRubricsStore = defineStore('rubrics', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    // Get a rubric by its ID
    getRubricById: (state) => (id) => {
      return state.records.find((record) => record.id === id)
    },
    // Get a rubric associated with an exercise
    getRubricByExerciseId: (state) => (recordId) => {
      const criteriaStore = useCriteriaStore()
      const rubric = state.records.find(
        (record) =>
          record.fields.exercises && record.fields.exercises.includes(recordId)
      )

      if (rubric && rubric.fields.criteria) {
        const criteria = rubric.fields.criteria.map((criteriaId) =>
          criteriaStore.getCriteriaById(criteriaId)
        )
        return { rubric, criteria }
      }

      return null
    },
    // Keep any other existing getters
  },
  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached rubrics:', this.records.length)
        return
      }

      this.isLoading = true
      this.error = null

      try {
        console.log('Fetching rubrics from cache...')
        const response = await fetch('/cache/rubrics.json')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Cache data:', data)

        const rubrics = data.rubrics || []
        console.log('Rubrics array:', rubrics)

        // Filter and store rubrics
        this.records = rubrics.filter((record) => {
          const isPublished = record?.fields?.published === true;
          console.log(`Record ${record?.id}: published = ${isPublished}`)
          return isPublished
        })

        console.log('Final records count:', this.records.length)
      } catch (error) {
        console.error('Error fetching rubrics from cache:', error)
        this.error = error.message
        this.records = []
      } finally {
        this.isLoading = false
      }
    },
  },
})