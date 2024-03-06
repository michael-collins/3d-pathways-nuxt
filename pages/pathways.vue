<template>
    <div class="bg-base-200">
        <NavBar />  
       
  
  
      <!-- <card-component card-component :records="records"></card-component> -->
      <LinkedCardComponent :records="records" destination="PathwayDetail" />
      {{ records }}
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import LinkedCardComponent from '@/components/LinkedCardComponent.vue';
import NavBar from '@/components/NavBar';
import { getAirtableRecords } from '@/services/AirtableService';

const records = ref([]);

onMounted(async () => {
    // Fetching data from Airtable
    const rawData = await getAirtableRecords('pathways');
    
    // Assuming the data is returned correctly, map through rawData to structure it as needed
    records.value = rawData.map(record => ({
        id: record.id,
        name: record.fields['Name'], // Ensure these match the field names in your Airtable base
        description: record.fields['Description']
    }));
    
    // Temporary test record to append to fetched records
    const testRecord = {
        id: 'testRecord',
        name: 'Test Record Name',
        description: 'This is an example description!',
        // Add any additional fields you wish to mock
    };

    // Append the test record to the records array
    records.value.push(testRecord);
});
</script>

    
  