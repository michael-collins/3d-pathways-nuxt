<template>

    <!-- Show the LoaderComponent when isLoading is true -->
    <LoaderComponent v-if="isLoading" />
    <!-- Show the actual content when isLoading is false -->
    <div  v-else v-for="record in records" :key="record.id" class="border-b-2 border-base-300 pb-4 flex md:flex-row flex-col">
        <div v-if="record.fields.image && record.fields.image[0].thumbnails" class="flex ">
          <!-- <div 
          :style="{ backgroundImage: `url(${record.fields.image[0].thumbnails.large.url})` }" 
          class="bg-cover bg-no-repeat bg-center p-4 mb-4 md:mb-0 md:mr-4 md:w-[90px] md:min-h-[90px] lg:w-[120px] lg:min-h-[120px] rounded-lg w-full h-[90px]"
          :aria-label="`Thumbnail image. ${record.fields.imageAlt ? record.fields.imageAlt : 'Image for decoration only.'}`"
          >
            
          </div>  -->
          <div class="bg-cover bg-no-repeat bg-center mb-4 md:mb-0 md:mr-4 md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] rounded-lg w-full h-[120px]">
            <nuxtLink :to="`/${destination}/${record.fields.slug}`" :key="record.id" :aria-label="`Link to ${record.fields.name}`" :aria-live="'polite'" class="hover:underline ">
              <nuxtImg lazy v-if="record.fields.image" 
              
              height="120"
              width="120"
              :src="record.fields.image[0].thumbnails.large.url" 
              :alt="`Image for ${record.fields.name ? record.fields.name : 'list thumbnail.'}. ${record.fields.imageAlt ? record.fields.imageAlt : 'Image for decoration only.'}`"
              class="object-cover size-full rounded-lg"
              />
            </nuxtLink>
          </div>

          <!-- <nuxtImg v-if="showImage && record.fields.image" 
          height="360"
          width="720"
          :src="record.fields.image[0].thumbnails.large.url" class="w-full h-auto rounded-lg" 
          :alt="`Image for ${record.fields.name ? record.fields.name : 'article content.'}. ${record.fields.imageAlt ? record.fields.imageAlt : 'Image for decoration only.'}`"
          /> -->

        </div>
        <div class="w-full md:grow">
          <NuxtLink :to="`/${destination}/${record.fields.slug}`" :key="record.id" :aria-label="`Link to ${record.fields.name}`" :aria-live="'polite'" class="hover:underline ">
            <h3 class="font-semibold self-center text-2xl">
            {{ record.fields.name ? record.fields.name : 'Name not available' }}
          </h3>
          </NuxtLink>
          <p class="text-sm lg:w-1/2 min-h-[100px]">
            
            <!-- {{ record.fields.description ? record.fields.description : 'Description not available' }} -->
            {{ record.fields.description ? record.fields.description.slice(0, 100) + (record.fields.description.length > 100 ? '...' : '') : 'Description not available' }}
          </p>
        </div>
        <div class="mx-auto mt-4  flex items-end">
          <NuxtLink :to="`/${destination}/${record.fields.slug}`" :key="record.id" :aria-label="`Link to ${record.fields.name}`" :aria-live="'polite'" class="btn btn-ghost ">
            View
          </NuxtLink>
        </div>
    </div>


    
</template>

<script>
export default {
  name: 'ListItem',
  props: ['records', 'destination', 'isLoading'],
  // setup() {
  //   const slug = (name) => {
  //     return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  //   };

  //   return { slug };
  // },

};

</script>
