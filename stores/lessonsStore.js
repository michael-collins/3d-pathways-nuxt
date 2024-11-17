// stores/lessonsStore.js
import { defineStore } from 'pinia';

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    // Get a lesson by its ID
    getLessonById: (state) => (id) => {
      return state.records.find((record) => record.id === id);
    },
    // Get a lesson by its slug
    getLessonBySlug: (state) => (slug) => {
      return state.records.find((record) => record.fields.slug === slug);
    },
    // Keep any other existing getters
  },
  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached lessons:', this.records.length);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        console.log('Fetching lessons from cache...');
        const response = await fetch('/cache/lessons.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Cache data:', data);

        const lessons = data.lessons || [];
        console.log('Lessons array:', lessons);

        // Filter and store lessons
        this.records = lessons.filter((record) => {
          const isPublished = record?.fields?.published === true;
          console.log(`Record ${record?.id}: published = ${isPublished}`);
          return isPublished;
        });

        console.log('Final records count:', this.records.length);
      } catch (error) {
        console.error('Error fetching lessons from cache:', error);
        this.error = error.message;
        this.records = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});