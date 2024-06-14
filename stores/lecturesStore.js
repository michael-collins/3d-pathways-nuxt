import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useLecturesStore = defineStore('lectures', {
    state: () => ({
        records: [],
    }),
    // Getters allow you to define computed properties based on the state
  getters: {
    // Define a getter to find an lecture by its ID
    getLectureById: (state) => (id)=> {
      return (id) => state.records.find((record) => record.id === id);
    },
    getLectureBySlug: (state) => (slug) => {
      return state.records.find(record => record.fields.slug === slug);
  }
  },
  actions: {
      async fetchRecords() {
          if (this.records.length) return; // Avoid refetching if already populated
          const config = useRuntimeConfig();
          const data = await getAirtableRecords('lectures', config.public.AirtableApiKey);
          // Filter out records where the published field is not true
        const filteredData = data.filter(record => record.fields.published === true);
        
        this.records = filteredData;
      },
      
  },
});
