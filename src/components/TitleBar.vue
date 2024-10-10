<script setup lang="ts">
import AutheurCard from '~/components/AutheurCard.vue'

</script>

<template>
  <div class="drag-area w-full h-9 z-99 absolute"></div>
  <div class="fixed top-2 mb-4 right-4 flex">
    <div class="py-[8px] px-[16px] gap-[10px] bg-blur sm:hidden md:flex md:flex-col lg:flex-row">
      <AutheurCard name="Guide créer par Magem" avatar="/img/magem.png" />
      <AutheurCard name="Freelance VBA VB WINDEV" avatar="/img/sbarb.png" />
      <AutheurCard name="Dévelopeur Web" avatar="/img/steodec.png" />
    </div>
  </div>
</template>

<style scoped>
.drag-area {
  -webkit-app-region: drag;
  cursor: move;
}

button {
  -webkit-app-region: no-drag; /* Pour empêcher le bouton d'être draggable */
}
</style>
