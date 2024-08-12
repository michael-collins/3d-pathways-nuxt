<script setup>
useHead( {
  titleTemplate: ( titleChunk ) => {
    return titleChunk ? `${ titleChunk }` : 'Learning Pathways'
  }
} );
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#000" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
