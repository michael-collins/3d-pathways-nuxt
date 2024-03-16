<!-- gridContainer.vue -->
<template>
    <!-- Card Section -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Grid -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 ">
        <!-- Slot for inserting content -->
        <slot />
      </div>
      <!-- End Grid -->
    </div>
    <!-- End Card Section -->
  </template>
  
  <script>
  export default {
    name: 'gridContainer',
  };
  </script>