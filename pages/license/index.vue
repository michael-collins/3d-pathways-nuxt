<template>
    <div class="w-full p-10">
        <HeroComponent title="License">
      <template #description>
        <p>Usage information.</p>
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
      title: 'License',
      // layout: 'breadcrumbs', 
    })
    </script>