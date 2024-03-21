<!-- gridContainer.vue -->
<template>
    <!-- Card Section -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Grid -->
      <div :class="isLoading ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 gap-6'">
        <!-- Slot for inserting content -->
        <slot />
      </div>
      <!-- End Grid -->
    </div>
    <!-- End Card Section -->
  </template>
  
  <script>
  export default {
    name: 'listContainer',
    props: ['isLoading'],
  };
  </script>