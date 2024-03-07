<template>
    <div>
      <div class="container mx-auto px-4 py-6"> {{ pathwaysId }}
  
      </div>
    </div>
  </template>
  
  <script setup>

const route = useRoute();
const pathwaysId = route.params.id;
  </script>
  