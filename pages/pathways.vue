<template>
    <NavBar />
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-left">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Pathways</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
      </div>
    </div>
    <LinkedCardComponent :records="airtableStore.records" destination="PathwayDetail" />
    <pre>{{ airtableStore.records }}</pre>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRuntimeConfig } from '#app';
  import { useAirtableStore } from '@/stores/airtableStore';
  import LinkedCardComponent from '@/components/LinkedCardComponent.vue';
  import NavBar from '@/components/NavBar';
  import { getAirtableRecords } from '@/services/AirtableService';
  
  const airtableStore = useAirtableStore();
  
  onMounted(async () => {
    const config = useRuntimeConfig();
    if (!airtableStore.records.length) {
      let recordsData = localStorage.getItem('airtableRecords');
      if (!recordsData) {
        // Fetch from Airtable if not in local storage
        const rawData = await getAirtableRecords('pathways', config.public.AirtableApiKey);
        localStorage.setItem('airtableRecords', JSON.stringify(rawData)); // Store fetched data for future use
        recordsData = rawData;
      } else {
        recordsData = JSON.parse(recordsData); // Parse stored string back into an array
      }
      // Update Pinia store with either fetched or locally stored data
      airtableStore.setRecords(recordsData);
    }
  });
  </script>
  
