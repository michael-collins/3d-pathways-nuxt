<template>
  <article ref="articleElement">
    <div v-if="record" class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
      <!-- Displaying the Name and Image -->
      <img v-if="record.fields.image" :src="record.fields.image[0].url" class="w-full h-auto rounded-lg" />
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
        <div v-else class="pb-8"><!-- I'm here to handle the divide style utility--></div>

        <!-- Displaying the Description -->
        <div v-if="record.fields.description">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Description:</h2>
          <MDC :value="record.fields.description" class="markdown mx-2 
    child-a:font-medium 
    child-a:link 
    child-a:text-secondary 
    hover:child-a:text-base-content 
    child-list-ol:list-decimal 
    child-list-ol-li-marker:font-medium 
    child-list-ol-li-marker:text-info 
    child-list-ol:mx-6 
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
          child-a:font-medium 
    child-a:link 
    child-a:text-secondary 
    hover:child-a:text-base-content 
    child-list-ol:list-decimal 
    child-list-ol-li-marker:font-medium 
    child-list-ol-li-marker:text-info 
    child-list-ol:mx-6 
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
    child-a:font-medium 
    child-a:link 
    child-a:text-secondary 
    hover:child-a:text-base-content 
    child-list-ol:list-decimal 
    child-list-ol-li-marker:font-medium 
    child-list-ol-li-marker:text-info 
    child-list-ol:mx-6 
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
        <div v-if="record.fields.youtubePlaylistID">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Tutorials:</h2>
          <p v-if="record.fields.youtubePlaylistID" class="text-md p-3">
            <iframe 
            width="100%" 
            height="" 
            class="aspect-video" 
            :src="'https://www.youtube.com/embed/videoseries?si=qS1_gP2XR65V9BbI&amp;list=' + record.fields.youtubePlaylistID" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>          </p>
          <a class="mx-auto btn btn-ghost text-secondary hover:text-secondary:":href="'https://youtube.com/playlist?list=' + record.fields.youtubePlaylistID" target="_blank">Youtube.com playlist <Icon name="octicon:link-external-16" class=" text-sm" /></a>
        </div>
        <!-- Displaying the Vimeo Playlist -->
        <div v-if="record.fields.vimeoPlaylistID">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Tutorials:</h2>
          <p v-if="record.fields.vimeoPlaylistID" class="text-md p-3">
           
          <div style='padding:56.25% 0 0 0;position:relative;'>
            <iframe 
            :src="'https://vimeo.com/showcase/' + record.fields.vimeoPlaylistID + '/embed'" 
            class="aspect-video" 
            allowfullscreen frameborder='0' 
            style='position:absolute;top:0;
            left:0;width:100%;
            height:100%;'>
            </iframe></div>
          <a class="mx-auto  btn btn-ghost text-secondary hover:text-secondary:":href="'https://vimeo.com/showcase/' + record.fields.vimeoPlaylistID" target="_blank">Vimeo.com playlist <Icon name="octicon:link-external-16" class=" text-sm" /></a>
          </p>
        </div>
        <!-- Displaying the associatedMaterial -->
        <div v-if="record.fields.associatedMaterial">
          <h2 class="text-2xl font-semibold text-left uppercase mb-4">Associated Material:</h2>
          <MDC :value="record.fields.associatedMaterial" class="p-3 markdown mx-2 
    child-a:font-medium 
    child-a:link 
    child-a:text-secondary 
    hover:child-a:text-base-content 
    child-list-ol:list-decimal 
    child-list-ol-li-marker:font-medium 
    child-list-ol-li-marker:text-info 
    child-list-ol:mx-6 
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
        <TableComponent :rubricData="rubric" :criteriaData="criteria" title="Rubric" />
      </div>
      <!-- iframe -->
      <IframeComponent :articleHeight="articleHeight" :currentUrl="currentUrl" :record="record" />
      <LicenseComponent :work="record.fields.name" :currentUrl="currentUrl" :license="license" :author="record.fields.author" :authorURL="record.fields.authorURL" title="License" />
    </div>
  </article>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumbs',
})


const route = useRoute();
const projectId = ref(route.params.id);

const projectsStore = useProjectsStore();
const criteriaStore = useCriteriaStore();
const rubricsStore = useRubricsStore();
const licensesStore = useLicensesStore();

const record = ref(null);
const criteria = ref(null);
const rubric = ref(null);
const license = ref(null);
const projectAuthor = ref(null);
const projectAuthorURL = ref(null);

// console.log('License:', license.value);
// console.log('Project Author:', projectAuthor.value);
// console.log('Project Author URL:', projectAuthorURL.value);

const articleHeight = ref(0);
const articleElement = ref(null);

const updateHeight = () => {
  if (articleElement.value) {
    const rect = articleElement.value.getBoundingClientRect();
    articleHeight.value = Math.ceil(rect.height) + 1000;
  }
  };

const currentUrl = computed(() => {
  // If you're running Nuxt in SSR mode, ensure window is defined before accessing it.
  if (typeof window !== 'undefined') {
    return window.location.origin + route.fullPath;
  }
  return '';
});
onMounted(async () => {
  await projectsStore.fetchRecords();
  record.value = projectsStore.getProjectById(projectId.value);


  const projectRecord = projectsStore.getProjectById(projectId.value);
  if (projectRecord && projectRecord.fields.rubrics) {
  await rubricsStore.fetchRecords();
  rubric.value = projectRecord.fields.rubrics.map(rubricId => rubricsStore.getRubricById(rubricId));
  console.log('Fetched rubrics:', rubric.value);
}

if (projectRecord && projectRecord.fields.licenses) {
  await licensesStore.fetchRecords();
  license.value = projectRecord.fields.licenses.map(licenseId => licensesStore.getLicenseById(licenseId));
  console.log('Fetched licenses:', license.value);

  if (projectRecord.fields.author) {
    projectAuthor.value = projectRecord.fields.author;
    console.log('Project Author:', projectAuthor.value);
  }

  if (projectRecord.fields.authorURL) {
    projectAuthorURL.value = projectRecord.fields.authorURL;
    console.log('Project Author URL:', projectAuthorURL.value);
  }
}

  const rubricId = projectRecord.fields.rubrics;
  console.log('Rubric ID:', rubricId);

  if (rubric.value && rubric.value.length > 0) {
    await criteriaStore.fetchRecords();
    criteria.value = rubric.value[0].fields.criteria.map(criteriaId => criteriaStore.getCriteriaById(criteriaId));
    console.log('Fetched criteria:', criteria.value);
  }
  // Update the iframe height when the page is rendered
  await nextTick();
  updateHeight();
});

// Update the iframe height when the record changes
watch(record, updateHeight, { immediate: true });

const title = computed(() => {
  if (record.value && record.value.fields) {
    return 'Project: ' + record.value.fields.name
  }
  // Return a default title if record.value or record.value.fields is not defined
  return 'Project'
})

useHead({
  title: title.value,
})
</script>

