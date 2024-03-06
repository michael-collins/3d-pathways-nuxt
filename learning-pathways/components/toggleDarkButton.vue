<template>
    <!-- <label class="btn btn-ghost swap swap-rotate"> -->
      <!-- this hidden checkbox controls the state -->
      <!-- <input type="checkbox" class="theme-controller" value="dim" :checked="isDark" @change="toggleDarkMode" /> -->
      
      <!-- sun icon -->
      <!-- <svg v-if="isDark" class="swap-on h-5 w-5 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"> -->
        <!-- <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/> -->
      <!-- </svg>   -->
  
      <!-- moon icon -->
      <!-- <svg v-else class="swap-off h-5 w-5 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"> -->
        <!-- <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/> -->
      <!-- </svg> -->
    <!-- </label> -->
    <select class="select w-full max-w-xs" v-model="colorMode.preference">
      <option disabled selected>Theme</option>
      <option v-for="theme of themes" :key="theme">{{ theme }}</option>
    </select>
  </template>
  
  <script setup>
//   export default {
//     data() {
//       return {
//         isDark: JSON.parse(localStorage.getItem('isDark')) || false
//       };
//     },
//     methods: {
//       toggleDarkMode() {
//         this.isDark = !this.isDark;
//         localStorage.setItem('isDark', this.isDark);
//       }
//     },
    // 
//   };
    const colorMode = useColorMode();
    const themes = [
    'system',
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    ];
  </script>

  