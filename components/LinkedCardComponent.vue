<template>

    <!-- Show the LoaderComponent when isLoading is true -->
    <LoaderComponent v-if="isLoading" />
    <!-- Show the actual content when isLoading is false -->
    <!-- <section v-else v-for="record in records" :key="record.id"
    class="group flex flex-col bg-base-100 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition min-h-32 cursor-pointer sm:m-1"
   > -->
    <NuxtLink  v-else v-for="record in records" :key="record.id" :to="`/${destination}/${record.fields.slug}`" :aria-label="`Link to ${record.fields.name}`" :aria-live="'polite'" class="group flex flex-col bg-base-100 border-2 border-base-300 hover:border-primary shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition min-h-32 cursor-pointer ">
      <div class="flex items-center min-h-28">
        <div class="self-center w-full">
          <nuxtImg lazy v-if="record.fields.image" 
              
              height="120"
              width="120"
              :src="record.fields.image[0].thumbnails.large.url" 
              :alt="`Image for ${record.fields.name ? record.fields.name : 'list thumbnail.'}. ${record.fields.imageAlt ? record.fields.imageAlt : 'Image for decoration only.'}`"
              class="object-cover bg-cover size-full w-full h-30 rounded-t-lg"
              />
          <div class="sm:m-1 p-4 md:p-5">
            <h3 class="group-hover:text-primary font-semibold self-center">
            {{ record.fields.name ? record.fields.name : 'Name not available' }}
            </h3>
            <p class="group-hover:text-primary text-sm">
              {{ record.fields.description ? record.fields.description : 'Description not available' }}
            </p>
          </div>
        </div>
        <!-- <div class="card-actions justify-end">
          <button class="btn btn-primary">Listen</button>
        </div> -->
      </div>
    </NuxtLink>

    <!-- <NuxtLink  v-else v-for="record in records" :key="record.id" :to="`/${destination}/${record.id}`" :aria-label="`Link to ${record.fields.name}`" :aria-live="'polite'" class="group flex flex-col bg-base-100  shadow-sm  hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition min-h-32 cursor-pointer sm:m-1">
     
    <div class="card lg:card-side bg-base-100 border border-2 border-base-300 hover:border-primary">
      <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
      <div class="card-body">
        <h2 class="card-title">{{ record.fields.name ? record.fields.name : 'Name not available' }}</h2>
        <p>{{ record.fields.description ? record.fields.description : 'Description not available' }}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
    </NuxtLink> -->

  <!-- </section> -->

</template>

<script>
export default {
  name: 'LinkedCardComponent',
  props: ['records', 'destination', 'isLoading'],
};
</script>
