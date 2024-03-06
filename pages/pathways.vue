<template>
    <NavBar />
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-left">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Pathways</h1>
          <p class="py-6">Provident cupiditate voluptatem et in...</p>
        </div>
      </div>
    </div>
    <!-- Temporarily comment out to isolate the issue -->
    <LinkedCardComponent :records="airtableStore.records" destination="PathwayDetail" />
    <!-- Debugging: Confirm data structure -->
    <pre>{{ airtableStore.records }}</pre>
  </template>
  
  <script setup>
import { onMounted } from 'vue';
import { useRuntimeConfig } from '#app';
import { useAirtableStore } from '@/stores/airtableStore';
import { getAirtableRecords } from '@/services/airtableService';
import LinkedCardComponent from '@/components/LinkedCardComponent.vue';
import NavBar from '@/components/NavBar';

const airtableStore = useAirtableStore();

onMounted(async () => {
  const config = useRuntimeConfig();
  if (!airtableStore.records.length) {
    let recordsData = localStorage.getItem('airtableRecords');
    if (!recordsData) {
      // Fetch from Airtable if not in local storage
      const rawData = await getAirtableRecords('pathways', config.airtableApiKey);
      recordsData = rawData.map(record => ({
        id: record.id,
        fields: { // Structuring for LinkedCardComponent
          name: record.fields.name,
          description: record.fields.description
        }
      }));
      localStorage.setItem('airtableRecords', JSON.stringify(recordsData)); // Store fetched and structured data
    } else {
      recordsData = JSON.parse(recordsData); // Assume already structured correctly from previous saves
    }
    // Update Pinia store with either fetched or locally stored data
    airtableStore.setRecords(recordsData);
  }
});
</script>
  
