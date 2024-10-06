<script setup lang="ts">
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
  <div class="flex justify-between gap-[10px] fixed top-0 ml-[20.5%] my-[16px] drag-area">
    <div class="inline-flex py-[8px] px-[16px] gap-[10px] bg-blur">
      <div class="inline-flex gap-[8px]">
        <img src="/img/magem.png" alt="" class="rounded-full w-[24px] h-[24px] border-2 border-green-500" />
        <div class="f-text">Guide créer par Magem</div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/discord.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/twitch.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/youtube.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
      </div>
      <div class="inline-flex gap-[8px]">
        <img src="/img/sbarb.png" alt="" class="rounded-full w-[24px] h-[24px] border-2 border-green-500" />
        <div class="f-text">Freelance VBA VB WINDEV</div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/discord.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/twitch.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/youtube.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
      </div>
      <div class="inline-flex gap-[8px]">
        <img src="/img/steodec.png" alt="" class="rounded-full w-[24px] h-[24px] border-2 border-green-500" />
        <div class="f-text">Developeur Web</div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/discord.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/twitch.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
        <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
          <img src="/img/icon/youtube.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
        </div>
      </div>
    </div>
    <div class="flex align-middle py-[8px] px-[16px] gap-[10px] bg-blur">
      <button @click="action('minusWindow')" class="text-white">
        <UIcon name="i-hugeicons-minus-sign" size="24" />
      </button>
      <button @click="action('maxWindow')" class="text-white">
        <UIcon name="i-material-symbols-light-rectangle-outline" size="24" />
      </button>
      <button @click="action('closeWindow')" class="text-white">
        <UIcon name="i-hugeicons-cancel-01" size="24" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.f-text {
  font-size: 14px;
  color: #fff;
}

.drag-area {
  -webkit-app-region: drag;
  cursor: move;
}

button {
  -webkit-app-region: no-drag; /* Pour empêcher le bouton d'être draggable */
}
</style>
