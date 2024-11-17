// stores/projectsStore.js
import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app' // Import useRuntimeConfig

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getProjectById: (state) => (id) =>
      state.records.find((record) => record.id === id),

    getProjectBySlug: (state) => (slug) =>
      state.records.find((record) => record.fields.slug === slug),
  },

  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached records:', this.records.length)
        return
      }

      this.isLoading = true
      this.error = null

      try {
        console.log('Fetching projects from cache...')

        const config = useRuntimeConfig()
        const data = await $fetch('/cache/projects.json', {
          baseURL: config.public.baseURL,
        })

        console.log('Cache data:', data)

        const projects = data.projects || []
        console.log('Projects array:', projects)

        // Filter and store projects
        this.records = projects.filter((record) => {
          const isPublished = record?.fields?.published === true;
          console.log(`Record ${record?.id}: published = ${isPublished}`)
          return isPublished
        })

        console.log('Final records count:', this.records.length)
      } catch (error) {
        console.error('Error fetching projects from cache:', error)
        this.error = error.message
        this.records = []
      } finally {
        this.isLoading = false
      }
    },
  },
})