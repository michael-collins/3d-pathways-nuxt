<template>
<div  class="navbar bg-base-100">
    <div class="grow">
      <nav class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><NuxtLink class="nav-link" role="button" aria-label="Getting started page" to="/">Home</NuxtLink></li>
          <li><NuxtLink class="nav-link" role="button" aria-label="Lessons page" to="/lessons">Lessons</NuxtLink></li>
          <li><NuxtLink class="nav-link" role="button" aria-label="Lectures page" to="/lectures">Lectures</NuxtLink></li>
          <li><NuxtLink class="nav-link" role="button" aria-label="Pathways page" to="/pathways/">Pathways</NuxtLink></li>
          <li><NuxtLink class="nav-link" role="button" aria-label="Specializations page" to="/specializations/">Specializations</NuxtLink></li>
          <li><NuxtLink class="nav-link" role="button" aria-label="Exercises page" to="/exercises/">Exercises</NuxtLink></li>
          <li><NuxtLink class="nav-link" role="button" aria-label="Projects page" to="/projects/">Projects</NuxtLink></li>
        </ul>
      </nav>
      <nav class="flex-1 hidden md:flex">
      <ul class="menu menu-horizontal px-1">
        <li><NuxtLink class="nav-link" role="button" aria-label="Getting started page" to="/">Home</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Lessons page" to="/lessons">Lessons</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Lectures page" to="/lectures">Lectures</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Pathways page" to="/pathways/">Pathways</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Specializations page" to="/specializations/">Specializations</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Exercises page" to="/exercises/">Exercises</NuxtLink></li>
        <li><NuxtLink class="nav-link" role="button" aria-label="Projects page" to="/projects/">Projects</NuxtLink></li>
      </ul>
    </nav>
    </div>
    
    <div class="">
      <toggleDarkButton />
      
    </div>
  </div>

  </template>
<script>

  
</script>
<style scoped>
  .nav-link { 
  /* @apply from tailwindcss and daisyUI */
    @apply border;
    @apply border-base-100;
    @apply border-base-100;
    @apply py-1;
    @apply px-1;
    @apply md:px-2;
    @apply lg:px-4;
    @apply md:py-2;
    @apply lg:py-3;
    
  
  }
  .router-link-active {
    @apply text-primary;
    @apply border-primary;
    @apply border;
    /* @apply mx-1; */
  }
  .router-link-active:hover, .router-link-active:focus {
    @apply bg-primary;
    @apply text-primary-content;
  }
</style>