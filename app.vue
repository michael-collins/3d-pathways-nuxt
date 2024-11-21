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
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}
.page-enter-from{
  opacity: 0;
  filter: blur(0.15rem);
  transform: translate(0, 10px);
}
.page-leave-to {
  opacity: 0;
  filter: blur(0.15rem);
  transform: translate(0, -10px);
}
</style>