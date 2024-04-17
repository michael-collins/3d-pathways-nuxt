import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useCriteriaStore = defineStore('criteria', {
  state: () => ({
      records: [],
  }),
  // Getters allow you to define computed properties based on the state
  getters: {
  // Define a getter to find a criterion by its ID
  getCriteriaById: (state) => (id) => {
    return state.records.find((record) => record.id === id);
  }
},
actions: {
    async fetchRecords() {
        if (this.records.length) return; // Avoid refetching if already populated
        const config = useRuntimeConfig();
        const data = await getAirtableRecords('criteria', config.public.AirtableApiKey);
        // Filter out records where the published field is not true
      const filteredData = data.filter(record => record.fields.published === true);
      
      this.records = filteredData;
    },
    
},
});
