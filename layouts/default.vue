<template>
    <div class="flex flex-col h-screen">
      <header v-if="!iframe">
        <NavBar />
      </header>
      <main class="flex-grow">
        <div>
        <slot />
        
      </div>
    </main>
    <footer v-if="!iframe">
      <FooterComponent />
    </footer>  
  </div>
  </template>
  <script setup> 
  const route = useRoute();

  const iframe = computed(() => route.query.iframe === 'true');
// v-if="!iframe"
// ?iframe=true
  </script>