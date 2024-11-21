<template>
  <div class="w-full p-10">
    <HeroComponent title="Lessons">
      <template #description>
        <p>Work in progress.</p>
      </template>
    </HeroComponent>
    <div class="flex justify-end items-center mb-4">
    <!-- Search Bar with Icon -->
    <SearchBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />    
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />
  </div>
    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="paginatedRecords" :isLoading="isLoading" destination="lessons" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
          <ListItem :records="paginatedRecords" :isLoading="isLoading" destination="lessons" />
        </ListContainer>
      </div>
    </div>
    <PaginationButtonGroup v-if="totalPages > 1" :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="currentPage = $event" />

  </div>
</template>

<script setup>

definePageMeta({
  layout: 'breadcrumbs', // Set the layout of the page
})
useHead({
  title: 'Lessons' // Set the title of the page
})
// Fetch records from the lessons store
const lessonsStore = useLessonsStore()
await lessonsStore.fetchRecords()

// State for view mode and search query
const viewMode = ref('list') // 'list' or 'grid'
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
  if (!searchQuery.value) return lessonsStore.records

  const query = searchQuery.value.toLowerCase()
  return lessonsStore.records.filter(record => {
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
