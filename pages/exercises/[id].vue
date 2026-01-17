<template>
  <article class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
    <div v-if="pending" class="text-center py-12">
      <LoaderComponent />
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>Error loading exercise: {{ error.message }}</span>
    </div>

    <div v-else-if="exercise">
      <!-- Header Image -->
      <NuxtImg v-if="exercise.image" 
        height="360"
        width="720"
        placeholder
        :src="exercise.image" 
        class="w-full h-auto rounded-lg" 
        :alt="exercise.imageAlt || exercise.title"
      />
      
      <!-- Title -->
      <h1 class="text-5xl font-bold mt-8 mb-4">{{ exercise.title }}</h1>
      
      <!-- Difficulty Badge -->
      <div v-if="exercise.difficulty" class="mb-6">
        <span class="badge badge-outline text-xs uppercase">
          {{ exercise.difficulty }}
        </span>
      </div>

      <!-- Tags -->
      <div v-if="exercise.meta?.tags && exercise.meta.tags.length > 0" class="mb-8">
        <h2 class="text-2xl font-semibold mb-2 text-left uppercase border-t-4 border-neutral pt-8">Tags</h2>
        <ul class="flex flex-wrap gap-2">
          <li v-for="tag in exercise.meta.tags" :key="tag" class="badge bg-base-300 text-xs uppercase">
            {{ tag }}
          </li>
        </ul>
      </div>

      <!-- Description Header -->
      <h2 class="text-2xl font-semibold mb-2 text-left uppercase border-t-4 border-neutral pt-8 mt-10">Description</h2>

      <!-- Main Content - Markdown body with all sections -->
      <div class="prose prose-lg max-w-none exercise-content
        prose-h1:hidden
        prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-2 prose-h2:uppercase prose-h2:text-left
        prose-h2:border-t-4 prose-h2:border-neutral prose-h2:pt-8 prose-h2:mt-10
        prose-h2:no-underline
        prose-a:font-medium prose-a:text-secondary hover:prose-a:text-base-content
        prose-h2>a:no-underline prose-h2>a:text-current prose-h2>a:font-semibold
        prose-ol:list-decimal prose-ol:mx-6
        prose-ul:list-disc prose-ul:mx-6
        prose-li:pt-1
        prose-p:my-4">
        <ContentRenderer :value="exercise" />
      </div>

      <!-- Downloads/Files Section -->
      <div v-if="exerciseFiles.length > 0" class="mt-10">
        <h2 class="text-2xl font-semibold mb-4 text-left uppercase border-t-4 border-neutral pt-8">Downloads</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="file in exerciseFiles" :key="file.id" class="card bg-base-200 shadow-md overflow-hidden">
            <!-- Image Thumbnail -->
            <figure v-if="file.attachments?.[0]?.type?.startsWith('image/')" class="relative">
              <NuxtImg 
                :src="file.attachments[0].url" 
                :alt="file.alt || file.name"
                class="w-full h-48 object-cover"
                placeholder
              />
            </figure>
            <div class="card-body p-4">
              <h3 class="card-title text-base">{{ file.name }}</h3>
              <p v-if="file.description" class="text-sm opacity-70">{{ file.description }}</p>
              <p v-if="file.citation" class="text-xs opacity-50 italic line-clamp-2">{{ file.citation }}</p>
              
              <div class="card-actions justify-between items-center mt-3">
                <a v-if="file.sourceUrl" :href="file.sourceUrl" target="_blank" 
                  class="link link-primary text-xs flex items-center gap-1">
                  Source
                  <Icon name="octicon:link-external-16" class="text-xs" />
                </a>
                <div class="flex flex-wrap gap-2">
                  <a v-for="(attachment, idx) in file.attachments" :key="idx"
                    :href="attachment.url"
                    :download="attachment.filename"
                    class="btn btn-sm btn-primary gap-1">
                    <Icon name="octicon:download-16" />
                    <span class="hidden sm:inline">{{ (attachment.size / 1024 / 1024).toFixed(1) }} MB</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas LMS Embed Generator -->
      <IframeConfigGenerator :url="`${$config.public.siteUrl}${exercise.path}`" :title="exercise.title" />

      <!-- Rubric Section -->
      <RubricComponent v-if="exercise.rubric && exercise.rubric.trim()" :rubric="exercise.rubric" :title="exercise.title" />

      <!-- License Section -->
      <LicenseComponent v-if="exercise.license && exercise.license.trim()" :license="exercise.license" :title="exercise.title" />
    </div>

    <div v-else class="alert alert-warning">
      <span>Exercise not found</span>
    </div>
  </article>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'breadcrumbs',
})

const route = useRoute()
const config = useRuntimeConfig()

// Fetch the exercise content
const { data: exercise, pending, error } = await useAsyncData(
  `exercise-${route.params.id}`,
  () => queryCollection('exercises').where('path', '=', `/exercises/${route.params.id}`).first()
)

// Load files data from files-by-slug.json
const exerciseFiles = ref([])

onMounted(async () => {
  // Extract filename from stem (remove folder path)
  const stem = exercise.value?.stem || ''
  const slug = exercise.value?.slug || stem.split('/').pop()
  
  if (slug) {
    try {
      const filesData = await $fetch('/data/files-by-slug.json')
      exerciseFiles.value = filesData[slug] || []
    } catch (error) {
      console.error('Error loading files:', error)
    }
  }
})

// Set page meta
useHead({
  title: () => exercise.value?.title || 'Exercise',
  meta: [
    { name: 'description', content: () => exercise.value?.description || '' }
  ]
})
</script>

<style scoped>
/* Remove link styling from heading anchors */
.exercise-content :deep(h2 a) {
  color: inherit;
  text-decoration: none;
  font-weight: inherit;
}

.exercise-content :deep(h2 a:hover) {
  color: inherit;
  text-decoration: none;
}
</style>
