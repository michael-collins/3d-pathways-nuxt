<!-- pages/docs/[slug].vue -->
<template>
  <div class="w-full p-10">
    <div v-if="page" class="prose max-w-none">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ page.title }}</h1>
        <p v-if="page.description" class="text-lg text-base-content/70">{{ page.description }}</p>
      </div>
      
      <!-- Content -->
      <ContentRenderer :value="page" class="prose-lg" />
      
      <!-- Navigation Footer -->
      <div class="mt-12 pt-8 border-t border-base-300">
        <div class="flex justify-between items-center">
          <NuxtLink 
            to="/docs" 
            class="btn btn-outline btn-sm"
          >
            ← Back to Documentation
          </NuxtLink>
          
          <div class="text-sm text-base-content/50">
            Last updated: {{ new Date().toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      <p>Error loading page: {{ error.message || 'Unknown error' }}</p>
    </div>
    
    <div v-else class="space-y-4">
      <div class="skeleton h-8 w-3/4"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-2/3"></div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
// Use the docs layout
definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const slug = route.params.slug as string

const { data: page, error } = await useAsyncData(`docs-${slug}`, () =>
  queryContent('docs').where({ slug }).findOne()
)

useHead({
  title: page.value?.title || 'Documentation',
  meta: [
    { name: 'description', content: page.value?.description || 'Documentation page' },
  ],
})

if (error.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>
  
  <style scoped>
  /* Add your styles here */
  </style>