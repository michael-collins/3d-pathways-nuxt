<template>
    <div>
      <div class="container mx-auto px-4 py-6"> {{ id }}
      </div>
    </div>
  </template>
  
  <script setup>
  const {id} =useRoute().params
  </script>
  