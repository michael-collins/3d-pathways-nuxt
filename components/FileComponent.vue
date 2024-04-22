<template>
     <div class="text-md p-3 " v-for="file in fileData" :key="file.id">
        <div class="flex flex-row space-x-4 items-center" v-for="(attachment, index) in file.fields.attachment" :key="index">
            <a v-if="attachment.type && attachment.type.startsWith('image/')" class="border-2 border-base-100 hover:border-2 hover:border-secondary" :href="attachment.url">
                <img :alt="file.fields.alt" :src="attachment.thumbnails.small.url" /> 
            </a>
            <a v-else class="" :href="attachment.url">
                <Icon class="link text-2xl hover:text-secondary mr-3 " name="material-symbols:download"  />
            </a>
            <a class="link hover:link-secondary" :href="attachment.url">{{ file.fields.name }}</a>
             <!-- <p>{{ file.fields.caption }}</p>
        <p>{{ file.fields.license }}</p>
        <p>{{ file.fields.citation }}</p> -->
        </div>
    </div>
    <!-- <pre>{{ JSON.stringify(fileData, null, 2) }}</pre> -->
    </template>
    
    <script setup>
    const props = defineProps({
      fileData: Array,
    //   title: String,
    });
    
    // console.log('Rubric data prop:', props.rubricData);
    </script>