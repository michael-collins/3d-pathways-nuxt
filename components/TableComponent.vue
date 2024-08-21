<template>
  <div v-if="rubricData && rubricData.length">
    <h2 class="text-2xl font-semibold text-left uppercase mb-4"> {{ title }}</h2>
    <div class="border border-base-300 rounded-lg m-8 p-4">
      <h3 class="prose pt-8 uppercase text-left text-lg pl-4" v-for="record in rubricData" :key="record.id">{{ record.fields.name }} Rubric</h3>
      <p class="prose pt-2 pb-8 px-6 text-left" v-for="record in rubricData" :key="record.id">{{ record.fields.description }}</p>

    <div class="overflow-x-auto">
      <table class="table table-sm" v-if="criteriaData && criteriaData.length">
        <thead>
          <tr>
            <th class="text-base-content">Criterion</th>
            <th class="text-base-content">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in criteriaData" :key="record.id">
            <td>{{ record.fields.name }}</td>
            <td>{{ record.fields.description }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Loading...</p>
    </div>
  </div>
</div>
  </template>
  
  <script setup>
  const props = defineProps({
    rubricData: Array,
    criteriaData: Array,
    title: String,
  });
  
  // console.log('Rubric data prop:', props.rubricData);
  </script>