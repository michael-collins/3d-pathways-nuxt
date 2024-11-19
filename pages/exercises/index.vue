<template>
<div class="w-full p-10">
  
  <HeroComponent title="Exercises">
      <template #description>
        <p>This is the description for the exercises page.</p>
      </template>
    </HeroComponent>
    <!-- Search and View Toggle Container -->
  <div class="flex justify-end items-center mb-4">
    <!-- Search Bar with Icon -->
    <div class="form-control w-full max-w-lg relative">
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon name="material-symbols:filter-alt" class="text-gray-400 text-xl" />
        </span>
        <input
          type="text"
          placeholder="Search exercises..."
         class="input input-bordered input-sm w-full max-w-xs pl-10"
          v-model="searchQuery"
        />
      </div>
    </div>

    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />
  </div>

  <!-- Grid View -->
  <GridContainer v-if="viewMode === 'grid'">
    <LinkedCardComponent :records="filteredRecords" :isLoading="isLoading" destination="exercises" />
  </GridContainer>

  <!-- List View -->
  <div v-else>
    <div >
      <ListContainer>
        <ListItem :records="filteredRecords" :isLoading="isLoading" destination="exercises" />
      </ListContainer>
    </div>
  </div>
  <!-- <pre class="mockup-code m-8">{{ exercisesStore.records }}</pre> -->
</div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumbs',
})
useHead({
  title: 'Exercises'
})
const exercisesStore = useExercisesStore(); // Use the dedicated exercises store
await exercisesStore.fetchRecords(); // Call the fetchRecords action specific to pathways

// Toggle view mode
const viewMode = ref('list') // Initialize viewMode as 'grid'
const searchQuery = ref('')

// Computed filtered records
const filteredRecords = computed(() => {
  if (!searchQuery.value) return exercisesStore.records
  
  const query = searchQuery.value.toLowerCase()
  return exercisesStore.records.filter(record => {
    return record.fields.name?.toLowerCase().includes(query) || 
           record.fields.description?.toLowerCase().includes(query)
  })
})
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
</script>

