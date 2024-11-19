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
    <LinkedCardComponent :records="paginatedRecords" :isLoading="isLoading" destination="exercises" />
  </GridContainer>

  <!-- List View -->
  <div v-else>
    <div >
      <ListContainer>
        <ListItem :records="paginatedRecords" :isLoading="isLoading" destination="exercises" />
      </ListContainer>
    </div>
  </div>

    <PaginationButtonGroup
    :currentPage="currentPage"
    :totalPages="totalPages"
    @update:currentPage="currentPage = $event"
  />
</div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumbs',
})
useHead({
  title: 'Exercises'
})
// Initialize the store and fetch records
const exercisesStore = useExercisesStore()
await exercisesStore.fetchRecords()

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
  if (!searchQuery.value) return exercisesStore.records

  const query = searchQuery.value.toLowerCase()
  return exercisesStore.records.filter(record => {
    return (
      record.fields.name?.toLowerCase().includes(query) ||
      record.fields.description?.toLowerCase().includes(query)
    )
  })
})

// Total number of pages
const totalPages = computed(() => Math.ceil(filteredRecords.value.length / itemsPerPage))

// Generate a range of page numbers for pagination buttons (e.g., currentPage ±2)
const paginationRange = computed(() => {
  const range = []
  const delta = 2
  const start = Math.max(1, currentPage.value - delta)
  const end = Math.min(totalPages.value, currentPage.value + delta)

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})

// Computed paginated records for the current page
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredRecords.value.slice(start, start + itemsPerPage)
})

// Pagination control methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Optional: Scroll to top on page change
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Update view mode method
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value)
}
</script>

<style scoped>
/* Optional: Customize pagination button styles if needed */
</style>

