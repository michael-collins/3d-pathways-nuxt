// stores/exercisesStore.js
import { defineStore } from 'pinia'

export const useExercisesStore = defineStore('exercises', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),
  
  getters: {
    // Get an exercise by its ID
    getExerciseById: (state) => (id) => {
      return state.records.find(record => record.id === id)
    },
    // Get an exercise by its slug
    getExerciseBySlug: (state) => (slug) => {
      return state.records.find(record => record.fields.slug === slug)
    },
    // Add any other getters here
  },
  
  actions: {
    async fetchRecords() {
      if (this.records.length) {
        // console.log('Using cached exercises:', this.records.length)
        return
      }
      
      this.isLoading = true
      this.error = null

      try {
        // console.log('Fetching exercises from cache...')
        const response = await fetch('/cache/exercises.json')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        // console.log('Cache data:', data)

        const exercises = data.exercises || []
        // console.log('Exercises array:', exercises)
        
        // Filter and store exercises
        this.records = exercises.filter(record => {
          const isPublished = record?.fields?.published === true;
          // console.log(`Record ${record?.id}: published = ${isPublished}`)
          return isPublished
        })
        
        // console.log('Final records count:', this.records.length)
      } catch (error) {
        console.error('Error fetching exercises from cache:', error)
        this.error = error.message
        this.records = []
      } finally {
        this.isLoading = false
      }
    }
  }
})