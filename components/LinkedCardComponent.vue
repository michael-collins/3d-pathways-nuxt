<template>
  <!-- Card Section -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        <div 
        
        v-for="record in records" 
        :key="record.id" 
        class="group flex flex-col bg-base-100 border shadow-sm rounded-xl hover:shadow-md transition min-h-32 cursor-pointer"
      >
        <NuxtLink :to="`/${destination}/${record.id}`" class="p-4 md:p-5">
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
        </div>
      <!-- End Card -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Card Section -->
</template>

<script>
export default {
  name: 'LinkedCardComponent',
  props: ['records', 'destination'],
};
</script>
