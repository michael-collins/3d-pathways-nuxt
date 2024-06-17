<template>
<div class="w-full p-10">
  
  <HeroComponent title="Exercises">
      <template #description>
        <p>This is the description for the exercises page.</p>
      </template>
    </HeroComponent>
  <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />

  <!-- Grid View -->
  <GridContainer v-if="viewMode === 'grid'">
    <LinkedCardComponent :records="exercisesStore.records" :isLoading="isLoading" destination="exercises" />
  </GridContainer>

  <!-- List View -->
  <div v-else>
    <div >
      <ListContainer>
        <ListItem :records="exercisesStore.records" :isLoading="isLoading" destination="exercises" />
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
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
</script>

