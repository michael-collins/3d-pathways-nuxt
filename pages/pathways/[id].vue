<template>
<article ref="articleElement">
    <div v-if="record" class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
      <!-- Displaying the Name and Image -->
      <!-- <img v-if="record.fields.image" :src="record.fields.image[0].url" class="w-full h-auto" /> -->
      <!-- <h1 v-if="record.fields.name" class="text-5xl font-bold mt-8 mb-4">{{ record.fields.name }}</h1> -->
 
  <!-- Displaying the Description -->
  <!-- <div v-if="record.fields.description">
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
        </div> -->



    
    <div v-if="record && record.fields" :key="record.id" class="space-y-6">
      <!-- Displaying the Name -->
      <h1 v-if="record.fields.name" class="text-5xl font-bold">
        {{ record.fields.name }}
      </h1>

      <!-- Displaying the Description -->
      <p v-if="record.fields.description" class="text-md p-3">
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
      </p>

      <!-- Displaying Learning Objectives -->
      <div v-if="record.fields['learning objectives']" class="">
        <h2 class="text-2xl font-semibold uppercase">Learning Objectives:</h2>
        <p>{{ record.fields['learning objectives'] }}</p>
      </div>
      
      <!-- Displaying (roles) Fields of Practice -->
      <div v-if="record.fields.roles && record.fields.roles.length" class="py-8">
        <h2 class="text-2xl font-semibold mb-2 text-center uppercase ">Fields of practice:</h2>
        <ul class="text-center">
          <li v-for="(role, index) in record.fields.roles" :key="index" class="badge badge-primary p-3 m-1">
            {{ role }}
          </li>
        </ul>
      </div>

      
      <!-- Displaying Exercises -->
<div v-if="exerciseDetails && exerciseDetails.length" class="py-8">
  <h2 class="text-2xl font-semibold mb-2 text-center uppercase">Exercises:</h2>
  <div class="space-y-4">
  <LinkedCardComponent :records="exerciseDetails" destination="exercises" />
</div>
  <!--<div class="space-y-4">
    <div v-for="exercise in exerciseDetails.filter(e => e)" :key="exercise.name" class="bg-base-200 p-4 rounded-lg">
      <h3 class="text-lg font-medium normal-case">Name: {{ exercise.name }}</h3>
      <h4>Description:</h4>
      <MDC :value="exercise.description" class="p-3 markdown mx-2 
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
  </div> -->
</div>

      <!-- Displaying Competencies -->
<div v-if="competencyDetails && competencyDetails.length" class="py-8">
  <h2 class="text-2xl font-semibold mb-2 text-center uppercase">Competencies:</h2>
  <div class="space-y-4">
    <div v-for="competency in competencyDetails" :key="competency.name" class="bg-base-200 p-4 rounded-lg">
      <h3 class="text-lg font-medium normal-case">{{ competency.name }}</h3>
      
      <MDC :value="competency.description" class="p-3 markdown mx-2 
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
  </div>
</div>

      <!-- Displaying Examples -->
      <div v-if="record.fields.examples" class="">
        <h2 class="text-2xl font-semibold uppercase text-center">Examples:</h2>
        <MDC :value="record.fields.examples" class="p-3 markdown mx-2 
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
  </div>
   <!-- iframe -->
   <IframeComponent :articleHeight="articleHeight" :currentUrl="currentUrl" :record="record" />
  </div>
</article>
  <!-- <pre class="mockup-code m-8">{{ record }}</pre> -->
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'breadcrumbs',
})

const route = useRoute();
const pathwaysStore = usePathwaysStore();
const pathwayId = ref(route.params.id);
const pathwaySlug = ref(route.params.id);
const record = ref(null);
const competencyDetails = ref([]);
const exerciseDetails = ref([]);
const articleHeight = ref(0);
const articleElement = ref(null);

const updateHeight = () => {
  if (articleElement.value) {
    const rect = articleElement.value.getBoundingClientRect();
    articleHeight.value = Math.ceil(rect.height);
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
  await pathwaysStore.fetchRecords();
  // const { records } = pathwaysStore;
  pathwaySlug.value = route.params.id;
  record.value = pathwaysStore.getPathwayBySlug(pathwaySlug.value);


  // if (Array.isArray(records)) {
  //   record.value = records.find(record => record.id === pathwayId.value);
  // } else {
  //   console.error("Records is not an array:", records);
  // }

  // Importing the competenciesStore and ref from Vue
  const competenciesStore = useCompetenciesStore();
  const competencies = ref([]);

  // Fetching the competency records from the store
  await competenciesStore.fetchRecords();
  competencies.value = competenciesStore.competencies;

  // Checking if the record and competencies are available
  if (record.value && record.value.fields.competencies && competencies.value) {
    // Mapping the competency IDs to their names and descriptions
    competencyDetails.value = record.value.fields.competencies.map(competencyId => {
      const matchedCompetency = competencies.value.find(competency => competency.id === competencyId);
      return matchedCompetency ? { name: matchedCompetency.fields.name, description: matchedCompetency.fields.description } : null;
    });
  }

  /// Importing the exerciseStore and ref from Vue
const exercisesStore = useExercisesStore();
const exercises = ref([]);

// Fetching the exercise records from the store
await exercisesStore.fetchRecords();
exercises.value = exercisesStore.records; // Use records instead of exercises

// Checking if the record and exercises are available
if (record.value && record.value.fields.exercises && exercises.value) {
  // Mapping the exercise IDs to their names and descriptions
exerciseDetails.value = record.value.fields.exercises.map(exerciseId => {
  const matchedExercise = exercises.value.find(exercise => exercise.id === exerciseId);
  return matchedExercise ? { id: matchedExercise.id, fields: { name: matchedExercise.fields.name, description: matchedExercise.fields.description, slug: matchedExercise.fields.slug } } : null;
});
}
console.log(exerciseDetails)
  // Update the iframe height when the page is rendered
  await nextTick();
  updateHeight();
});

// Update the iframe height when the record changes
watch(record, updateHeight, { immediate: true });

const title = ref({ id: pathwayId })
useHead({
  title: 'Pathway: ' + title.value.id,
})
</script>

