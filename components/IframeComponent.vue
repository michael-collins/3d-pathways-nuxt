<template>
    <div class="mt-[12rem]">
        <div tabindex="0" class="collapse collapse-arrow bg-neutral rounded-xl p-2 grid justify-items-stretch">
            <button class="btn btn-neutral border-neutral border-2 flex justify-self-start focus:bg-base-100 focus:text-base-content" @click="copyCode" role="button" aria-label="Copy iFrame embed"><Icon name="material-symbols:content-copy-outline" class="text-xl" /> Copy iframe embed</button>
            <div class="overflow-x-scroll collapse-content" role="region" aria-label="iFrame embed">

            <pre class="language-html text-primary-content">
            <code ref="iframeCode">
                &lt;iframe width="100%" height="{{articleHeight}}px" src="{{currentUrl}}?iframe=true" style="border:none;" title="{{ record.fields && record.fields.name ? record.fields.name : 'Exercise' }}" &gt;&lt;/iframe&gt;
            </code>
            </pre>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: ['articleHeight', 'currentUrl', 'record'],
    setup() {
      const iframeCode = ref(null);
  
      const copyCode = () => {
        const textarea = document.createElement('textarea');
        textarea.textContent = iframeCode.value.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      };
  
      return {
        iframeCode,
        copyCode
      };
    },
  };
  </script>