<template>
  <div class="navbar bg-base-100">
  
  <div class="flex justify-end w-full">
    <button aria-label="Color Mode" class="btn btn-ghost"
    @click="toggleViewMode">
        <Icon v-if="props.viewMode === 'grid'" name="material-symbols:view-list-rounded" class=" text-xl " />
        <Icon v-else name="material-symbols:grid-view-rounded" class=" text-xl" />
      </button>
    
  </div>
</div>
  
</template>
<style>
  /*@apply bg-white text-blue-400 rounded-full;*/
  /* .active {
    background: white;
    border-radius: 9999px;
    color: #63b3ed;
  } */
</style>
<script setup>

// export default {
//   name: 'gridListToggle',
//   props: ['isLoading', 'mode'],
// };
// const viewMode = ref('grid') // Initialize viewMode as 'grid'
// const emit = defineEmits(['viewModeChanged'])
// const toggleViewMode = () => {
//   viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
//   emit('viewModeChanged', viewMode.value)
// }
const props = defineProps({
  viewMode: {
    type: String,
    default: 'grid'
  }
})

const emit = defineEmits(['viewModeChanged'])

const toggleViewMode = () => {
  const newViewMode = props.viewMode === 'grid' ? 'list' : 'grid'
  emit('viewModeChanged', newViewMode)
}

</script>