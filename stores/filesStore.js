import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useFilesStore = defineStore('files', {
  state: () => ({
      records: [],
  }),
  // Getters allow you to define computed properties based on the state
  getters: {
    // Define a getter to find an file by its ID
    getFileById: (state) => (id) => {
      return state.records.find((record) => record.id === id);
    }
  },
actions: {
  async fetchRecords() {
      if (this.records.length) return; // Avoid refetching if already populated
      const config = useRuntimeConfig();
      const data = await getAirtableRecords('files', config.public.AirtableApiKey);
      // Filter out records where the published field is not true
    // const filteredData = data.filter(record => record.fields.published === true);
    
    // this.records = filteredData;
    this.records = data;
  },
  
},
});
