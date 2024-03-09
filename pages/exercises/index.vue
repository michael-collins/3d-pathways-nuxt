<template>
  <NavBar />
  <div class="hero bg-base-200 py-10">
    <div class="hero-content text-left">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Exercises</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
    </div>
  </div>
  <LinkedCardComponent :records="exercisesStore.records" destination="exercises" />
  <pre class="mockup-code m-8">{{ exercisesStore.records }}</pre>
</template>

<script setup>
const exercisesStore = useExercisesStore(); // Use the dedicated exercises store

onMounted(() => {
  exercisesStore.fetchRecords(); // Call the fetchRecords action specific to pathways
});
</script>
