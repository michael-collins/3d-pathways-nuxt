<template>
<div class="w-full p-10">
  
  <HeroComponent title="Projects">
      <template #description>
        <p>Multi-week assignments for critical issues, and creative themes, and visual storytelling explored through CGI.</p>
      </template>
    </HeroComponent>
    <div class="flex justify-end items-center mb-4">
    <!-- Search Bar with Icon -->
    <SearchBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />    
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />
  </div>

  <!-- Grid View -->
  <GridContainer v-if="viewMode === 'grid'">
    <LinkedCardComponent :records="paginatedRecords"  destination="projects" />
  </GridContainer>

  <!-- List View -->
  <div v-else>
    <div >
      <ListContainer>
        <ListItem :records="paginatedRecords"  destination="projects" />
      </ListContainer>
    </div>
  </div>
  <PaginationButtonGroup v-if="totalPages > 1" :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="currentPage = $event" />

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
await projectsStore.fetchRecords(); // Call the fetchRecords action specific to pathways


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
  if (!searchQuery.value) return projectsStore.records

  const query = searchQuery.value.toLowerCase()
  return projectsStore.records.filter(record => {
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

// Toggle view mode
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  // console.log('View mode changed:', viewMode.value) // Log the new view mode
}
</script>
