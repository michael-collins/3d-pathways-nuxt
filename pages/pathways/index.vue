<template>
  <div class="">
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-left ">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Pathways</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
      </div>
    </div>
    <!-- <pre class="mockup-code m-8">{{ pathwaysStore.records }}</pre> -->
  </div>
  <div>
    <!-- Add a button to toggle the view mode -->
    <!-- <button @click="toggleViewMode">{{ viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View' }}</button> -->
    <!-- <GridListToggle :mode="viewMode"/> -->
    <GridListToggle @viewModeChanged="updateViewMode" />

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="pathwaysStore.records" :isLoading="isLoading" destination="pathways" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div v-for="record in pathwaysStore.records" :key="record.id">
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
// Toogle view mode
const viewMode = ref('grid') // Initialize viewMode as 'grid'
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
</script>
