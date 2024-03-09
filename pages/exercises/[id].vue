<template>
  <div>
    <NavBar />

    <div v-if="record" class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
      <!-- Displaying the Name and Image -->
      <img v-if="record.fields.image" :src="record.fields.image[0].url" class="w-full h-auto" />
      <h1 v-if="record.fields.name" class="text-5xl font-bold mt-8 mb-4">{{ record.fields.name }}</h1>

      <div v-if="record && record.fields" :key="record.id" class="space-y-10 divide-y-4 divide-neutral">

        <!-- Displaying the Difficulty -->
        <div v-if="record.fields.difficulty" class="pb-8">
          <!-- Displaying the difficulty levels -->
          <ul class="space-x-2">
            <li v-for="level in record.fields.difficulty" :key="level" class="badge badge-outline text-xs uppercase">
              {{ level }}
            </li>

          </ul>
        </div>
        <div v-else class="pb-8"></div>

        <!-- Displaying the Description -->
        <div v-if="record.fields.description">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Description:</h2>
          <MDC :value="record.fields.description" class="markdown mx-2 
    child-list-ol:mx-6 
    child-list-ol:list-decimal 
    child-list-ul:mx-6 
    child-list-ul:list-disc 
    child-list-ol-li:pt-1 
    child-list-ul-li:pt-1 
    child-list-ol-li-ul:list-[circle] 
    child-list-ol-li-ul:px-4 
    child-list-ol-li-ul:py-1 
    child-list-ul-li-ul:list-[circle] 
    child-list-ul-li-ul:px-4 
    child-list-ul-li-ul:py-1 
    child-list-ol-li-ul-li:pt-1 
    child-list-ul-li-ul-li:pt-1" />
        </div>

        <!-- Displaying the Learning Objectives -->
        <div v-if="record.fields.learningObjectives">
          <h2 class="text-2xl font-semibold text-left uppercase mb-4">Learning Objectives:</h2>
          <MDC :value="record.fields.learningObjectives" class="markdown mx-2 
    child-list-ol:mx-6 
    child-list-ol:list-decimal 
    child-list-ul:mx-6 
    child-list-ul:list-disc 
    child-list-ol-li:pt-1 
    child-list-ul-li:pt-1 
    child-list-ol-li-ul:list-[circle] 
    child-list-ol-li-ul:px-4 
    child-list-ol-li-ul:py-1 
    child-list-ul-li-ul:list-[circle] 
    child-list-ul-li-ul:px-4 
    child-list-ul-li-ul:py-1 
    child-list-ol-li-ul-li:pt-1 
    child-list-ul-li-ul-li:pt-1" />


        </div>

        <!-- Displaying the Instructions -->
        <div v-if="record.fields.instructions">
          <h2 class="text-2xl font-semibold text-left uppercase mb-4">Instructions:</h2>
          <MDC :value="record.fields.instructions" class="markdown mx-2 
    child-list-ol:mx-6 
    child-list-ol:list-decimal 
    child-list-ul:mx-6 
    child-list-ul:list-disc 
    child-list-ol-li:pt-1 
    child-list-ul-li:pt-1 
    child-list-ol-li-ul:list-[circle] 
    child-list-ol-li-ul:px-4 
    child-list-ol-li-ul:py-1 
    child-list-ul-li-ul:list-[circle] 
    child-list-ul-li-ul:px-4 
    child-list-ul-li-ul:py-1 
    child-list-ol-li-ul-li:pt-1 
    child-list-ul-li-ul-li:pt-1" />
        </div>

        <!-- Displaying the YouTube Playlist -->
        <div v-if="record.fields.youtubePlaylist">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Tutorials:</h2>
          <p v-if="record.fields.youtubePlaylist" class="text-md p-3">
            <a :href="record.fields.youtubePlaylist" target="_blank">{{ record.fields.youtubePlaylist }}</a>
          </p>
        </div>
        <!-- Displaying the associatedMaterial -->
        <div v-if="record.fields.associatedMaterial">
          <h2 class="text-2xl font-semibold text-left uppercase mb-4">Associated Material:</h2>
          <!-- <MarkdownRenderer :source="record.fields.associatedMaterial" /> -->
          {{ record.fields.associatedMaterial }}

        </div>
        <!-- Displaying the Downloads -->
        <div v-if="record.fields.downloads">
          <p class="text-md p-3">
          <ul>
            <li v-for="download in record.fields.downloads" :key="download.id">
              <a :href="download.url">{{ download.name }}</a>
            </li>
          </ul>
          </p>
        </div>
        <!-- iframe -->
        <div class="mockup-code">
          <pre
            class="language-html"><code>&lt;iframe src="{{ currentUrl }}" style="border:none;" title="{{ record.fields && record.fields.name ? record.fields.name : 'Exercise' }}"&gt;&lt;/iframe&gt;</code></pre>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const exercisesStore = useExercisesStore();
const exerciseId = ref(route.params.id);
const record = ref(null);

// This computed property will reactively update if the route changes.
const currentUrl = computed(() => {
  // Construct the full URL using the route object
  // If you're running Nuxt in SSR mode, ensure window is defined before accessing it.
  if (typeof window !== 'undefined') {
    return window.location.origin + route.fullPath;
  }
  return '';
});
onMounted(async () => {
  await exercisesStore.fetchRecords();
  record.value = exercisesStore.getExerciseById(exerciseId.value);
});
// console.log('url: ',currentUrl.value);
</script>
