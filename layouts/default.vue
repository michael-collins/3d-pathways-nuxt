<template>
    <div class="flex flex-col h-screen">
      <header>
        <NavBar />
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