// stores/specializationsStore.js
import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app' // Import useRuntimeConfig

export const useSpecializationsStore = defineStore('specializations', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),
  
  getters: {
    // Getter to find a specialization by its ID
    getSpecializationById: (state) => (id) => {
      return state.records.find((record) => record.id === id);
    },
    
    // Getter to find a specialization by its slug
    getSpecializationBySlug: (state) => (slug) => {
      return state.records.find((record) => record.fields.slug === slug);
    },
    
    // Add any other existing getters here
  },
  
  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached specializations:', this.records.length);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        console.log('Fetching specializations from cache...');
        
        const config = useRuntimeConfig();
        const data = await $fetch('/cache/specializations.json', {
          baseURL: config.public.baseURL,
        });

        console.log('Cache data:', data);

        const specializations = data.specializations || [];
        console.log('Specializations array:', specializations);

        // Filter and store specializations
        this.records = specializations.filter((record) => {
          const isPublished = record?.fields?.published === true;
          console.log(`Record ${record?.id}: published = ${isPublished}`);
          return isPublished;
        });

        console.log('Final records count:', this.records.length);
      } catch (error) {
        console.error('Error fetching specializations from cache:', error);
        this.error = error.message;
        this.records = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});