<template>
<div class="w-full p-10">
    <div class="hero bg-base-200 py-10 rounded-lg ">
      <div class="hero-content text-left ">
        <div class="max-w-md">
        <h1 class="text-5xl font-bold">About</h1>
        <p class="py-6">This website serves as a repository of learning materials for 3D CGI, animation, and VFX curricula.</p>
      </div>
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

useHead({
  title: 'About',
  // layout: 'breadcrumbs', 
})
</script>