<template>
  <article class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
    <div v-if="pending" class="text-center py-12">
      <LoaderComponent />
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>Error loading exercise: {{ error.message }}</span>
    </div>

    <div v-else-if="exercise">
      <!-- Header Image and Title -->
      <NuxtImg v-if="exercise.image" 
        height="360"
        width="720"
        placeholder
        :src="exercise.image" 
        class="w-full h-auto rounded-lg" 
        :alt="exercise.imageAlt || exercise.title"
      />
      
      <h1 class="text-5xl font-bold mt-8 mb-4">{{ exercise.title }}</h1>
      
      <div class="space-y-10 divide-y-4 divide-neutral">
        <!-- Difficulty -->
        <div v-if="exercise.difficulty" class="pb-8">
          <ul class="space-x-2">
            <li class="badge badge-outline text-xs uppercase">
              {{ exercise.difficulty }}
            </li>
          </ul>
        </div>
        <div v-else class="pb-8"></div>

        <!-- Tags -->
        <div v-if="exercise.tags" class="pb-8">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase">Tags:</h2>
          <ul class="space-x-2">
            <li v-for="tag in exercise.tags" :key="tag" class="badge bg-base-300 text-xs uppercase">
              {{ tag }}
            </li>
          </ul>
        </div>

        <!-- OER Schema JSON-LD -->
        <OerSchema v-if="exercise.oer" :schema="exercise.oer" />

        <!-- Main Content - Markdown body -->
        <div class="prose prose-lg max-w-none">
          <ContentRenderer :value="exercise" />
        </div>

        <!-- YouTube Playlist -->
        <div v-if="exercise.youtubePlaylistID" class="flex flex-col justify-items-stretch">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase">Tutorials:</h2>
          <div class="text-md p-3">
            <iframe width="100%" height="" class="aspect-video" 
              :src="'https://www.youtube.com/embed/videoseries?si=qS1_gP2XR65V9BbI&amp;list=' + exercise.youtubePlaylistID"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
          </div>
          <a class="justify-self-auto mx-auto btn btn-ghost text-primary hover:text-secondary"
            aria-label="View on Youtube" 
            :href="'https://youtube.com/playlist?list=' + exercise.youtubePlaylistID" target="_blank">
            View playlist on Youtube.com
            <Icon name="octicon:link-external-16" class="text-sm" />
          </a>
        </div>

        <!-- Vimeo Playlist -->
        <div v-if="exercise.vimeoPlaylistID">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase">Tutorials:</h2>
          <div class="text-md p-3">
            <div style='padding:56.25% 0 0 0;position:relative;'>
              <iframe :src="'https://vimeo.com/showcase/' + exercise.vimeoPlaylistID + '/embed'" 
                class="aspect-video"
                allowfullscreen frameborder='0' 
                style='position:absolute;top:0;left:0;width:100%;height:100%;'>
              </iframe>
            </div>
            <a class="mx-auto btn btn-ghost text-secondary hover:text-secondary"
              :href="'https://vimeo.com/showcase/' + exercise.vimeoPlaylistID" target="_blank">
              Vimeo.com playlist
              <Icon name="octicon:link-external-16" class="text-sm" />
            </a>
          </div>
        </div>

        <!-- Downloads/Files -->
        <div class="pt-8">
          <h2 class="text-2xl font-semibold mb-4 text-left uppercase">Downloads:</h2>
          <div v-if="exerciseFiles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div v-else class="text-gray-500">
            No files available yet (loading...)
          </div>
        </div>
      </div>

      <!-- Canvas LMS Embed Generator -->
      <IframeConfigGenerator :url="`${$config.public.siteUrl}${exercise.path}`" :title="exercise.title" />
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

// Load files data from files.json using the exercise's record ID
const exerciseFiles = ref([])

onMounted(async () => {
  console.log('onMounted called')
  console.log('exercise.value.slug:', exercise.value?.slug)
  console.log('exercise.value.stem:', exercise.value?.stem)
  console.log('exercise.value.path:', exercise.value?.path)
  
  // Extract filename from stem (remove folder path)
  const stem = exercise.value?.stem || ''
  const slug = exercise.value?.slug || stem.split('/').pop()
  
  if (slug) {
    try {
      const filesData = await $fetch('/data/files-by-slug.json')
      console.log('Fetched filesData:', Object.keys(filesData).length, 'slugs')
      console.log('Looking for slug:', slug)
      exerciseFiles.value = filesData[slug] || []
      console.log('Loaded files for', slug, ':', exerciseFiles.value)
    } catch (error) {
      console.error('Error loading files:', error)
    }
  } else {
    console.log('No slug or stem found in exercise')
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
