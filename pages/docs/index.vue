<!-- pages/docs/index.vue -->
<template>
  <div class="w-full p-10">
    <div class="prose max-w-none">
      <h1 class="text-3xl font-bold mb-6">Documentation Overview</h1>
      <p class="text-lg text-base-content/70 mb-8">
        Welcome to the documentation section. Use the sidebar navigation to browse through different topics and guides.
      </p>
    </div>
    
    <div v-if="pending" class="space-y-4">
      <div class="skeleton h-8 w-full"></div>
      <div class="skeleton h-8 w-full"></div>
      <div class="skeleton h-8 w-full"></div>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      <p>Error loading documentation: {{ error }}</p>
    </div>
    
    <div v-else-if="docs" class="space-y-6">
      <h2 class="text-2xl font-semibold mb-4">Available Documentation</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div 
          v-for="doc in docs" 
          :key="doc._path"
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div class="card-body">
            <h3 class="card-title">{{ doc.title }}</h3>
            <p class="text-base-content/70">{{ doc.description }}</p>
            <div class="card-actions justify-end">
              <NuxtLink 
                :to="`/docs/${doc.slug}`"
                class="btn btn-primary btn-sm"
              >
                Read Documentation →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Start Section -->
      <div class="mt-8 p-6 bg-base-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-3">Quick Start</h2>
        <p class="text-base-content/70 mb-4">
          New to the platform? Start with these essential guides:
        </p>
        <div class="flex flex-wrap gap-2">
          <NuxtLink 
            v-for="doc in docs.slice(0, 3)" 
            :key="doc._path"
            :to="`/docs/${doc.slug}`"
            class="badge badge-primary badge-lg hover:badge-primary-focus transition-colors"
          >
            {{ doc.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Use the docs layout
definePageMeta({
  layout: 'docs'
})

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