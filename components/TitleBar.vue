<script setup lang="ts">
import AutheurCard from '~/components/AutheurCard.vue'

const action = (type: string) => {
  switch (type) {
    case 'minusWindow':
      window.electronAPI.minimizeWindow()
      break
    case 'maxWindow':
      window.electronAPI.maximizeWindow()
      break
    case 'closeWindow':
      window.electronAPI.closeWindow()
      break
  }
}
</script>

<template>
  <div class="drag-area w-full h-9 z-99 absolute"></div>
  <div class="fixed top-4 mb-4 left-72 flex">
    <div class="py-[8px] px-[16px] gap-[10px] bg-blur sm:hidden md:flex md:flex-col lg:flex-row">
      <AutheurCard name="Guide créer par Magem" avatar="/img/magem.png" />
      <AutheurCard name="Freelance VBA VB WINDEV" avatar="/img/sbarb.png" />
      <AutheurCard name="Dévelopeur Web" avatar="/img/steodec.png" />
    </div>
  </div>
  <div class="fixed top-4 right-4 z-50">
    <div class="flex align-middle py-[4px] px-[16px] gap-[10px] bg-blur">
      <btn icon-only size="xs" icon="/img/svg/minus.svg" variant="outline" color="light" @click="action('minusWindow')" />
      <btn icon-only size="xs" icon="/img/svg/max.svg" variant="outline" color="warning" @click="action('maxWindow')" />
      <btn icon-only size="xs" icon="/img/svg/close.svg" variant="outline" color="danger" @click="action('closeWindow')" />
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
