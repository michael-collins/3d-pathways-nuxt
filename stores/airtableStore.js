import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';


export const useAirtableStore = defineStore({
    id: 'airtableStore',
    state: () => ({
      records: {},
    }),
    getters: {
      allRecords() {
        return this.records;
      },
      getRecordsByTable: (state) => (tableName) => {
        return state.records[tableName] || [];
      },
    },
    actions: {
      async fetchRecords(tableName) {
        const config = useRuntimeConfig();
        const data = await getAirtableRecords(tableName, config.public.AirtableApiKey);
        // Filter out records where the published field is not true
        // const filteredData = data.filter(record => record.fields.published === true);
        
        // this.records[tableName] = filteredData;
        this.records[tableName] = data;
      },
    },
  });
