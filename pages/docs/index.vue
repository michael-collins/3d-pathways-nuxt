<!-- pages/docs/index.vue -->
<template>
  <div class="w-full p-10">
    <h1 class="text-3xl font-bold mb-6">Documentation</h1>
    <div v-if="pending">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Error loading documentation list.</p>
    </div>
    <div v-else-if="docs && docs.length">
      <ul class="space-y-4">
        <li v-for="doc in docs" :key="doc._path" class="border-b pb-2">
          <NuxtLink :to="`/docs/${doc.slug}`" class="text-lg font-semibold text-blue-600 hover:text-blue-800">
            {{ doc.title }}
          </NuxtLink>
          <p v-if="doc.description" class="text-gray-600 mt-1">{{ doc.description }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No documentation found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: docs, pending, error } = await useAsyncData('docs-list', () =>
  queryContent('docs').only(['title', 'slug', 'description', '_path']).find()
)

useHead({
  title: 'Documentation',
  meta: [
    { name: 'description', content: 'Browse all available documentation.' },
  ],
})
</script>
  
  <style scoped>
  /* Add your styles here */
  </style>