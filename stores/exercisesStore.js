import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';
import slugify from 'slugify';

export const useExercisesStore = defineStore('exercises', {
    state: () => ({
        records: [],
    }),
    // Getters allow you to define computed properties based on the state
  getters: {
    // Define a getter to find an exercise by its ID
    getExerciseById: (state) => (id) => {
        return state.records.find(record => record.id === id);
    },
    getExerciseBySlug: (state) => (slug) => {
        return state.records.find(record => record.fields.slug === slug);
    }
  },
    actions: {
        async fetchRecords() {
            if (this.records.length) return; // Avoid refetching if already populated
            const config = useRuntimeConfig();
            const data = await getAirtableRecords('exercises', config.public.AirtableApiKey);
            // Filter out records where the published field is not true
            const filteredData = data.filter(record => record.fields.published === true);
        
            this.records = filteredData;
        
            // this.records = filteredData.map(record => {
            //   console.log(record.fields.slug); // Print out the slug
            //   return {
            //     ...record,
            //     slug: record.fields.slug,
            //   };
            // });
        }
    },
});
