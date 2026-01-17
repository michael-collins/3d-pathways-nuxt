<script setup lang="ts">
const props = defineProps<{
  id?: string
  license?: string  
  title?: string
  author?: string
  authorUrl?: string
}>()

// Creative Commons license database - embedded in component
const licenses = {
  'cc-by-40': {
    name: 'CC BY 4.0',
    url: 'https://creativecommons.org/licenses/by/4.0/'
  },
  'cc0-10': {
    name: 'CC0 1.0',
    url: 'https://creativecommons.org/publicdomain/zero/1.0/'
  },
  'cc-by-sa-40': {
    name: 'CC BY-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/'
  },
  'cc-by-nd-40': {
    name: 'CC BY-ND 4.0',
    url: 'https://creativecommons.org/licenses/by-nd/4.0/'
  },
  'cc-by-nc-40': {
    name: 'CC BY-NC 4.0',
    url: 'https://creativecommons.org/licenses/by-nc/4.0/'
  },
  'cc-by-nc-sa-40': {
    name: 'CC BY-NC-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
  },
  'cc-by-nc-nd-40': {
    name: 'CC BY-NC-ND 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
  }
}

// Support both props - license takes priority
const licenseSlug = computed(() => props.license || props.id)
const licenseInfo = computed(() => {
  if (!licenseSlug.value) return null
  return licenses[licenseSlug.value] || null
})
</script>

<template>
  <div v-if="licenseInfo" class="mt-8">
    <div class="border bg-base-300 rounded-xl py-8 px-6">
      <p xmlns:cc="http://creativecommons.org/ns#">
        <a v-if="title" class="link font-semibold" rel="cc:attributionURL" href="#">{{ title }}</a> 
        <span v-if="!title">This work</span>
        <span v-if="author"> by <a v-if="authorUrl" class="link" :href="authorUrl" rel="cc:attributionURL dct:creator" property="cc:attributionName">{{ author }}</a><span v-else rel="cc:attributionURL dct:creator" property="cc:attributionName">{{ author }}</span></span>
        is licensed under 
        <a class="link" :href="licenseInfo.url" target="_blank" rel="license noopener noreferrer">
          {{ licenseInfo.name }}
        </a>
      </p>
    </div>
  </div>
  <div v-else-if="licenseSlug" class="mt-8">
    <div class="border bg-base-300 rounded-xl py-8 px-6 text-error">
      ⚠️ License "{{ licenseSlug }}" not found
    </div>
  </div>
</template>
