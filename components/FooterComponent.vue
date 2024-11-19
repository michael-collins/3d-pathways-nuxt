<script lang="ts" setup></script>

<template>
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <aside class="items-center grid-flow-col">
        <nav>
          <ul class="menu-horizontal space-x-2">
            <li><NuxtLink class="link hover:text-secondary" role="button" aria-label="About page" to="/about" >About</NuxtLink></li>
            <li><NuxtLink class="link hover:text-secondary" role="button" aria-label="License page" to="/license" >License</NuxtLink></li>
          </ul>
        </nav>
        <p>Assembled by <a aria-label="External link to information about Michael Collins." class="link hover:text-secondary" href="https://michaelcollins.xyz">Michael</a> and <a aria-label="External link to information about Ian Brill." class="link hover:text-secondary" href="https://ianbrill.com">Ian</a>.</p>
      </aside> 
      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <ul class="menu-horizontal space-x-2">
          <li><NuxtLink class="link hover:text-secondary" role="button" aria-label="Link to the developer page" to="/dev" >Dev</NuxtLink></li>
          <li><a aria-label="External link to report an issue about this website." class="link text-neutral-content hover:text-secondary" href="https://github.com/michael-collins/3d-pathways-nuxt/issues/new?assignees=&labels=&projects=&template=report-a-problem.md&title=">Report a problem</a></li>
          <li><a aria-label="External link to website's Github repository." class="link text-neutral-content hover:text-secondary" href="https://github.com/michael-collins/3d-pathways-nuxt"><Icon name="entypo-social:github" class="w-6 h-6" /></a></li>
        </ul>
      </nav>
  </footer>
</template>

<style scoped></style>
