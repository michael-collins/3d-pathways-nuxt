<template>
  <div class="w-full p-10">
    <HeroComponent title="Lectures">
      <template #description>
        <p>This is the description for the lectures page.</p>
      </template>
    </HeroComponent>
    <div class="flex justify-end items-center mb-4">
    <!-- Search Bar with Icon -->
    <SearchBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />    
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />
  </div>
    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="paginatedRecords" :isLoading="isLoading" destination="lectures" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
          <ListItem :records="paginatedRecords" :isLoading="isLoading" destination="lectures" />
        </ListContainer>
      </div>
    </div>
    <PaginationButtonGroup v-if="totalPages > 1" :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="currentPage = $event" />
  </div>  
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
const searchQuery = ref('')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 30

// Watch searchQuery to reset currentPage to 1 when it changes
watch(searchQuery, () => {
  currentPage.value = 1
})

// Computed filtered records based on search query
const filteredRecords = computed(() => {
  if (!searchQuery.value) return lecturesStore.records

  const query = searchQuery.value.toLowerCase()
  return lecturesStore.records.filter(record => {
    return (
      record.fields.name?.toLowerCase().includes(query) ||
      record.fields.description?.toLowerCase().includes(query)
    )
  })
})

// Total number of pages
const totalPages = computed(() => Math.ceil(filteredRecords.value.length / itemsPerPage))

// Computed paginated records for the current page
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredRecords.value.slice(start, start + itemsPerPage)
})


const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
  </script>
  