<template>
    <NavBar />
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-left">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Pathways</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
      </div>
    </div>
    <LinkedCardComponent :records="pathwaysStore.records" destination="pathway" />
    <pre class="mockup-code m-8">{{ pathwaysStore.records }}</pre>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
//   import { useRuntimeConfig } from '#app';
  import { usePathwaysStore } from '@/stores/pathwaysStore'; // Import the dedicated store for pathways
  import LinkedCardComponent from '@/components/LinkedCardComponent.vue';
  import NavBar from '@/components/NavBar';
  
  const pathwaysStore = usePathwaysStore(); // Use the dedicated pathways store
  
  onMounted(() => {
    pathwaysStore.fetchRecords(); // Call the fetchRecords action specific to pathways
  });
  </script>
  