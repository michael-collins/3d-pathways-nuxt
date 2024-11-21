<template>
    <div class="w-full p-10">
    <HeroComponent title="About">
      <template #description>
        <p>This website serves as a repository of learning materials for 3D CGI, animation, and VFX curricula.</p>
      </template>
    </HeroComponent>
    <p class="p-10">Developed by <a aria-label="External link to information about Michael Collins." class="link hover:text-primary" href="https://michaelcollins.xyz">Michael.</a> Additional content contributions from <a aria-label="External link to information about Ian Brill." class="link hover:text-primary" href="https://ianbrill.com">Ian</a>.</p>

    </div>
</template>
    
<script setup lang="ts">
    definePageMeta({
    layout: 'breadcrumbs',
  })
    const breadcrumbs = ref({
      show: false, // Set this to false to hide the BreadcrumbsComponent on this page
      showBackButton: false, // Set this to false to hide the back button on this page
      // Add more properties as needed
    });
    provide('breadcrumbs', breadcrumbs);
    
    useHead({
      title: 'About',
      layout: 'breadcrumbs', 
    })
</script>