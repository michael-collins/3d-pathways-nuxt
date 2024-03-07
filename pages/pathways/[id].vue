<template>
    <div>
      <NavBar />
      <div class="container mx-auto px-4 py-6"> {{ pathwaysId }}
  
      </div>
    </div>
  </template>
  
  <script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const pathwaysId = route.params.id;
  </script>
  