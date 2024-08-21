<template>
  
    <div class="flex flex-col h-screen">
      
      <div class="drawer lg:drawer-open" role="navigation" :aria-expanded="drawerOpen">
  <input id="side-navigation-drawer" type="checkbox" class="drawer-toggle" v-model="drawerOpen" />
  <div class="drawer-content">
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <label for="side-navigation-drawer" class="btn btn-ghost drawer-button lg:hidden left m-1">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> -->
      <Icon name="charm:menu-hamburger" class="text-xl" />
    </label>
    <header v-if="!iframe">
        <!-- <NavBar  /> -->
        <BreadcrumbsComponent 
          :pathwayName="pathwayName" 
          :exerciseName="exerciseName" 
          :lectureName="lectureName" 
          :lessonName="lessonName" 
          :breadcrumbs="breadcrumbs" 
          :defaultBreadcrumbs="{ show: true, showBackButton: true }" 
        />
      </header>
    <main id="main-content" class="flex-grow">
        <div>
        <slot />
        
      </div>
    </main>
    <footer>
      <FooterComponent v-if="!iframe" />
    </footer>  
    
  
  </div> 
  <div class="drawer-side" v-if="!iframe">
    <label for="side-navigation-drawer" aria-label="close sidebar" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content " @focusin="toggleDrawer">
      <!-- Sidebar content here -->
      <label for="side-navigation-drawer" class="btn btn-ghost lg:hidden">Close <Icon name="material-symbols:close-small" class="text-xl" />
        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> -->
      </label>
      <NavMenu  />
    </ul>
  
  </div>
</div>
      
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

const drawerOpen = ref(false);

const toggleDrawer = () => {
    const checkbox = document.getElementById('nav-drawer-2');
    if (checkbox) {
      checkbox.checked = true;
    }
  };
const closeDrawer = () => {
  const checkbox = document.getElementById('nav-drawer-2');
  if (checkbox) {
    checkbox.checked = false;
  }
};

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      closeDrawer();
      document.activeElement.blur();
    }
  };

const iframe = computed(() => route.query.iframe === 'true');
// v-if="!iframe"
// ?iframe=true

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
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
    onMounted(updateNames);
    
    watch(() => route.params.id, updateNames, { immediate: true });
  </script>

  <style scoped>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    z-index: 100;
    transition: top 0.3s;
  }
  
  .skip-link:focus {
    top: 0;
  }
  </style>