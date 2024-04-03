<template>
  <div class="w-full p-10">
    <HeroComponent title="Pathways">
      <template #description>
        <p>This is the description for the pathways page.</p>
      </template>
    </HeroComponent>
    <!-- <pre class="mockup-code m-8">{{ pathwaysStore.records }}</pre> -->

  
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="pathwaysStore.records" :isLoading="isLoading" destination="pathways" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
         <ListItem :records="pathwaysStore.records" :isLoading="isLoading" destination="pathways" />
        </ListContainer>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumbs',
})
useHead({
  title: 'Pathways'
})
const pathwaysStore = usePathwaysStore(); // Use the dedicated pathways store
const isLoading = ref(true); // Initialize isLoading as true

onMounted(() => {
  pathwaysStore.fetchRecords(); // Call the fetchRecords action specific to pathways
  isLoading.value = false; // Set isLoading to false when the records have been fetched

});

// Toggle view mode
const viewMode = ref('list') // Initialize viewMode as 'grid'
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
</script>
