<!-- pages/docs/[slug].vue -->
<template>
  <div class="w-full p-10">
    <div v-if="page">
      <ContentRenderer :value="page" />
    </div>
    <div v-else-if="error">
      <p>Error loading page.</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
  
  <script setup lang="ts">

  
  const route = useRoute()
  const slug = route.params.slug as string
  
  const { data: page, error } = await useAsyncData(`docs-${slug}`, () =>
    queryContent('docs').where({ slug }).findOne()
  )
  
  useHead({
    title: page.value?.title || 'Default Title',
    meta: [
      { name: 'description', content: page.value?.description || 'Default Description' },
    ],
  })
  
  if (error.value || !page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>