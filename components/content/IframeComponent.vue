<script setup lang="ts">
const props = defineProps<{
  src?: string
  title?: string
  width?: string
  height?: string
  aspectRatio?: string
}>()

// Use props with sensible defaults
const iframeSrc = props.src || ''
const iframeTitle = props.title || 'Embedded Content'
const iframeWidth = props.width || '100%'
const iframeHeight = props.height || '600px'
const aspectRatio = props.aspectRatio || '16 / 9'
</script>

<template>
  <div 
    class="iframe-component my-6 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 shadow-lg"
    :style="{ aspectRatio }"
  >
    <iframe
      v-if="iframeSrc"
      :src="iframeSrc"
      :title="iframeTitle"
      :width="iframeWidth"
      :height="iframeHeight"
      frameborder="0"
      allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      class="w-full h-full"
    />
    <div v-else class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
      <p class="text-gray-500 dark:text-gray-400">No source URL provided</p>
    </div>
  </div>
</template>

<style scoped>
.iframe-component {
  min-height: 400px;
  position: relative;
}

.iframe-component iframe {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
