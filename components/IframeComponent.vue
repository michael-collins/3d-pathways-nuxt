<template>
  <div class="mt-[12rem] rounded-xl p-2 grid justify-items-stretch">
  <details  class="collapse collapse-arrow bg-neutral ">
        <summary  class="collapse-title text-neutral-content border-neutral ">iframe</summary>
        <div class="collapse-content bg-neutral">
       
      <button class="btn btn-info border-2 flex justify-self-start focus:bg-base-100 focus:text-base-content mt-2" @click="copyCode" role="button" aria-label="Copy iFrame embed"><Icon name="material-symbols:content-copy-outline" class="text-xl" /> Copy iframe embed</button>

        <div class="overflow-x-scroll " role="region" aria-label="iFrame embed">
          <pre class="language-html text-primary-content">
          <code tabindex="0" ref="iframeCode">
              &lt;iframe width="100%" height="{{articleHeight}}px" src="{{currentUrl}}?iframe=true" style="border:none;" title="{{ record.fields && record.fields.name ? record.fields.name : 'Exercise' }}" &gt;&lt;/iframe&gt;
          </code>
          </pre>  
       </div>
      <details  class="collapse collapse-arrow bg-base-200 rounded mt-2 ">
        <summary  class="collapse-title text-base-neutral focus:bg-info">Configure iframe display settings</summary>
        <div class="collapse-content">
          <slot></slot> 
        </div>
      </details>
  </div>
</details>
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