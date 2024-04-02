<template>
    <div class="flex flex-col h-screen">
      <header>
        <NavBar />
        <BreadcrumbsComponent 
    :pathwayName="pathwayName" 
    :exerciseName="exerciseName" 
    :lectureName="lectureName" 
    :lessonName="lessonName" 
    :breadcrumbs="breadcrumbs" 
    :defaultBreadcrumbs="{ show: true, showBackButton: true }" 
  />
  
  <!-- other layout content -->      </header>
      <main class="flex-grow">
        <div>
        <slot />
        
      </div>
    </main>
    <footer>
      <FooterComponent />
    </footer>  
  </div>
  </template>
  <script setup>

  // Default breadcrumbs data
  const defaultBreadcrumbs = { show: true, showBackButton: false };
  const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: '',
  },
});
  // Reactive reference to the breadcrumbs data
  const breadcrumbs = ref(defaultBreadcrumbs);
  // Inject the name
  // const recordName = inject('recordName')
// Inject the name
// let recordName = ref('');
// provide('recordName', recordName);

// // Assume you have a `record` ref that holds the actual record data
// let record = ref(null);
// // Update recordName when the actual record name is available
// watch(() => record.value, (newVal, oldVal) => {
//   if (newVal && newVal.fields && newVal.fields.name) {
//     recordName.value = newVal.fields.name;
//   }
// });

const route = useRoute();
console.log('breadcrumbs layout route',route);
const pathwaysStore = usePathwaysStore();
const exercisesStore = useExercisesStore();
const lecturesStore = useLecturesStore();
const lessonsStore = useLessonsStore();

const pathwayName = ref('');
const exerciseName = ref('');
const lectureName = ref('');
const lessonName = ref('');


const updateNames = async () => {
  const newId = route.params.id;
  if (newId) {
    const pathway = await pathwaysStore.getPathwayById(newId);
    console.log('pathway:', pathway); // Log the fetched pathway

    const exercise = await exercisesStore.getExerciseById(newId);
    console.log('exercise:', exercise); // Log the fetched exercise

    const lecture = await lecturesStore.getLectureById(newId);
    console.log('lecture:', lecture); // Log the fetched lecture

    const lesson = await lessonsStore.getLessonById(newId);
    console.log('lesson:', lesson); // Log the fetched lesson
    if (pathway && pathway.fields && pathway.fields.name) {
      pathwayName.value = pathway.fields.name;
    }
    if (exercise && exercise.fields && exercise.fields.name) {
      exerciseName.value = exercise.fields.name;
    }
    if (lecture && lecture.fields && lecture.fields.name) {
      lectureName.value = lecture.fields.name;
    }
    if (lesson && lesson.fields && lesson.fields.name) {
      lessonName.value = lesson.fields.name;
    }
  } else {
    // Reset breadcrumb names or fetch the name of the index.vue route
    pathwayName.value = '';
    exerciseName.value = '';
    lectureName.value = '';
    lessonName.value = '';
  }
};

    onMounted(updateNames);
    watch(() => route.params.id, updateNames, { immediate: true });
  </script>