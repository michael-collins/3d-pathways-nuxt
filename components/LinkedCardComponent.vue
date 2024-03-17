<template>

    <!-- Show the LoaderComponent when isLoading is true -->
    <LoaderComponent v-if="isLoading" />
    <!-- Show the actual content when isLoading is false -->
    <!-- <section v-else v-for="record in records" :key="record.id"
    class="group flex flex-col bg-base-100 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition min-h-32 cursor-pointer sm:m-1"
   > -->
    <NuxtLink tabindex="0" v-else v-for="record in records" :key="record.id" :to="`/${destination}/${record.id}`" class="group flex flex-col bg-base-100 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition min-h-32 cursor-pointer sm:m-1 p-4 md:p-5" :aria-label="`Link to ${record.fields.name}`">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="group-hover:text-primary font-semibold">
            {{ record.fields.name ? record.fields.name : 'Name not available' }}
          </h3>
          <p class="group-hover:text-primary text-sm">
            {{ record.fields.description ? record.fields.description : 'Description not available' }}
          </p>
        </div>
      </div>
    </NuxtLink>
  <!-- </section> -->

</template>

<script>
export default {
  name: 'LinkedCardComponent',
  props: ['records', 'destination', 'isLoading'],
};
</script>
