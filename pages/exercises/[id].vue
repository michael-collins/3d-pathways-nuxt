<template>
  <article ref="articleElement">
    <div v-if="record" class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
      <div v-if="showAlert" class="alert alert-warning">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>
          Some items are hidden based on settings in the URL.
        </span>  
      </div>
      <!-- Displaying the Name and Image -->
      <img v-if="showImage && record.fields.image" 
      :src="record.fields.image[0].thumbnails.large.url" class="w-full h-auto rounded-lg" 
      :aria-label="`Image for ${record.fields.name ? record.fields.name : 'article content.'}. ${record.fields.imageAlt ? record.fields.imageAlt : 'Image for decoration only.'}`"
      />
      <h1 v-if="showTitle && record.fields.name" class="text-5xl font-bold mt-8 mb-4">{{ record.fields.name }}</h1>

      <div v-if="record && record.fields" :key="record.id" class="space-y-10 divide-y-4 divide-neutral">

        <!-- Displaying the Difficulty -->
        <div v-if="showDifficulty && record.fields.difficulty" class="pb-8">
          <!-- Displaying the difficulty levels -->
          <ul class="space-x-2">
            <li v-for="level in record.fields.difficulty" :key="level" class="badge badge-outline text-xs uppercase">
              {{ level }}
            </li>

          </ul>
        </div>
        <div v-else class="pb-8"><!-- I'm here to handle the divide style utility--></div>
        <!-- Displaying the Tags -->
        <div v-if="showTags && record.fields.tags" class="pb-8">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Software:</h2>

          <!-- Displaying the tags -->
          <ul class="space-x-2">
            <li v-for="tag in record.fields.tags" :key="tag" class="badge bg-base-300 text-xs uppercase">
              {{ tag }}
            </li>

          </ul>
        </div>
        <!-- Displaying the Description -->
        <div v-if="showDescription && record.fields.description">
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
        <div v-if="showLearningObjectives && record.fields.learningObjectives">
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
        <div v-if="showInstructions && record.fields.instructions">
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
        <div class="flex flex-col justify-items-stretch" v-if="showYoutubePlaylist && record.fields.youtubePlaylistID">
          <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Tutorials:</h2>
          <p v-if="record.fields.youtubePlaylistID" class="text-md p-3">
            <iframe width="100%" height="" class="aspect-video" 
              :src="'https://www.youtube.com/embed/videoseries?si=qS1_gP2XR65V9BbI&amp;list=' + record.fields.youtubePlaylistID"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
          </p>
          <a class="justify-self-auto mx-auto btn btn-ghost text-primary hover:text-secondary:"
            aria-label="View on Youtube" 
            :href="'https://youtube.com/playlist?list=' + record.fields.youtubePlaylistID" target="_blank">View playlist on Youtube.com
            <Icon name="octicon:link-external-16" class=" text-sm" />
          </a>
        </div>
        <!-- Displaying the Vimeo Playlist -->
        <div v-if="showVimeoPlaylist && record.fields.vimeoPlaylistID">
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
        <div v-if="showAssociatedMaterial && record.fields.associatedMaterial">
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
        <div  v-if="showFiles && record.fields.files && record.fields.files.length">
          <h2 class="text-2xl font-semibold text-left uppercase mb-4">Downloads:</h2>
          <FileComponent :fileData="files" />
        </div>
        <TableComponent v-if="showRubric" :rubricData="rubric" :criteriaData="criteria" title="Rubric:" />
      </div>
      <!-- iframe -->
      <IframeComponent :articleHeight="articleHeight" :currentUrl="currentUrl" :record="record" >
        <!-- Menu of Checkboxes -->
 
      
      <ul class="menu menu-xs bg-base-200 rounded-box">
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showImage" @change="updateUrl" /> Show Image
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showTitle" @change="updateUrl" /> Show Title
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showDifficulty" @change="updateUrl" /> Show Difficulty
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showTags" @change="updateUrl" /> Show Tags
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showDescription" @change="updateUrl" /> Show Description
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showLearningObjectives" @change="updateUrl" /> Show Learning Objectives
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showInstructions" @change="updateUrl" /> Show Instructions
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showYoutubePlaylist" @change="updateUrl" /> Show YouTube Playlist
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showVimeoPlaylist" @change="updateUrl" /> Show Vimeo Playlist
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showAssociatedMaterial" @change="updateUrl" /> Show Associated Material
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showFiles" @change="updateUrl" /> Show Files
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showRubric" @change="updateUrl" /> Show Rubric
          </label>
        </li>
        <li>
          <label>
        <input tabindex="0" type="checkbox" v-model="showLicense" @change="updateUrl" /> Show License
          </label>
        </li>
      </ul>
  
      </IframeComponent>
     
      
      <LicenseComponent v-if="showLicense" :work="record.fields.name" :currentUrl="currentUrl" :license="license" :author="record.fields.author" :authorURL="record.fields.authorURL" title="License" />

    </div>



  </article>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumbs',
})


const route = useRoute();
const router = useRouter();
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

const showImage = ref(true);
const showTitle = ref(true);
const showDifficulty = ref(true);
const showTags = ref(true);
const showDescription = ref(true);
const showLearningObjectives = ref(true);
const showInstructions = ref(true);
const showYoutubePlaylist = ref(true);
const showVimeoPlaylist = ref(true);
const showAssociatedMaterial = ref(true);
const showFiles = ref(true);
const showRubric = ref(true);
const showLicense = ref(true);

const updateUrl = () => {
  const query = {};
  if (!showImage.value) query.hideImage = true;
  if (!showTitle.value) query.hideTitle = true;
  if (!showDifficulty.value) query.hideDifficulty = true;
  if (!showTags.value) query.hideTags = true;
  if (!showDescription.value) query.hideDescription = true;
  if (!showLearningObjectives.value) query.hideLearningObjectives = true;
  if (!showInstructions.value) query.hideInstructions = true;
  if (!showYoutubePlaylist.value) query.hideYoutubePlaylist = true;
  if (!showVimeoPlaylist.value) query.hideVimeoPlaylist = true;
  if (!showAssociatedMaterial.value) query.hideAssociatedMaterial = true;
  if (!showFiles.value) query.hideFiles = true;
  if (!showRubric.value) query.hideRubric = true;
  if (!showLicense.value) query.hideLicense = true;
  router.push({ query });
};

const updateCheckboxesFromUrl = (query) => {
  showImage.value = !query.hideImage;
  showTitle.value = !query.hideTitle;
  showDifficulty.value = !query.hideDifficulty;
  showTags.value = !query.hideTags;
  showDescription.value = !query.hideDescription;
  showLearningObjectives.value = !query.hideLearningObjectives;
  showInstructions.value = !query.hideInstructions;
  showYoutubePlaylist.value = !query.hideYoutubePlaylist;
  showVimeoPlaylist.value = !query.hideVimeoPlaylist;
  showAssociatedMaterial.value = !query.hideAssociatedMaterial;
  showFiles.value = !query.hideFiles;
  showRubric.value = !query.hideRubric;
  showLicense.value = !query.hideLicense;
};

const showAlert = computed(() => {
  const query = route.query;
  return (
    (query.hideImage || query.hideTitle || query.hideDifficulty || query.hideTags || query.hideDescription) &&
    !query.iframe
  );
});
watch(route, (to) => {
  updateCheckboxesFromUrl(to.query);
});

onMounted(() => {
  updateCheckboxesFromUrl(route.query);
  updateHeight();
});
</script>