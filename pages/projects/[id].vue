<template>
  <article class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
    <div v-if="pending" class="text-center py-12">
      <LoaderComponent />
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>Error loading project: {{ error.message }}</span>
    </div>

    <div v-else-if="project">
      <!-- Header Image and Title -->
      <NuxtImg v-if="project.image" 
        height="360"
        width="720"
        placeholder
        :src="project.image" 
        class="w-full h-auto rounded-lg" 
        :alt="project.imageAlt || project.title"
      />
      
      <h1 class="text-5xl font-bold mt-8 mb-4">{{ project.title }}</h1>
      
      <div class="space-y-10 divide-y-4 divide-neutral">
        <!-- Difficulty -->
        <div v-if="project.difficulty" class="pb-8">
          <ul class="space-x-2">
            <li class="badge badge-outline text-xs uppercase">
              {{ project.difficulty }}
            </li>
          </ul>
        </div>
        <div v-else class="pb-8"></div>

        <!-- Tags -->
        <div v-if="project.tags" class="pb-8">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase">Tags:</h2>
          <ul class="space-x-2">
            <li v-for="tag in project.tags" :key="tag" class="badge bg-base-300 text-xs uppercase">
              {{ tag }}
            </li>
          </ul>
        </div>

        <!-- OER Schema JSON-LD -->
        <OerSchema v-if="project.oer" :schema="project.oer" />

        <!-- Main Content - Markdown body -->
        <div class="prose prose-lg max-w-none">
          <ContentRenderer :value="project" />
        </div>

        <!-- YouTube Playlist -->
        <div v-if="project.youtubePlaylistID" class="flex flex-col justify-items-stretch">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase">Tutorials:</h2>
          <div class="text-md p-3">
            <iframe width="100%" height="" class="aspect-video" 
              :src="'https://www.youtube.com/embed/videoseries?si=qS1_gP2XR65V9BbI&amp;list=' + project.youtubePlaylistID"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
          </div>
          <a class="justify-self-auto mx-auto btn btn-ghost text-primary hover:text-secondary"
            aria-label="View on Youtube" 
            :href="'https://youtube.com/playlist?list=' + project.youtubePlaylistID" target="_blank">
            View playlist on Youtube.com
            <Icon name="octicon:link-external-16" class="text-sm" />
          </a>
        </div>

        <!-- Vimeo Playlist -->
        <div v-if="project.vimeoPlaylistID">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase">Tutorials:</h2>
          <div class="text-md p-3">
            <div style='padding:56.25% 0 0 0;position:relative;'>
              <iframe :src="'https://vimeo.com/showcase/' + project.vimeoPlaylistID + '/embed'" 
                class="aspect-video"
                allowfullscreen frameborder='0' 
                style='position:absolute;top:0;left:0;width:100%;height:100%;'>
              </iframe>
            </div>
            <a class="mx-auto btn btn-ghost text-secondary hover:text-secondary"
              :href="'https://vimeo.com/showcase/' + project.vimeoPlaylistID" target="_blank">
              Vimeo.com playlist
              <Icon name="octicon:link-external-16" class="text-sm" />
            </a>
          </div>
        </div>

        <!-- Downloads/Files -->
        <div v-if="projectFiles.length > 0" class="pt-8">
          <h2 class="text-2xl font-semibold mb-4 text-left uppercase">Downloads:</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="file in projectFiles" :key="file.id" class="card bg-base-200 shadow-md overflow-hidden">
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
      </div>

      <!-- Canvas LMS Embed Generator -->
      <IframeConfigGenerator :url="`${$config.public.siteUrl}${project.path}`" :title="project.title" />
    </div>

    <div v-else class="alert alert-warning">
      <span>Project not found</span>
    </div>
  </article>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'breadcrumbs',
})

const route = useRoute()
const config = useRuntimeConfig()

// Fetch the project content
const { data: project, pending, error } = await useAsyncData(
  `project-${route.params.id}`,
  () => queryCollection('projects').where('path', '=', `/projects/${route.params.id}`).first()
)

// Load files data from files.json using the project's record ID
const projectFiles = ref([])

onMounted(async () => {
  // Extract filename from stem (remove folder path)
  const stem = project.value?.stem || ''
  const slug = project.value?.slug || stem.split('/').pop()
  
  if (slug) {
    try {
      const filesData = await $fetch('/data/files-by-slug.json')
      projectFiles.value = filesData[slug] || []
    } catch (error) {
      console.error('Error loading files:', error)
    }
  }
})

// Set page meta
useHead({
  title: () => project.value?.title || 'Project',
  meta: [
    { name: 'description', content: () => project.value?.description || '' }
  ]
})
</script>

