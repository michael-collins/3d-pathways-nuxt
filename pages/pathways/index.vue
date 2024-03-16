<template>
  <div>
  <NavBar />
  <div class="hero bg-base-200 py-10">
    <div class="hero-content text-left">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Pathways</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
    </div>
  </div>
<gridContainer>
  <LinkedCardComponent :records="pathwaysStore.records" destination="pathways" />
</gridContainer>  
  <pre class="mockup-code m-8">{{ pathwaysStore.records }}</pre>
</div>
</template>

<script setup>
const pathwaysStore = usePathwaysStore(); // Use the dedicated pathways store

onMounted(() => {
  pathwaysStore.fetchRecords(); // Call the fetchRecords action specific to pathways
});
</script>
