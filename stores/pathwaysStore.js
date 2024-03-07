import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const usePathwaysStore = defineStore('pathways', {
    state: () => ({
        records: [],
    }),
    actions: {
        async fetchRecords() {
            if (this.records.length) return; // Avoid refetching if already populated
            const config = useRuntimeConfig();
            const data = await getAirtableRecords('pathways', config.public.AirtableApiKey);
            this.records = data;
        }
    },
});
