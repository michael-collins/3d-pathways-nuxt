<script setup>
useHead( {
  titleTemplate: ( titleChunk ) => {
    return titleChunk ? `${ titleChunk }` : 'Learning Pathways'
  }
} );
</script>

<template>
  <div>
    <NuxtLoadingIndicator v-if="isLoading" aria-label="Loading..." />
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
