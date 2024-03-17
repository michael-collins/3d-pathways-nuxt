<template>
    <div class="flex flex-col h-screen">
      <header>
        <NavBar />
        <BreadcrumbsComponent  :breadcrumbs="breadcrumbs" />
      </header>
      <main class="flex-grow">
        <div>
        <slot />
        
      </div>
    </main>
    <footer>
      <FooterComponent />
    </footer>  
  </div>
  </template>
  <script setup>

  // Default breadcrumbs data
  const defaultBreadcrumbs = { show: true, showBackButton: false };
  
  // Reactive reference to the breadcrumbs data
  const breadcrumbs = ref(defaultBreadcrumbs);

  </script>