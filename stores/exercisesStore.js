import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useExercisesStore = defineStore('exercises', {
    state: () => ({
        records: [],
    }),
    actions: {
        async fetchRecords() {
            if (this.records.length) return; // Avoid refetching if already populated
            const config = useRuntimeConfig();
            const data = await getAirtableRecords('exercises', config.public.AirtableApiKey);
            this.records = data;
        }
    },
});
