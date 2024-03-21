import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useLessonsStore = defineStore('lessons', {
    state: () => ({
        records: [],
    }),
    // Getters allow you to define computed properties based on the state
  getters: {
    // Define a getter to find an lesson by its ID
    getLessonById: (state) => (id)=> {
      return (id) => state.records.find((record) => record.id === id);
    }
  },
  actions: {
      async fetchRecords() {
          if (this.records.length) return; // Avoid refetching if already populated
          const config = useRuntimeConfig();
          const data = await getAirtableRecords('lessons', config.public.AirtableApiKey);
          this.records = data;
      },
      
  },
});
