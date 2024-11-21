// stores/licensesStore.js
import { defineStore } from 'pinia';
import licensesData from '~/public/cache/licenses.json';

export const useLicensesStore = defineStore('licenses', {
  state: () => ({
    records: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getLicenseById: (state) => (id) =>
      state.records.find(record => record.id === id),
    // Keep other getters if any
  },

  actions: {
    async fetchRecords() {
      if (this.records.length) {
        // console.log('Using cached licenses:', this.records.length);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        // Assuming licensesData has a 'licenses' array
        this.records = licensesData.licenses;
        // console.log('Licenses loaded from cache:', this.records.length);
      } catch (err) {
        this.error = 'Failed to load licenses.';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
});