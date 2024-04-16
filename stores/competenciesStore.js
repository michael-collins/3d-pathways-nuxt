import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';


export const useCompetenciesStore = defineStore('competencies', {
  state: () => ({
    competencies: [], // Change the state property name to 'competencies'
  }),
  // Getters allow you to define computed properties based on the state
  getters: {
    // Define a getter to find a competency by its ID
    getCompetencyById: (state) => (id) => {
      return state.competencies.find((record) => record.id === id);
    },
  },
  actions: {
    async fetchRecords() {
      if (this.competencies.length) return;
      const config = useRuntimeConfig();
      let data = await getAirtableRecords('competencies', config.public.AirtableApiKey);
      
      // Filter out records where the published field is not true
      data = data.filter(record => record.fields.published === true);
      
      this.competencies = data;
    },
  },
});
