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
        <p>Assembled by <a class="link hover:text-secondary" href="https://michaelcollins.xyz">Michael</a> and <a class="link hover:text-secondary" href="https://ianbrill.com">Ian</a>.</p>
      </aside> 
      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <ul class="menu-horizontal space-x-2">
          <NuxtLink class="link hover:text-secondary" role="button" aria-label="License page" to="/dev" >Dev</NuxtLink>
          <a class="link text-neutral-content hover:text-secondary" href="https://github.com/michael-collins/3d-pathways-nuxt/issues/new?assignees=&labels=&projects=&template=report-a-problem.md&title=">Report a problem</a>
          <a class="link text-neutral-content hover:text-secondary" href="https://github.com/michael-collins/3d-pathways-nuxt"><Icon name="entypo-social:github" class="w-6 h-6" /></a>
        </ul>
      </nav>
  </footer>
</template>

<style scoped></style>
