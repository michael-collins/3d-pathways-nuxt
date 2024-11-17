// stores/lecturesStore.js
import { defineStore } from 'pinia';

export const useLecturesStore = defineStore('lectures', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    // Get a lecture by its ID
    getLectureById: (state) => (id) => {
      return state.records.find((record) => record.id === id);
    },
    // Get a lecture by its slug
    getLectureBySlug: (state) => (slug) => {
      return state.records.find((record) => record.fields.slug === slug);
    },
    // Add any other getters here
  },
  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached lectures:', this.records.length);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        console.log('Fetching lectures from cache...');
        const response = await fetch('/cache/lectures.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Cache data:', data);

        const lectures = data.lectures || [];
        console.log('Lectures array:', lectures);

        // Filter and store lectures
        this.records = lectures.filter((record) => {
          const isPublished = record?.fields?.published === true;
          console.log(`Record ${record?.id}: published = ${isPublished}`);
          return isPublished;
        });

        console.log('Final records count:', this.records.length);
      } catch (error) {
        console.error('Error fetching lectures from cache:', error);
        this.error = error.message;
        this.records = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});