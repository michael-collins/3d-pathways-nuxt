<template>
    <div>
      <NavBar />

        <BreadcrumbsComponent  :breadcrumbs="breadcrumbs" />
        <div>
        <slot />
      </div>
    </div>
  </template>
  <script setup>

  // Default breadcrumbs data
  const defaultBreadcrumbs = { show: true, showBackButton: false };
  
  // Reactive reference to the breadcrumbs data
  const breadcrumbs = ref(defaultBreadcrumbs);

  </script>