<template>
    <div class="p-8" v-for="(records, tableName) in airtableStore.allRecords" :key="tableName">
      <h2 class="prose text-2xl">{{ tableName }}</h2>
      <p class="p-4">
      <pre class="text-xs bg-base-300 p-10 rounded-xl overflow-auto scroll-auto">{{ JSON.stringify(records, null, 2) }}</pre>
    </p>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'breadcrumbs',
  })
  
  const airtableStore = useAirtableStore();
  
  onMounted(async () => {
    await airtableStore.fetchRecords('lessons');
    await airtableStore.fetchRecords('exercises');
    await airtableStore.fetchRecords('projects');
    await airtableStore.fetchRecords('specializations');
    await airtableStore.fetchRecords('pathways');
    await airtableStore.fetchRecords('files');
    await airtableStore.fetchRecords('rubrics');
    await airtableStore.fetchRecords('criteria');
  });
  </script>