<template>
  <div class="w-full p-10">
    <HeroComponent title="Exercises">
      <template #description>
        <p>Practice activities to develop your skills in 3D design and animation.</p>
      </template>
    </HeroComponent>

    <div class="flex justify-end items-center mb-4">
      <SearchBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />    
      <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />
    </div>

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <div v-if="isLoading" class="text-center py-12">
        <LoaderComponent />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="exercise in paginatedExercises" :key="exercise.path" 
                  :to="exercise.path"
                  class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
          <figure v-if="exercise.image">
            <img :src="exercise.image" :alt="exercise.imageAlt || exercise.title" class="w-full h-48 object-cover" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ exercise.title }}</h2>
            <div v-if="exercise.difficulty" class="badge badge-primary">{{ exercise.difficulty }}</div>
            <p v-if="exercise.description" class="line-clamp-3">{{ exercise.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div v-if="isLoading" class="text-center py-12">
        <LoaderComponent />
      </div>
      <ListContainer v-else>
        <NuxtLink v-for="exercise in paginatedExercises" :key="exercise.path"
                  :to="exercise.path"
                  class="block p-4 hover:bg-base-200 rounded-lg transition-all">
          <div class="flex gap-4 items-center">
            <img v-if="exercise.image" :src="exercise.image" :alt="exercise.imageAlt || exercise.title" 
                 class="w-24 h-24 object-cover rounded" />
            <div class="flex-1">
              <h3 class="text-xl font-bold">{{ exercise.title }}</h3>
              <div v-if="exercise.difficulty" class="badge badge-sm badge-primary mt-1">{{ exercise.difficulty }}</div>
              <p v-if="exercise.description" class="mt-2 line-clamp-2">{{ exercise.description }}</p>
            </div>
          </div>
        </NuxtLink>
      </ListContainer>
    </div>

    <PaginationButtonGroup v-if="totalPages > 1" 
                          :currentPage="currentPage" 
                          :totalPages="totalPages" 
                          @update:currentPage="currentPage = $event" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumbs',
})

useHead({
  title: 'Exercises'
})

const isLoading = ref(true)
const exercises = ref([])
const viewMode = ref('list')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 30

// Fetch exercises from Nuxt Content
try {
  const { data } = await useAsyncData('exercises', () => 
    queryCollection('exercises')
      .where('published', '=', true)
      .order('title', 'ASC')
      .all()
  )
  
  exercises.value = data.value || []
  console.log('Loaded exercises:', exercises.value.length, exercises.value[0])
} catch (error) {
  console.error('Error loading exercises:', error)
  exercises.value = []
} finally {
  isLoading.value = false
}

// Watch searchQuery to reset currentPage
watch(searchQuery, () => {
  currentPage.value = 1
})

// Computed filtered exercises
const filteredExercises = computed(() => {
  if (!searchQuery.value) return exercises.value

  const query = searchQuery.value.toLowerCase()
  return exercises.value.filter(exercise => {
    return (
      exercise.title?.toLowerCase().includes(query) ||
      exercise.description?.toLowerCase().includes(query) ||
      exercise.difficulty?.toLowerCase().includes(query)
    )
  })
})

// Total pages
const totalPages = computed(() => Math.ceil(filteredExercises.value.length / itemsPerPage))

// Paginated exercises
const paginatedExercises = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredExercises.value.slice(start, start + itemsPerPage)
})

const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
}
</script>
