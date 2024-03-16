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
    console.log('fetchRecords called');
    if (this.competencies.length) return;
    console.log('fetching records');
    const config = useRuntimeConfig();
    console.log('config:', config);
    const data = await getAirtableRecords('competencies', config.public.AirtableApiKey);
    console.log('fetched data:', data);
    this.competencies = data;
  },
  },
});
