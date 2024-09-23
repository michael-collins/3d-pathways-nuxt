<template>
    <!-- special style child selectors from tailwind.config.js -->
   <div class="markdown mx-2 
   child-list-ol:mx-6 
   child-list-ol:list-decimal 
   child-list-ul:mx-6 
   child-list-ul:list-disc 
   child-list-ol-li:pt-1 
   child-list-ul-li:pt-1 
   child-list-ol-li-ul:list-[circle] 
   child-list-ol-li-ul:px-4 
   child-list-ol-li-ul:py-1 
   child-list-ul-li-ul:list-[circle] 
   child-list-ul-li-ul:px-4 
   child-list-ul-li-ul:py-1 
   child-list-ol-li-ul-li:pt-1 
   child-list-ul-li-ul-li:pt-1
   " v-html="markdown.render(source)" />

</template>


 <script>
 import MarkdownIt from "markdown-it";
 
 export default {
   props: {
     source: {
       type: String,
       default: ""
     }
   },
   data() {
     return {
       markdown: new MarkdownIt()
     };
   }
 };
 </script>
 