<template>
  <div class="w-full p-10">
    <HeroComponent title="Pathways">
      <template #description>
        <p>Work in progress.</p>
      </template>
    </HeroComponent>
    <!-- <pre class="mockup-code m-8">{{ pathwaysStore.records }}</pre> -->

  
<div class="flex justify-end items-center mb-4">
    <!-- Search Bar with Icon -->
    <SearchBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />    
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />
  </div>

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="paginatedRecords" :isLoading="isLoading" destination="pathways" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
         <ListItem :records="paginatedRecords" :isLoading="isLoading" destination="pathways" />
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
  title: 'Pathways'
})
const pathwaysStore = usePathwaysStore(); // Use the dedicated pathways store
await pathwaysStore.fetchRecords(); // Call the fetchRecords action specific to pathways

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
  if (!searchQuery.value) return pathwaysStore.records

  const query = searchQuery.value.toLowerCase()
  return pathwaysStore.records.filter(record => {
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
