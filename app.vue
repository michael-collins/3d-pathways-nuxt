<script setup>
useHead( {
  titleTemplate: ( titleChunk ) => {
    return titleChunk ? `${ titleChunk }` : 'Learning Pathways'
  }
} )
</script>

<template>
    <NuxtLoadingIndicator aria-label="Loading..." />
    <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
