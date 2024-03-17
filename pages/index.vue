<template>
  <div class="hero bg-base-200 py-10">
    <div class="hero-content text-left">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">About</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const breadcrumbs = ref({
  show: false, // Set this to false to hide the BreadcrumbsComponent on this page
  showBackButton: false, // Set this to false to hide the back button on this page
  // Add more properties as needed
});
provide('breadcrumbs', breadcrumbs);

// definePageMeta({
//   layout: 'breadcrumbs'
// })
</script>