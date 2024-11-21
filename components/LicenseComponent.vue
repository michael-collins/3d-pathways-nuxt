<template>
  <div v-if="license && license.length">
    <!-- <h2 class="text-2xl font-semibold text-left uppercase mb-4"> {{ title }}</h2> -->
    <div class="border bg-base-300 rounded-xl my-8 py-8 px-6">
      <!-- <h3 class="prose pt-8 uppercase text-center text-lg" v-for="record in license" :key="record.id">{{ license.name }} Rubric</h3>
      <p class="prose pt-2 pb-8 px-6 text-center" v-for="record in license" :key="record.id">{{ lic.description }}</p> -->

      <p xmlns:cc="http://creativecommons.org/ns#" >
       <a class="link font-semibold" rel="cc:attributionURL" :href="currentUrl">{{ work }}</a> by <a class="link" rel="cc:attributionURL dct:creator" property="cc:attributionName" :href="authorURL">{{ author }}</a> is licensed under <a class="link" :href="license[0].fields.url" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">{{license[0].fields.name}}</a>
        </p> 

  </div>
</div>
</template>
  
  <script setup>
  const props = defineProps({
    license: Array,
    author: String,
    authorURL: String,
    work: String,
    currentUrl: String,
    title: String,
  });
  // console.log('Props:', props);
  // console.log('License data:', props.license);
  // console.log('Rubric data prop:', props.rubricData);
  </script>