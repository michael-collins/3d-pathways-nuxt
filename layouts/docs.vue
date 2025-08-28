<!-- layouts/docs.vue -->
<template>
  <div v-if="!hidePageElements" class="flex flex-col min-h-screen">
    <div class="drawer lg:drawer-open" role="navigation" :aria-expanded="drawerOpen">
      <input id="side-navigation-drawer" type="checkbox" aria-label="Navigation drawer toggle" class="drawer-toggle"
        v-model="drawerOpen" />
      <div class="drawer-content flex flex-col min-h-screen">
        <a href="#main-content" class="skip-link">Skip to main content</a>

        <label for="side-navigation-drawer" class="drawer-button btn btn-ghost w-fit lg:hidden left m-1 flex-none ">
          <Icon name="charm:menu-hamburger" class="text-xl flex-none " />
        </label>
        <header>
          <BreadcrumbsComponent 
            :breadcrumbs="breadcrumbs"
            :pathwayName="''"
            :exerciseName="''"
            :lectureName="''"
            :lessonName="''"
            :defaultBreadcrumbs="{ show: true, showBackButton: true }" />
        </header>
        <main id="main-content" class="flex-grow">
          <div>
            <slot />
          </div>
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </div>
      <div class="drawer-side">
        <label for="side-navigation-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content " @focusin="toggleDrawer">
          <!-- Sidebar content here -->
          <label id="side-navigation-drawer-close-btn" role="button" tabindex="0" for="side-navigation-drawer" aria-label="close sidebar" class="btn btn-ghost lg:hidden">Close
            <Icon name="material-symbols:close-small" class="text-xl" />
          </label>
          
          <!-- Documentation Navigation -->
          <h2 class="menu-title flex items-center gap-4 px-1.5">
            <Icon name="material-symbols:book-2" class="text-xl" /> Documentation
          </h2>
          
          <nav class="flex-1" role="navigation" aria-label="Documentation Navigation">
            <div v-if="pending" class="p-2">
              <div class="skeleton h-4 w-full mb-2"></div>
              <div class="skeleton h-4 w-3/4 mb-2"></div>
              <div class="skeleton h-4 w-1/2"></div>
            </div>
            <div v-else-if="error" class="p-2 text-error">
              <p class="text-sm">Error loading navigation</p>
            </div>
            <ul v-else-if="docsList" class="menu menu-vertical px-1">
              <!-- Overview Link -->
              <li>
                <NuxtLink 
                  to="/docs"
                  class="nav-link"
                  role="button"
                  aria-label="Documentation overview page"
                >
                  Overview
                </NuxtLink>
              </li>
              
              <!-- Document Links -->
              <li v-for="doc in docsList" :key="doc._path">
                <NuxtLink 
                  :to="`/docs/${doc.slug}`"
                  class="nav-link"
                  role="button"
                  :aria-label="`${doc.title} documentation page`"
                >
                  {{ doc.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
          
          <!-- Quick Actions -->
          <h2 class="menu-title flex items-center gap-4 px-1.5 mt-6">
            <Icon name="ant-design:compass-outlined" class="text-xl" /> Quick Actions
          </h2>
          <ul class="menu menu-vertical px-1">
            <li>
              <NuxtLink 
                to="/" 
                class="nav-link"
                role="button"
                aria-label="Back to home page"
              >
                Home
              </NuxtLink>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
  <main v-else id="main-content" class="flex-grow">
    <div>
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
// Default breadcrumbs data
const defaultBreadcrumbs = { show: true, showBackButton: false };

// Reactive reference to the breadcrumbs data
const breadcrumbs = ref(defaultBreadcrumbs);
const route = useRoute();
const drawerOpen = ref(false);

// Computed property for hidePageElements based on the URL query parameter
const hidePageElements = computed(() => route.query.hidePageElements === 'true');

// Fetch docs list for sidebar navigation
const { data: docsList, pending, error } = await useAsyncData('docs-sidebar', () =>
  queryContent('docs').only(['title', 'slug', '_path']).sort({ title: 1 }).find()
)

const toggleDrawer = () => {
  const checkbox = document.getElementById('side-navigation-drawer') as HTMLInputElement;
  if (checkbox) {
    checkbox.checked = true;
  }
};

const closeDrawer = () => {
  const checkbox = document.getElementById('side-navigation-drawer') as HTMLInputElement;
  if (checkbox) {
    checkbox.checked = false;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDrawer();
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }
  }
  if (event.key === 'Enter' && (event.target as HTMLElement)?.id === 'side-navigation-drawer-close-btn') {
    closeDrawer();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// Add page-specific meta
useHead({
  bodyAttrs: {
    class: 'docs-layout'
  }
})
</script>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}

.nav-link { 
  /* @apply from tailwindcss and daisyUI */
  @apply py-1;
  @apply px-1;
  @apply md:px-2;
  @apply lg:px-4;
  @apply md:py-2;
  @apply lg:py-3;
}

.router-link-active {
  @apply text-primary;
}

.router-link-active:hover, .router-link-active:focus {
  @apply bg-primary;
  @apply text-primary-content;
}
</style>

<style scoped>
/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Responsive sidebar */
@media (max-width: 768px) {
  aside {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  aside.open {
    transform: translateX(0);
  }
}
</style>
