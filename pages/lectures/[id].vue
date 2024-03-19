<template>
    <article>
      <div v-if="record" class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <!-- Displaying the Name and Image -->
        <!-- <img v-if="record.fields.image" :src="record.fields.image[0].url" class="w-full h-auto" /> -->
        <h1 v-if="record.fields.name" class="text-5xl font-bold mt-8 mb-4">{{ record.fields.name }}</h1>

        <div v-if="record && record.fields" :key="record.id" class="space-y-10 divide-y-4 divide-neutral">
  
            <!-- Displaying the author -->
            <div class="mb-10" v-if="record.fields.author">
              <!-- <author>{{ record.fields.author }}</author> -->
              <MDC :value="record.fields.author" class="markdown mx-2 inline-block" />
            </div>
          <!-- I'm here to handle the divide style utility-->
          <div v-else class="pb-8"></div>
  
          <!-- Displaying the Description -->
          <div class="mb-10" v-if="record.fields.description">
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
          <!-- Displaying the Topics -->
          <div class="mb-10" v-if="record.fields.topics">
            <h2 class="text-2xl font-semibold mb-2 text-left uppercase ">Topics:</h2>
            <MDC :value="record.fields.topics" class="markdown mx-2 
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

          <!-- iframe -->
          <div class="mockup-code">
            <pre
              class="language-html"><code>&lt;iframe src="{{ currentUrl }}" style="border:none;" title="{{ record.fields && record.fields.name ? record.fields.name : 'Lecture' }}"&gt;&lt;/iframe&gt;</code></pre>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'breadcrumbs',
  })
  
  
  const route = useRoute();
  const lecturesStore = useLecturesStore();
  const lectureId = ref(route.params.id);
  
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
    await lecturesStore.fetchRecords();
  const { records } = lecturesStore;

  if (Array.isArray(records)) {
    record.value = records.find(record => record.id === lectureId.value);
  } else {
    console.error("Records is not an array:", records);
  }
  });
  const title = computed(() => {
    // Check if record.value and record.value.fields are defined before accessing record.value.fields.name
    if (record.value && record.value.fields) {
      return 'Lecture: ' + record.value.fields.name
    }
    // Return a default title if record.value or record.value.fields is not defined
    return 'Lecture'
  })
  
  useHead({
    title: title.value,
  })
  </script>
  
  