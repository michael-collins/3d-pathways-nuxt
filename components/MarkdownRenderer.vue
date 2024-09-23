<template>
  <MDC :value="value" class="markdown mx-2 
            child-a:font-medium 
            child-a:link 
            child-a:text-secondary 
            hover:child-a:text-base-content 
            child-list-ol:list-decimal 
            child-list-ol-li-marker:font-medium 
            child-list-ol-li-marker:text-info 
            child-list-ol:mx-6 
            child-list-ul:mx-6 
            child-list-ol-li:pt-1 
            child-list-ol-li-ol-li:pt-1 
            child-list-ol-li-ol-li:list-[disc] 
            child-list-ul-li:pt-1 
            child-list-ol-li-ul:px-4 
            child-list-ol-li-ul:py-1 
            child-list-ol-li-ul:list-[circle] 
            child-list-ol-li-ul-li:pt-1 
            child-list-ul-li:list-disc 
            child-list-ul-li-ul:px-4 
            child-list-ul-li-ul:py-1 
            child-list-ul-li-ul:list-[circle] 
            child-list-ul-li-ul-li:pt-1"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  value: {
    type: String,
    required: true
  }
});
</script>