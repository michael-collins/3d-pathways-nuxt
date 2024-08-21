<template>
  <article ref="articleElement">
    <div v-if="record" class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
      <!-- Displaying the Name and Image -->
      <img v-if="record.fields.image" 
      :src="record.fields.image[0].url" class="w-full h-auto rounded-lg" 
      :aria-label="`Image for ${record.fields.name ? record.fields.name : 'article content.'}. ${record.fields.imageAlt ? record.fields.imageAlt : 'Image for decoration only.'}`"
      />
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
        <!-- Displaying the Tags -->
        <div v-if="record.fields.tags" class="pb-8">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Software:</h2>

          <!-- Displaying the tags -->
          <ul class="space-x-2">
            <li v-for="tag in record.fields.tags" :key="tag" class="badge bg-base-300 text-xs uppercase">
              {{ tag }}
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
            <iframe width="100%" height="" class="aspect-video"
              :src="'https://www.youtube.com/embed/videoseries?si=qS1_gP2XR65V9BbI&amp;list=' + record.fields.youtubePlaylistID"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
          </p>
          <a class="mx-auto btn btn-ghost text-secondary hover:text-secondary:"
            :href="'https://youtube.com/playlist?list=' + record.fields.youtubePlaylistID" target="_blank">Youtube.com
            playlist
            <Icon name="octicon:link-external-16" class=" text-sm" />
          </a>
        </div>
        <!-- Displaying the Vimeo Playlist -->
        <div v-if="record.fields.vimeoPlaylistID">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Tutorials:</h2>
          <p v-if="record.fields.vimeoPlaylistID" class="text-md p-3">

          <div style='padding:56.25% 0 0 0;position:relative;'>
            <iframe :src="'https://vimeo.com/showcase/' + record.fields.vimeoPlaylistID + '/embed'" class="aspect-video"
              allowfullscreen frameborder='0' style='position:absolute;top:0;
            left:0;width:100%;
            height:100%;'>
            </iframe>
          </div>
          <a class="mx-auto  btn btn-ghost text-secondary hover:text-secondary:"
            :href="'https://vimeo.com/showcase/' + record.fields.vimeoPlaylistID" target="_blank">Vimeo.com playlist
            <Icon name="octicon:link-external-16" class=" text-sm" />
          </a>
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
        <!-- Displaying the Files -->
        <div  v-if="record.fields.files && record.fields.files.length">
          <h2 class="text-2xl font-semibold text-left uppercase mb-4">Downloads:</h2>
          <FileComponent :fileData="files" />
        </div>
        <TableComponent :rubricData="rubric" :criteriaData="criteria" title="Rubric:" />
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
// const exerciseId = ref(route.params.id);
const exerciseSlug = ref(route.params.id);

const exercisesStore = useExercisesStore();
const criteriaStore = useCriteriaStore();
const rubricsStore = useRubricsStore();
const licensesStore = useLicensesStore();
const filesStore = useFilesStore();


const record = ref(null);
const rubric = ref(null);
const criteria = ref(null);
const license = ref(null);
const files = ref(null);
const projectAuthor = ref(null);
const projectAuthorURL = ref(null);

const articleHeight = ref(0);
const articleElement = ref(null);
// const criteriaRecord = ref(null);


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

  await exercisesStore.fetchRecords();
  exerciseSlug.value = route.params.id;
  console.log('exerciseSlug.value:', exerciseSlug.value); // Debugging line
  record.value = exercisesStore.getExerciseBySlug(exerciseSlug.value);
  console.log('record.value:', record.value); // Debugging line

  const exerciseRecord =  record.value;

  // get the rubric
  if (exerciseRecord && exerciseRecord.fields.rubrics) {
    await rubricsStore.fetchRecords();
    rubric.value = exerciseRecord.fields.rubrics.map(rubricId => rubricsStore.getRubricById(rubricId));
    console.log('Fetched rubrics:', rubric.value);

  }

  // Get rubric criteria
  if (rubric.value && rubric.value.length > 0) {
    await criteriaStore.fetchRecords();
    criteria.value = rubric.value[0].fields.criteria.map(criteriaId => criteriaStore.getCriteriaById(criteriaId));
    console.log('Fetched criteria:', criteria.value);
  }

  // get the files
  if (exerciseRecord && exerciseRecord.fields.files) {
    await filesStore.fetchRecords();
    // Map the file IDs to the corresponding file records
    files.value = exerciseRecord.fields.files.map(fileId => {
      return filesStore.getFileById(fileId);
    }).filter(file => file !== null && file !== undefined);
    console.log('Fetched files:', files.value);

  }
  // get the license and author
  if (exerciseRecord && exerciseRecord.fields.licenses) {
    await licensesStore.fetchRecords();
    license.value = exerciseRecord.fields.licenses.map(licenseId => licensesStore.getLicenseById(licenseId));
    console.log('Fetched licenses:', license.value);
  
  if (exerciseRecord.fields.author) {
    projectAuthor.value = exerciseRecord.fields.author;
    console.log('Project Author:', projectAuthor.value);
    }

  if (exerciseRecord.fields.authorURL) {
    projectAuthorURL.value = exerciseRecord.fields.authorURL;
    console.log('Project Author URL:', projectAuthorURL.value);
    }
  }

  // const rubricId = exerciseRecord.fields.rubrics;
  // console.log('Rubric ID:', rubricId);

  // Update the iframe height when the page is rendered
  await nextTick();
  updateHeight();

  console.log(record.value)

// const filteredCriteria = computed(() => {
//   return criteriaStore.records.filter(criterion => criterion.fields.rubric.value === 'exercise');
// });

// Update the iframe height when the record changes
watch(record, updateHeight, { immediate: true });

const title = computed(() => {
  if (record.value && record.value.fields) {
    return 'Exercise: ' + record.value.fields.name
  }
  // Return a default title if record.value or record.value.fields is not defined
  return 'Exercise'
})

useHead({
  title: title.value,
})

</script>