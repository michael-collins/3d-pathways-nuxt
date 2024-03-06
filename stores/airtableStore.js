// stores/airtableStore.js
import { defineStore } from 'pinia';

export const useAirtableStore = defineStore('airtable', {
    // state
    state: () => ({
        records: [],
    }),
    // actions
    actions: {
        setRecords(records) {
            this.records = records;
        },
    },
    // getters
    getters: {
        getRecords: (state) => state.records,
    },
});
