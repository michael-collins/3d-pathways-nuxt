// services/AirtableService.js
// import axios from 'axios';

const baseURL = `https://api.airtable.com/v0/appErImxpeRDom8je`;
const config = {
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}`
  }
};

export default {
  async getPathwayRecords() {
    try {
      const response = await $fetch(`${baseURL}/pathways`, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getExerciseRecords() {
    try {
      const response = await $fetch(`${baseURL}/exercises`, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getExerciseById(exerciseId) {
    console.log(`Fetching exercise with ID: ${exerciseId}`); // Log the ID being used
    try {
      const response = await $fetch(`${baseURL}/exercises/${exerciseId}`, config);
      console.log(`Response for exercise ${exerciseId}:`, response.data); // Log the response
      return response.data;
    } catch (error) {
      console.error(`Error fetching exercise ${exerciseId}:`, error);
    }
  },

  async getCompetencyById(competencyId) {
    try {
      const response = await $fetch(`${baseURL}/competencies/${competencyId}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching competency:', error);
    }
  },

  async getPathwayRecordById(recordId) {
    try {
      const response = await $fetch(`${baseURL}/pathways/${recordId}`, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};