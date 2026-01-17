<template>
  <div class="mt-[12rem] grid justify-items-stretch">
    <details class="collapse collapse-arrow bg-neutral">
      <summary class="collapse-title text-neutral-content border-neutral">Canvas LMS Embed Code</summary>
      <div class="collapse-content bg-neutral">
        <div class="flex gap-2 items-start mt-2">
          <button 
            class="btn btn-info border-2 flex items-center gap-2 focus:bg-base-100 focus:text-base-content" 
            @click="copyCode" 
            role="button" 
            aria-label="Copy iFrame embed code"
          >
            <Icon name="material-symbols:content-copy-outline" class="text-xl" />
            {{ copied ? 'Copied!' : 'Copy embed code' }}
          </button>
        </div>

        <div class="overflow-x-auto mt-4 rounded-lg bg-base-300" role="region" aria-label="iFrame embed code">
          <pre class="language-html text-base-content p-4 min-w-max"><code tabindex="0" ref="iframeCode">{{ iframeCodeText }}</code></pre>
        </div>

        <details class="collapse collapse-arrow bg-base-200 rounded mt-2">
          <summary class="collapse-title text-base-neutral focus:bg-info focus:text-info-content">Configure iframe display settings</summary>
          <div class="collapse-content">
            <slot></slot>
          </div>
        </details>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  url?: string
  title?: string
  iframeUrl?: string
  articleHeight?: string | number
  record?: any
}>()

const iframeCode = ref<HTMLElement | null>(null)
const copied = ref(false)

// Generate the iframe embed code
const iframeCodeText = computed(() => {
  const src = props.url || props.iframeUrl || ''
  const titleText = props.title || (props.record?.fields?.name) || 'Embedded Content'
  const height = props.articleHeight || '600'
  
  return `<iframe width="100%" height="${height}px" src="${src}" style="border:none;" title="${titleText}"></iframe>`
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(iframeCodeText.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
pre {
  white-space: pre;
  overflow-x: auto;
}

code {
  display: block;
  white-space: pre;
}
</style>