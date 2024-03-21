
  <template>
    <div class="">
      <div class="hero bg-base-200 py-10">
        <div class="hero-content text-left ">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Lectures</h1>
            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
        </div>
      </div>
      <GridListToggle :viewMode="viewMode" @viewModeChanged="updateViewMode" />

    <!-- Grid View -->
    <GridContainer v-if="viewMode === 'grid'">
      <LinkedCardComponent :records="lecturesStore.records" :isLoading="isLoading" destination="lectures" />
    </GridContainer>
    
    <!-- List View -->
    <div v-else>
      <div >
        <ListContainer>
          <ListItem :records="lecturesStore.records" :isLoading="isLoading" destination="lectures" />
        </ListContainer>
      </div>
    </div>
  </div>
      <!-- <pre class="mockup-code m-8">{{ pathwaysStore.records }}</pre> -->
  
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'breadcrumbs',
  })
  useHead({
    title: 'Lectures'
  })
  const lecturesStore = useLecturesStore(); // Use the dedicated lectures store
  const isLoading = ref(true); // Initialize isLoading as true
  
  
  onMounted(() => {
    lecturesStore.fetchRecords(); // Call the fetchRecords action specific to lectures
    isLoading.value = false; // Set isLoading to false when the records have been fetched
  
  });
  // Toggle view mode
const viewMode = ref('grid') // Initialize viewMode as 'grid'
const updateViewMode = (newViewMode) => {
  viewMode.value = newViewMode
  console.log('View mode changed:', viewMode.value) // Log the new view mode
}
  </script>
  