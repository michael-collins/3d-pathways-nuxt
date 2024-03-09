<template>
  <div>
    <NavBar />

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
      <div v-if="record.fields.exercises && record.fields.exercises.length" class="py-8">
          <h2 class="text-2xl font-semibold mb-2 text-center uppercase">Exercises:</h2>
          
          <div class="space-y-3">
            <div v-for="exercise in record.fields.exercises" :key="'exercise'" class="p-4 bg-base-200 rounded-box">
              <h3 class="text-lg font-semibold normal-case">Exercise name ID: {{ exercise }}</h3>
              <p class="text-sm p-3">Description placeholder</p>
              <!-- <a class="btn" @click="navigateToExerciseDetail(exerciseDetail.id)">View</a> -->
              <!-- <div v-if="exerciseDetail.difficulty && exerciseDetail.difficulty.length" class="pt-8">
                <ul class="">
                  <li v-for="(difficulty, index) in exerciseDetail.difficulty" :key="index" class="badge badge-outline text-xs m-1 uppercase">
                    {{ difficulty }}
                  </li>
                </ul>
              </div> -->
            </div>
          </div>
        </div>

      <!-- Displaying Competencies -->
      <div v-if="record.fields.competencies && record.fields.competencies.length" class="py-8">
        <h2 class="text-2xl font-semibold mb-2 text-center uppercase">Competencies:</h2>
        <div class="space-y-4">
          <div v-for="competency in record.fields.competencies" :key="'competency'" class="bg-base-200 p-4 rounded-lg">
            <h3 class="text-lg font-medium normal-case">Name: {{ competency }}</h3>
            <h4>Description:</h4>
            <MDC :value="competency" class="p-3 markdown mx-2 
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
        </div>
      </div>

      <!-- Displaying Examples -->
      <div v-if="record.fields.examples" class="">
        <h2 class="text-2xl font-semibold uppercase text-center">Examples:</h2>
        <MDC :value="record.fields.examples" class="p-3 markdown mx-2 
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

    
   
  </div>
  </div>
  </div>
  <pre class="mockup-code m-8">{{ record }}</pre>
</template>

<script setup lang="ts">
const route = useRoute();
const pathwaysStore = usePathwaysStore();
const pathwayId = ref(route.params.id);
let record = ref(null); // Initialize as a let to allow reassignment

// const {pathway} = pathwaysStore.getPathwayById(route.params.id);
onMounted(async () => {
  await pathwaysStore.fetchRecords();
  const { records } = pathwaysStore;

  // Ensure records is an array before using find()
  if (Array.isArray(records)) {
    record.value = records.find(record => record.id === pathwayId.value);
  } else {
    console.error("Records is not an array:", records);
  }
});
</script>

