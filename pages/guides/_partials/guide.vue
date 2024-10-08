<script setup lang="ts">
import moment from 'moment'

defineProps({
  tuto: Object,
  selectedGuide: Number,
  onClickBtn: Function
})
const getImg = (guide: string) => {
  let img = ''
  switch (guide) {
    case 'GUIDE':
      img = '/img/bg_guide_prin.png'
      break
    case 'RUSH':
      img = '/img/bg_guide_rush.png'
      break
    case 'TURQUOISE':
      img = '/img/bg_guide_turq.png'
      break
  }
  return img
}
</script>

<template>
  <div>
    <button class="flex card gap-2 rounded-lg items-center cursor-pointer w-full" :class="selectedGuide === tuto.id ? 'outline outline-2 outline-green-500' : ''">
      <div class="maks">
        <img :src="getImg(tuto.image)" alt="" class="rounded-l-lg" />
      </div>
      <h2 class="font-bold" style="flex: 1 0 0">{{ tuto.name }}</h2>
      <p><span class="l-text">créer par:</span> {{ tuto.autheur }}</p>
      <p><span class="l-text">dernière mise à jour:</span> {{ moment(tuto.created_at).format('DD/MM/YYYY') }}</p>
      <div class="py-2 px-4">
        <btn size="xs" icon="/img/svg/add.svg" :color="selectedGuide === tuto.id ? 'primary' : 'secondary'" icon-only :disabled="selectedGuide !== tuto.id" @click="onClickBtn()" />
      </div>
    </button>
  </div>
</template>

<style scoped>
.card {
  background: linear-gradient(90deg, #171717 0%, rgba(23, 23, 23, 0.6) 100%);
}

.maks {
  mask-image: linear-gradient(to right, #171717 70%, rgba(23, 23, 23, 0) 100%);
  mask-repeat: no-repeat;
  mask-size: 100%;
}

.l-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
</style>
