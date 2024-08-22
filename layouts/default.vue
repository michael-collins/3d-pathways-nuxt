<template>
    <div class="flex flex-col h-screen">
      <header v-if="!hidePageElements">
        <NavBar />
      </header>
      <main class="flex-grow">
        <div>
        <slot />
        
      </div>
    </main>
    <footer v-if="!hidePageElements">
      <FooterComponent />
    </footer>  
  </div>
  </template>
  <script setup> 
  // const route = useRoute();

 // Computed property for hidePageElements based on the URL query parameter
const hidePageElements = computed(() => route.query.hidePageElements === 'true');

  </script>