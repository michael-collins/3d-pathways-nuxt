<template>
  <div class="w-full p-10">
    <HeroComponent title="Specializations">
      <template #description>
        <p>This is the description for the specializations page.</p>
      </template>
    </HeroComponent>
    <!-- <pre class="mockup-code m-8">{{ specializationsStore.records }}</pre> -->

    <div class="flex justify-end items-center mb-4">
    <!-- Search Bar with Icon -->
    <SearchBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />    
    <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />
  </div>
    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="paginatedRecords" :isLoading="isLoading" destination="specializations" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
      <ListItem :records="paginatedRecords" :isLoading="isLoading" destination="specializations" />
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
  title: 'Specializations'
})
const specializationsStore = useSpecializationsStore(); // Use the dedicated specializations store
onMounted(async () => {
await specializationsStore.fetchRecords(); // Call the fetchRecords action specific to specializations

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

const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
})
</script>
