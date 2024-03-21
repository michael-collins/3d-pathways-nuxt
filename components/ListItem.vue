<template>

    <!-- Show the LoaderComponent when isLoading is true -->
    <LoaderComponent v-if="isLoading" />
    <!-- Show the actual content when isLoading is false -->
    <div  v-else v-for="record in records" :key="record.id" class="">
          <h3 class="font-semibold self-center">
            {{ record.fields.name ? record.fields.name : 'Name not available' }}
          </h3>
          <p class="text-sm">
            {{ record.fields.description ? record.fields.description : 'Description not available' }}
          </p>
          <NuxtLink :to="`/${destination}/${record.id}`" :key="record.id" :aria-label="`Link to ${record.fields.name}`" :aria-live="'polite'" class="btn">
            View
          
          </NuxtLink>
    </div>


    
</template>

<script>
export default {
  name: 'ListItem',
  props: ['records', 'destination', 'isLoading'],
};
</script>
