<script setup>
useHead({
  title: 'Dofus Guide',
  bodyAttrs: {
    style: 'background-image: url("/img/bg.jpg"); background-size: cover; background-position: center; background-attachment: fixed; background-repeat: no-repeat;'
  }
})
</script>

<template>
  <div>
    <AppHeader />
      <main class="fixed top-12 right-4 sm:left-28 md:left-72">
        <slot />
      </main>
    <AppFooter />
  </div>
</template>
