<script setup lang="ts">
// Example page demonstrating Nuxt Content queries with migrated OER data

const route = useRoute()

// Query pathways
const { data: pathways } = await useAsyncData('pathways', () =>
  queryContent('pathways')
    .where({ published: true })
    .sort({ title: 1 })
    .find()
)

// Query specializations
const { data: specializations } = await useAsyncData('specializations', () =>
  queryContent('specializations')
    .where({ published: true })
    .limit(10)
    .find()
)

// Query exercises (beginner level)
const { data: beginnerExercises } = await useAsyncData('beginner-exercises', () =>
  queryContent('exercises')
    .where({ difficulty: 'beginner', published: true })
    .limit(5)
    .find()
)

// Load component data
const { data: rubrics } = await useAsyncData('rubrics-data', () =>
  $fetch('/content/data/rubrics.json')
)

const { data: licenses } = await useAsyncData('licenses-data', () =>
  $fetch('/content/data/licenses.json')
)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Content Migration Test Page</h1>
    
    <!-- Pathways Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-4">Pathways (Courses)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="pathway in pathways"
          :key="pathway._path"
          :to="pathway._path"
          class="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
        >
          <h3 class="text-xl font-semibold mb-2">{{ pathway.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ pathway.description }}
          </p>
          <div class="mt-2 text-blue-600 dark:text-blue-400 text-sm">
            {{ pathway.oer['@type'] }} →
          </div>
        </NuxtLink>
      </div>
    </section>
    
    <!-- Specializations Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-4">Specializations (Units)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink
          v-for="spec in specializations"
          :key="spec._path"
          :to="spec._path"
          class="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
        >
          <h3 class="text-xl font-semibold mb-2">{{ spec.title }}</h3>
          <p v-if="spec.whoItsFor" class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {{ spec.whoItsFor }}
          </p>
          <div class="flex flex-wrap gap-2 mt-2">
            <span 
              v-for="(objective, i) in spec.oer?.teaches?.slice(0, 2)" 
              :key="i"
              class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
            >
              {{ objective.substring(0, 50) }}...
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>
    
    <!-- Exercises Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-4">Beginner Exercises</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="exercise in beginnerExercises"
          :key="exercise._path"
          :to="exercise._path"
          class="flex flex-col p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
        >
          <img 
            v-if="exercise.image"
            :src="exercise.image"
            :alt="exercise.imageAlt"
            class="w-full h-40 object-cover rounded mb-3"
          />
          <h3 class="text-lg font-semibold mb-2">{{ exercise.title }}</h3>
          <div class="flex items-center gap-2 mt-auto">
            <span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
              {{ exercise.difficulty }}
            </span>
            <span v-if="exercise.youtubePlaylistID" class="text-xs text-gray-500">
              📹 Video Tutorial
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>
    
    <!-- Component Data Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-4">Component Data (Rubrics & Licenses)</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Rubrics -->
        <div class="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Rubrics</h3>
          <div class="space-y-3">
            <div v-for="rubric in rubrics" :key="rubric.id" class="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <div class="font-medium">{{ rubric.name }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ rubric.criteria?.length || 0 }} criteria
              </div>
            </div>
          </div>
        </div>
        
        <!-- Licenses -->
        <div class="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Licenses</h3>
          <div class="space-y-2">
            <a 
              v-for="license in licenses" 
              :key="license.id"
              :href="license.url"
              target="_blank"
              class="block p-2 bg-blue-50 dark:bg-blue-900 rounded hover:bg-blue-100 dark:hover:bg-blue-800"
            >
              <div class="font-medium text-blue-600 dark:text-blue-400">
                {{ license.name }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- OER Schema Info -->
    <section class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Migration Statistics</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ pathways?.length || 0 }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Pathways</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">
            {{ specializations?.length || 0 }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Specializations</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {{ rubrics?.length || 0 }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Rubrics</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {{ licenses?.length || 0 }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Licenses</div>
        </div>
      </div>
      
      <div class="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <p>✅ All content includes OER Schema metadata</p>
        <p>✅ Relationships maintained through slugs</p>
        <p>✅ Component data separated for efficiency</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>
