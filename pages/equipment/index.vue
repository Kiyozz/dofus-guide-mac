<script setup lang="ts">
const tabs = ref('tuto')
const urls = {
  tuto: 'https://dofusguide.fr/stuff',
  huz: 'https://www.huzounet.fr/equipments',
}

const onIframeLoad = () => {
  if (tabs.value === 'huz') {
    const iframe = document.getElementById('iframe')
    if (iframe) {
      console.log('Ifram Ok')
      const doc = iframe?.contentWindow?.postMessage('Hello', '*')
      if (doc) {
        console.log('Doc Ok')
      }
    }
  }
}
</script>

<template>
  <div class="mt-6">
    <div class="flex">
      <button class="py-2 px-3 rounded-tl-lg" :class="tabs == 'tuto' ? 'bg-gray-900 shadow-2xl text-white' : 'bg-gray-400'" @click="tabs = 'tuto'">Stuff Magem </button>
      <button class="py-2 px-3 flex gap-2" :class="tabs == 'huz' ? 'bg-gray-900 shadow-2xl  text-white' : 'bg-gray-400'" @click="tabs = 'huz'">
        <div><img src="https://www.huzounet.fr/_next/static/media/logo-huzounet.eeafcdfb.png" alt="" class="h-[25px]" /> </div>
        <div>Huz</div>
      </button>
<!--
      <button class="py-2 px-3 rounded-tr-lg" :class="tabs == 'dofusbook' ? 'bg-gray-900  shadow-2xl  text-white' : 'bg-gray-400'" @click="tabs = 'dofusbook'">Dofus Book </button>
-->
    </div>
    <div class="bg-gray-900 h-[85vh] w-full">
      <iframe id="iframe" :src="urls[tabs]" class="w-full h-full" @load="onIframeLoad"></iframe>
    </div>
  </div>
</template>

<style scoped></style>
