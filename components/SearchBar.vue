<template>
    <div class="form-control w-full max-w-lg relative">
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon name="material-symbols:filter-alt" class="text-gray-400 text-xl" />
        </span>
        <input
          type="text"
          placeholder="Search exercises..."
          class="input input-bordered input-sm w-full max-w-xs pl-10"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    searchQuery: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  /* Optional: Customize search bar styles if needed */
  </style>