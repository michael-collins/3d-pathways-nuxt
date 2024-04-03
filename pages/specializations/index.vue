<template>
  <div class="w-full p-10">
    <HeroComponent title="Specializations">
      <template #description>
        <p>This is the description for the specializations page.</p>
      </template>
    </HeroComponent>
    <!-- <pre class="mockup-code m-8">{{ specializationsStore.records }}</pre> -->

    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="specializationsStore.records" :isLoading="isLoading" destination="specializations" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
      <ListItem :records="specializationsStore.records" :isLoading="isLoading" destination="specializations" />
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
  title: 'Specializations'
})
const specializationsStore = useSpecializationsStore(); // Use the dedicated specializations store
const isLoading = ref(true); // Initialize isLoading as true

onMounted(() => {
  specializationsStore.fetchRecords(); // Call the fetchRecords action specific to specializations
  isLoading.value = false; // Set isLoading to false when the records have been fetched

});

// Toggle view mode
const viewMode = ref('list') // Initialize viewMode as 'grid'
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
</script>
