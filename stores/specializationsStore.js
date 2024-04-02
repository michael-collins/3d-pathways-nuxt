import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useSpecializationsStore = defineStore('specializations', {
    state: () => ({
        records: [],
    }),
    // Getters allow you to define computed properties based on the state
  getters: {
    // Define a getter to find an specialization by its ID
    getSpecializationById: (state) => (id)=> {
      return (id) => state.records.find((record) => record.id === id);
    }
  },
  actions: {
      async fetchRecords() {
          if (this.records.length) return; // Avoid refetching if already populated
          const config = useRuntimeConfig();
          const data = await getAirtableRecords('specializations', config.public.AirtableApiKey);
          this.records = data;
      },
      
  },
});