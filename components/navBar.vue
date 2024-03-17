<template>
<div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><nuxt-link to="/">About</nuxt-link></li>
        <li><nuxt-link to="/lessons">Lessons</nuxt-link></li>
        <li><nuxt-link to="/lectures">Lectures</nuxt-link></li>
        <li><nuxt-link to="/pathways/">Pathways</nuxt-link></li>
        <li><nuxt-link to="/exercises/">Exercises</nuxt-link></li>

        </ul>
      </div>
      <div class="flex-1 hidden md:flex">
      <ul class="menu menu-horizontal px-1">
        <li class=""><nuxt-link to="/">About</nuxt-link></li>
        <li class=""><nuxt-link to="/lessons">Lessons</nuxt-link></li>
        <li class=""><nuxt-link to="/lectures">Lectures</nuxt-link></li>
        <li><nuxt-link to="/pathways/">Pathways</nuxt-link></li>
        <li><nuxt-link to="/exercises/">Exercises</nuxt-link></li>
      </ul>
    </div>
    </div>
    
    <div class="navbar-end">
      <toggleDarkButton />
      
    </div>
  </div>

  </template>
<script>

  
  </script>