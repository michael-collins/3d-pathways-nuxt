<template>
<div class="navbar bg-base-100">
    <div class="navbar-start">
      <nav class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><nuxt-link exact class="nav-link" role="button" tabindex="0" to="/" aria-label="About page">About</nuxt-link></li>
          <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/lessons" aria-label="Lessons page">Lessons</nuxt-link></li>
          <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/lectures" aria-label="Lectures page">Lectures</nuxt-link></li>
          <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/pathways/" aria-label="Pathways page">Pathways</nuxt-link></li>
          <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/exercises/" aria-label="Exercises page">Exercises</nuxt-link></li>
        </ul>
      </nav>
      <nav class="flex-1 hidden md:flex">
      <ul class="menu menu-horizontal px-1">
        <li><nuxt-link exact class="nav-link" role="button" tabindex="-1" to="/" aria-label="About page">About</nuxt-link></li>
        <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/lessons" aria-label="Lessons page">Lessons</nuxt-link></li>
        <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/lectures" aria-label="Lectures page">Lectures</nuxt-link></li>
        <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/pathways/" aria-label="Pathways page">Pathways</nuxt-link></li>
        <li><nuxt-link class="nav-link" role="button" tabindex="-1" to="/exercises/" aria-label="Exercises page">Exercises</nuxt-link></li>
      </ul>
    </nav>
    </div>
    
    <div class="navbar-end">
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
    @apply mr-1;
  
  }
  .router-link-active {
    @apply text-primary;
    @apply border-primary;
    @apply border;
    @apply mr-1;
  }
  .router-link-active:hover {
    @apply bg-primary;
    @apply text-primary-content;
  }
</style>