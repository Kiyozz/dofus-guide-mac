<script setup lang="ts">

import SuccessTutoriel from "~/pages/tutoriel/_partials/SuccessTutoriel.vue";

defineProps({
  s: Object,
  playerId: Number,
  guideId: Number
})
</script>

<template>
  <div class="flex-col">
    <div class="flex gap-2">
      <img src="/img/icon/donjon.png" alt="" class="w-[25px]">
      <span class="text-[#e05a5a]">{{ s.valeur.name }}</span>
    </div>
    <div>
      <svg class="h-1">
        <line x1="0" y1="0" x2="85%" y2="0" style="stroke:#e05a5a;stroke-width:4"/>
      </svg>
    </div>
    <div class="flex">
      <div class="w-1/2">
        <img :src="s.valeur.image" class="w-28">
      </div>
      <div class="flex flex-col h-full gap-2 mt-2">
        <SuccessTutoriel v-for="success in s.valeur.success" :success="success" :player-id="playerId"
                         :guide-id="guideId"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>