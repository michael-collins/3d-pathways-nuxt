import { defineStore } from 'pinia';
import { getAirtableRecords } from '@/services/AirtableService';

export const useRubricsStore = defineStore('rubrics', {
  state: () => ({
      records: [],
  }),
  // Getters allow you to define computed properties based on the state
  getters: {
  // Define a getter to find a criterion by its ID
  getRubricById: (state) => (id) => {
    return state.records.find((record) => record.id === id);
  },
  getRubricByExerciseId(state) {
    return (recordId) => {
      const criteriaStore = useCriteriaStore();
      const rubric = state.records.find((record) => record.fields.exercises && record.fields.exercises.includes(recordId));
  
      if (rubric && rubric.fields.criteria) {
        const criteria = rubric.fields.criteria.map(criteriaId => criteriaStore.getCriteriaById(criteriaId));
        return { rubric, criteria };
      }
  
      return null;
    };
  },
},
actions: {
    async fetchRecords() {
        if (this.records.length) return; // Avoid refetching if already populated
        const config = useRuntimeConfig();
        const data = await getAirtableRecords('rubrics', config.public.AirtableApiKey);
        // Filter out records where the published field is not true
      const filteredData = data.filter(record => record.fields.published === true);
      
      this.records = filteredData;
    },
    
},
});
