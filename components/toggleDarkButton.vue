<template>
    
    <button aria-label="Color Mode" class="btn btn-ghost"
            @click="changeColor">
        <ColorScheme placeholder="...">
            <Icon v-if="colorMode.value === darkTheme" name="heroicons-outline:moon" class="text-xl" />
            <Icon v-else name="heroicons-outline:sun" class="text-xl" />
        </ColorScheme>
    </button>

    <!-- Theme Picker Select List -->
    <!-- <select class="select w-full max-w-xs" v-model="colorMode.preference">
      <option disabled selected>Theme</option>
      <option v-for="theme of themes" :key="theme">{{ theme }}</option>
    </select> -->
  </template>
  
  <script setup>
    const darkTheme = 'dim'
    const changeColor = () => (colorMode.preference = (colorMode.value === 'light' ? darkTheme : 'light'))
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

  