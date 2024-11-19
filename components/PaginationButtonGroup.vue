
<template>
  <!-- Pagination Controls -->
  <div class="flex justify-center mt-6">
   <div class="join" role="navigation" aria-label="Pagination Navigation">
        <button
          class="join-item btn btn-md"
          @click="prevPage"
          :disabled="currentPage === 1"
          aria-label="Previous Page"
        >
          ←
        </button>
        <!-- Display up to 5 page buttons for better UX -->
        <button
          v-for="page in paginationRange"
          :key="page"
          class="join-item btn btn-md"
          :class="{ 'btn-primary': currentPage === page }"
          @click="goToPage(page)"
          :aria-current="currentPage === page ? 'page' : false"
        :aria-label="'Page ' + page"
        >
          {{ page }}
        </button>
        <button
          class="join-item btn btn-md "
          @click="nextPage"
          :disabled="currentPage === totalPages"
          aria-label="Next Page"
        >
          →
        </button>
    </div>
    </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['update:currentPage'])
  
  const { currentPage, totalPages } = toRefs(props)
  
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
  
  // Pagination control methods
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      emit('update:currentPage', page)
      window.scrollTo({ top: 0, behavior: 'smooth' }) // Optional: Scroll to top on page change
    }
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      emit('update:currentPage', currentPage.value + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      emit('update:currentPage', currentPage.value - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Customize pagination button styles if needed */
  </style>