// stores/filesStore.js
import { defineStore } from 'pinia';
import filesData from '~/public/cache/files.json';

export const useFilesStore = defineStore('files', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getFileById: (state) => (id) =>
      state.records.find(record => record.id === id),
    // Keep other getters if any
  },

  actions: {
    async fetchRecords() {
      if (this.records.length) {
        console.log('Using cached files:', this.records.length);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        this.records = filesData.files; // Adjust based on your JSON structure
        console.log('Files loaded from cache:', this.records.length);
      } catch (err) {
        this.error = 'Failed to load files.';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
});