<template>
  <div>
    <div class="container mx-auto px-4 py-6"> {{ exerciseId }}

    </div>
  </div>
</template>

<script setup>

const route = useRoute();
const exerciseId = route.params.id;
</script>
