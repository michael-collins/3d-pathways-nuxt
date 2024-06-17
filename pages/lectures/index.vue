<template>
  <div class="w-full p-10">
    <HeroComponent title="Lectures">
      <template #description>
        <p>This is the description for the lectures page.</p>
      </template>
    </HeroComponent>
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="lecturesStore.records" :isLoading="isLoading" destination="lectures" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
          <ListItem :records="lecturesStore.records" :isLoading="isLoading" destination="lectures" />
        </ListContainer>
      </div>
    </div>
    
  </div>
      <!-- <pre class="mockup-code m-8">{{ pathwaysStore.records }}</pre> -->
  
  </template>
  
  <script setup>

  definePageMeta({
    layout: 'breadcrumbs',
  })
  useHead({
    title: 'Lectures'
  })
  const lecturesStore = useLecturesStore(); // Use the dedicated lectures store
  
  

  await lecturesStore.fetchRecords(); // Call the fetchRecords action specific to lectures
  
  // Toggle view mode
const viewMode = ref('list') // Initialize viewMode as 'grid'
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
  </script>
  