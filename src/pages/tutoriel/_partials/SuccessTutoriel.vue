<script setup lang="ts">
import Cac from "~/pages/tutoriel/_partials/Cac.vue";

const props = defineProps({
  success: Object,
  playerId: Number,
  guideId: Number
})
console.log(props.success)
const name = props.success?.name ? props.success.name : props.success.nom
</script>

<template>
  <div class="flex gap-2">
    <img src="/img/icon/success.png" class="my-auto" style="height: 25px; width: 25px"/>
    <Cac :cacId="success.id" :userId="playerId" :guideId="guideId"/>
    <span class="text-[#eb762d]">{{ name }}</span>
  </div>
</template>

<style scoped>

</style>