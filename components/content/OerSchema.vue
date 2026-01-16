<script setup lang="ts">
const { page } = useContent()
const config = useRuntimeConfig()

const jsonLd = computed(() => {
  if (!page.value?.oer) return null
  
  // Generate OER JSON-LD
  const baseUrl = config.public.siteUrl || 'https://3d-pathways.com'
  
  const schema = {
    '@context': 'https://oerschema.org/',
    '@id': `${baseUrl}${page.value._path}`,
    ...page.value.oer,
    name: page.value.title,
    url: `${baseUrl}${page.value._path}`
  }
  
  // Add optional fields
  if (page.value.author) {
    schema.author = {
      '@type': 'Person',
      name: page.value.author
    }
  }
  
  if (page.value.image) {
    schema.image = page.value.image
  }
  
  return schema
})

const jsonLdString = computed(() => 
  jsonLd.value ? JSON.stringify(jsonLd.value, null, 2) : ''
)
</script>

<template>
  <component
    :is="'script'"
    v-if="jsonLd"
    type="application/ld+json"
    v-html="jsonLdString"
  />
</template>
