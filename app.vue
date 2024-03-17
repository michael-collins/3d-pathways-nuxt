<script setup>
useHead( {
  titleTemplate: ( titleChunk ) => {
    return titleChunk ? `${ titleChunk } - Pathways` : 'Pathways'
  }
} )
</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
