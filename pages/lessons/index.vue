<template>
  <div>
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="lessonsStore.records" :isLoading="isLoading" destination="lessons" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
          <ListItem :records="lessonsStore.records" :isLoading="isLoading" destination="lessons" />
        </ListContainer>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'breadcrumbs', // Set the layout of the page
})
useHead({
  title: 'Lessons' // Set the title of the page
})
// Loader
const isLoading = ref(true)
// Fetch records from the lessons store
const lessonsStore = useLessonsStore()
onMounted(() => {
  lessonsStore.fetchRecords()
  isLoading.value = false
})
// Toggle view mode
const viewMode = ref('list') // Initialize viewMode as 'grid'
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}

</script>
