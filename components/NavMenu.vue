<template>

      <nav class="flex-1" role="navigation" aria-label="Main Navigation">
      <ul class="menu menu-vertical px-1">
        
        <li><NuxtLink class="nav-link" role="button" aria-label="Getting started page" to="/">Home</NuxtLink></li>
        <h2 class="menu-title flex items-center gap-4 px-1.5"><Icon name="ant-design:compass-outlined" class="text-xl" /> Wayfinding</h2>
        <li><NuxtLink class="nav-link" role="button" aria-label="Pathways page" to="/pathways/">Pathways</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Specializations page" to="/specializations/">Specializations</NuxtLink></li>
        <h2 class="menu-title flex items-center gap-4 px-1.5"><Icon name="material-symbols:book-2" class="text-xl" /> Learning Materials</h2>
        <li><NuxtLink class="nav-link" role="button" aria-label="Lessons page" to="/lessons">Lessons</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Lectures page" to="/lectures">Lectures</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Exercises page" to="/exercises/">Exercises</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Projects page" to="/projects/">Projects</NuxtLink></li>
      </ul>
    </nav>
   
  </template>
<script>

  
</script>
<style scoped>
  .nav-link { 
  /* @apply from tailwindcss and daisyUI */
    /* @apply border; */
    /* @apply border-base-100; */
    /* @apply border-base-100; */
    @apply py-1;
    @apply px-1;
    @apply md:px-2;
    @apply lg:px-4;
    @apply md:py-2;
    @apply lg:py-3;
    
  
  }
  .router-link-active {
    @apply text-primary;
    /* @apply border-primary; */
    /* @apply border; */
    /* @apply mx-1; */
  }
  .router-link-active:hover, .router-link-active:focus {
    @apply bg-primary;
    @apply text-primary-content;
  }
</style>