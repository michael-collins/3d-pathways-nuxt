import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        records: [],
    }),
    // Getters allow you to define computed properties based on the state
  getters: {
    // Define a getter to find an project by its ID
    getProjectById: (state) => (id) => {
        return state.records.find(record => record.id === id);
      },
      getProjectBySlug: (state) => (slug) => {
          return state.records.find(record => record.fields.slug === slug);
      }
  },
    actions: {
        async fetchRecords() {
            if (this.records.length) return; // Avoid refetching if already populated
            const config = useRuntimeConfig();
            const data = await getAirtableRecords('projects', config.public.AirtableApiKey);
            
            // Filter out records where the published field is not true
        const filteredData = data.filter(record => record.fields.published === true);
        
        this.records = filteredData;
        }
    },
});
