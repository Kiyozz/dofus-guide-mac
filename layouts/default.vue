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
    <main class="fixed top-0 ml-[20.5%] my-[4%] w-[77vw]">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
