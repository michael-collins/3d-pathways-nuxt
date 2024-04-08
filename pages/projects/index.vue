<template>
<div class="w-full p-10">
  
  <HeroComponent title="Projects">
      <template #description>
        <p>This is the description for the projects page.</p>
      </template>
    </HeroComponent>
  <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />

  <!-- Grid View -->
  <GridContainer v-if="viewMode === 'grid'">
    <LinkedCardComponent :records="projectsStore.records" :isLoading="isLoading" destination="projects" />
  </GridContainer>

  <!-- List View -->
  <div v-else>
    <div >
      <ListContainer>
        <ListItem :records="projectsStore.records" :isLoading="isLoading" destination="projects" />
      </ListContainer>
    </div>
  </div>
  <!-- <pre class="mockup-code m-8">{{ projectsStore.records }}</pre> -->
</div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumbs',
})
useHead({
  title: 'Projects'
})
const projectsStore = useProjectsStore(); // Use the dedicated projects store
const isLoading = ref(true); // Initialize isLoading as true

onMounted(() => {
  projectsStore.fetchRecords(); // Call the fetchRecords action specific to pathways
  isLoading.value = false; // Set isLoading to false when the records have been fetched

});
// Toggle view mode
const viewMode = ref('list') // Initialize viewMode as 'grid'
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
</script>
