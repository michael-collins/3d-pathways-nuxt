<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

// Load license data from the JSON file in public directory
const license = ref(null)

onMounted(async () => {
  try {
    const data = await $fetch('/data/licenses.json')
    license.value = data.find((l: any) => l.id === props.id || l.slug === props.id)
  } catch (error) {
    console.error('Error loading license data:', error)
  }
})
</script>

<template>
  <div v-if="license" class="license-component inline-flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg text-sm">
    <Icon name="heroicons:shield-check" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
    <span class="font-medium">License:</span>
    <a 
      :href="license.url" 
      target="_blank" 
      rel="noopener noreferrer"
      class="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
    >
      {{ license.name }}
    </a>
    <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
  </div>
  <div v-else class="license-component-error inline-block px-3 py-2 bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded text-sm">
    <span class="text-yellow-800 dark:text-yellow-200">
      ⚠️ License "{{ id }}" not found
    </span>
  </div>
</template>

<style scoped>
.license-component {
  display: inline-flex;
}
</style>
