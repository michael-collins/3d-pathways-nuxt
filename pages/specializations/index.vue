<template>
  <div class="w-full p-10">
    <div class="hero bg-base-200 py-10 rounded-lg ">
      <div class="hero-content text-left ">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Specializations</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
      </div>
    </div>
    <!-- <pre class="mockup-code m-8">{{ specializationsStore.records }}</pre> -->
  </div>
  <div>
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
