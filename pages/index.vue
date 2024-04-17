<template>
<div class="w-full p-10">
  <HeroComponent title="Welcome">
      <template #description>
        <p>Getting started.</p>
      </template>
    </HeroComponent>
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
  title: 'Welcome',
  // layout: 'breadcrumbs', 
})
definePageMeta({
  layout: 'breadcrumbs',
})
</script>