<template>
    <div class="navbar bg-base-100">
        <div class="text-md breadcrumbs flex-1 mx-8 border-t-2 border-base-300" v-if="breadcrumbs.show">
          <!-- <li v-if="breadcrumbs.showBackButton">
                    <button @click="goBack" class="btn btn-ghost">
                        <Icon name="heroicons:arrow-left-16-solid" class="text-primary" />
                        Back
                    </button>
                </li>   -->
          <ul class="p-2 bg-base-100 rounded-t-none text-md">
                  <li><NuxtLink class="" aria-label="home" to="/"><Icon name="heroicons:home-20-solid" class="text-base-content" /></NuxtLink></li>
                <!-- <li v-for="(breadcrumb, index) in breadcrumbList" :key="index">
                  <NuxtLink class=" focus:underline text-base-content" :to="breadcrumb.path" :aria-label="breadcrumb.label">
                      {{ breadcrumb.label }}
                  </NuxtLink>
                </li> -->
                <li v-for="(breadcrumb, index) in breadcrumbList" :key="index">
                <NuxtLink class=" focus:underline text-base-content" :to="breadcrumb.path" :aria-label="breadcrumb.label">
                  {{ breadcrumb.label }}
                </NuxtLink>
              </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const breadcrumbs = ref({ show: true, showBackButton: true });

onMounted(() => {
  const router = useRouter();
  if (router.currentRoute.value.meta && router.currentRoute.value.meta.breadcrumbs) {
    breadcrumbs.value = router.currentRoute.value.meta.breadcrumbs;
  }
});
const props = defineProps({
  breadcrumbs: {
    type: Object,
    default: () => ({ show: false, showBackButton: false }),
  },
  pathwayName: {
    type: String,
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  lectureName: {
    type: String,
    required: true
  },
  lessonName: {
    type: String,
    required: true
  },
});
// let recordName = inject('recordName');
// console.log('breadcrumbscomponent recordName:', recordName?.value);

const route = useRoute();
const router = useRouter();

const goBack = () => { // Go back to the previous page.
    router.back();
};

const breadcrumbList = computed(() => {
  if (props.breadcrumbs.show) {
    const pathParts = route.path.split('/').filter(part => part);
    const breadcrumbs = pathParts.map((part, index) => {
      return {
        label: part,
        path: '/' + pathParts.slice(0, index + 1).join('/'),
      };
    });

    // If name prop is provided, replace the last breadcrumb's label with it
    if (props.pathwayName) {
      breadcrumbs[breadcrumbs.length - 1].label = props.pathwayName;
    } else if (props.exerciseName) {
      breadcrumbs[breadcrumbs.length - 1].label = props.exerciseName;
    } else if (props.lectureName) {
      breadcrumbs[breadcrumbs.length - 1].label = props.lectureName;
    } else if (props.lessonName) {
      breadcrumbs[breadcrumbs.length - 1].label = props.lessonName;
    }


    return breadcrumbs;
  } else {
    return [];
  }
});
// console.log('name:', props.name);
console.log('breadcrumbs:', props.exerciseName);
// console.log('breadcrumbList:', breadcrumbList.value);
</script>