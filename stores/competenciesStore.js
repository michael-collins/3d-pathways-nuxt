// stores/competenciesStore.js
import { defineStore } from 'pinia'

export const useCompetenciesStore = defineStore('competencies', {
  state: () => ({
    competencies: [], // Keeps the state property name as 'competencies'
    isLoading: false,
    error: null,
  }),
  
  getters: {
    // Define a getter to find a competency by its ID
    getCompetencyById: (state) => (id) => {
      return state.competencies.find((record) => record.id === id);
    },
    // Add any other getters here
  },
  
  actions: {
    async fetchRecords() {
      if (this.competencies.length) {
        // console.log('Using cached competencies:', this.competencies.length);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        // console.log('Fetching competencies from cache...');
        const response = await fetch('/cache/competencies.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('Cache data:', data);

        const competencies = data.competencies || [];
        // console.log('Competencies array:', competencies);

        // Filter and store competencies
        this.competencies = competencies.filter((record) => {
          const isPublished = record?.fields?.published === true;
          // console.log(`Record ${record?.id}: published = ${isPublished}`);
          return isPublished;
        });

        // console.log('Final records count:', this.competencies.length);
      } catch (error) {
        console.error('Error fetching competencies from cache:', error);
        this.error = error.message;
        this.competencies = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});