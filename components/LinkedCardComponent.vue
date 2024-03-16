<template>
        <div 
        
        v-for="record in records" 
        :key="record.id" 
        class="group flex flex-col bg-base-100 border shadow-sm rounded-xl hover:shadow-md transition min-h-32 cursor-pointer sm:m-2 md:m-4"
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
</template>

<script>
export default {
  name: 'LinkedCardComponent',
  props: ['records', 'destination'],
};
</script>
