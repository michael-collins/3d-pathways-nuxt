// stores/pathwaysStore.js
import { defineStore } from 'pinia';

export const usePathwaysStore = defineStore('pathways', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    // Get a pathway by its ID
    getPathwayById: (state) => (id) => {
      return state.records.find((record) => record.id === id);
    },
    // Get a pathway by its slug
    getPathwayBySlug: (state) => (slug) => {
      return state.records.find((record) => record.fields.slug === slug);
    },
    // Keep any other existing getters
  },
  actions: {
    async fetchRecords() {
      if (this.records.length) {
        // console.log('Using cached pathways:', this.records.length);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        // console.log('Fetching pathways from cache...');
        const response = await fetch('/cache/pathways.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('Cache data:', data);

        const pathways = data.pathways || [];
        // console.log('Pathways array:', pathways);

        // Filter and store pathways
        this.records = pathways.filter((record) => {
          const isPublished = record?.fields?.published === true; // Updated condition
          // console.log(`Record ${record?.id}: published = ${isPublished}`);
          return isPublished;
        });

        // console.log('Final records count:', this.records.length);
      } catch (error) {
        console.error('Error fetching pathways from cache:', error);
        this.error = error.message;
        this.records = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});