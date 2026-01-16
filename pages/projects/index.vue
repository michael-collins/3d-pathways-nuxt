<template>
  <div class="w-full p-10">
    <HeroComponent title="Projects">
      <template #description>
        <p>Comprehensive assessment projects to demonstrate your mastery of 3D design and animation.</p>
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
        <NuxtLink v-for="project in paginatedProjects" :key="project.path" 
                  :to="project.path"
                  class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
          <figure v-if="project.image">
            <img :src="project.image" :alt="project.imageAlt || project.title" class="w-full h-48 object-cover" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ project.title }}</h2>
            <div v-if="project.difficulty" class="badge badge-secondary">{{ project.difficulty }}</div>
            <p v-if="project.description" class="line-clamp-3">{{ project.description }}</p>
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
        <NuxtLink v-for="project in paginatedProjects" :key="project.path"
                  :to="project.path"
                  class="block p-4 hover:bg-base-200 rounded-lg transition-all">
          <div class="flex gap-4 items-center">
            <img v-if="project.image" :src="project.image" :alt="project.imageAlt || project.title" 
                 class="w-24 h-24 object-cover rounded" />
            <div class="flex-1">
              <h3 class="text-xl font-bold">{{ project.title }}</h3>
              <div v-if="project.difficulty" class="badge badge-sm badge-secondary mt-1">{{ project.difficulty }}</div>
              <p v-if="project.description" class="mt-2 line-clamp-2">{{ project.description }}</p>
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
  title: 'Projects'
})

const isLoading = ref(true)
const projects = ref([])
const viewMode = ref('list')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 30

// Fetch projects from Nuxt Content
try {
  const { data } = await useAsyncData('projects', () => 
    queryCollection('projects')
      .where('published', '=', true)
      .order('title', 'ASC')
      .all()
  )
  
  projects.value = data.value || []
  console.log('Loaded projects:', projects.value.length, projects.value[0])
} catch (error) {
  console.error('Error loading projects:', error)
  projects.value = []
} finally {
  isLoading.value = false
}

// Watch searchQuery to reset currentPage
watch(searchQuery, () => {
  currentPage.value = 1
})

// Computed filtered projects
const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value

  const query = searchQuery.value.toLowerCase()
  return projects.value.filter(project => {
    return (
      project.title?.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query) ||
      project.difficulty?.toLowerCase().includes(query)
    )
  })
})

// Total pages
const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage))

// Paginated projects
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
}
</script>
