<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

// Load rubric data from the JSON file in public directory
const rubric = ref(null)

onMounted(async () => {
  try {
    const data = await $fetch('/data/rubrics.json')
    rubric.value = data.find((r: any) => r.id === props.id || r.slug === props.id)
  } catch (error) {
    console.error('Error loading rubric data:', error)
  }
})
</script>

<template>
  <div v-if="rubric" class="rubric-component my-6 p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
    <h3 class="text-xl font-bold mb-2">{{ rubric.name }}</h3>
    <p v-if="rubric.description" class="text-gray-700 dark:text-gray-300 mb-4">
      {{ rubric.description }}
    </p>
    
    <div v-if="rubric.criteria && rubric.criteria.length" class="criteria-list">
      <h4 class="font-semibold mb-3">Assessment Criteria:</h4>
      <ul class="space-y-3">
        <li 
          v-for="criterion in rubric.criteria" 
          :key="criterion.id"
          class="pl-4 border-l-4 border-blue-500 dark:border-blue-400"
        >
          <div class="font-medium">{{ criterion.name }}</div>
          <div v-if="criterion.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {{ criterion.description }}
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="rubric-component-error p-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded">
    <p class="text-yellow-800 dark:text-yellow-200">
      ⚠️ Rubric "{{ id }}" not found
    </p>
  </div>
</template>

<style scoped>
.rubric-component {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.criteria-list ul {
  list-style: none;
  padding-left: 0;
}
</style>
