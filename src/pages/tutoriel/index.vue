<script setup lang="ts">
import ImgTutoriel from '~/pages/tutoriel/_partials/ImgTutoriel.vue'
import TextTutoriel from '~/pages/tutoriel/_partials/TextTutoriel.vue'
import QuestTutoriel from '~/pages/tutoriel/_partials/QuestTutoriel.vue'
import ItemTutoriel from '~/pages/tutoriel/_partials/ItemTutoriel.vue'
import HtmlTutorial from '~/pages/tutoriel/_partials/HtmlTutorial.vue'
import DungeonTutoriel from '~/pages/tutoriel/_partials/DungeonTutoriel.vue'
import TravelTutoriel from '~/pages/tutoriel/_partials/TravelTutoriel.vue'
import SuccessTutoriel from '~/pages/tutoriel/_partials/SuccessTutoriel.vue'
import Cac from '~/pages/tutoriel/_partials/Cac.vue'
import LienTutoriel from '~/pages/tutoriel/_partials/LienTutoriel.vue'

definePageMeta({
  layout: 'tutorial'
})
const guideId = ref(0)
const userId = ref(0)
const currentStep = ref(1)
const steps = ref([])

guideId.value = Number(localStorage.getItem('guideId'))
userId.value = Number(localStorage.getItem('userId'))
currentStep.value = Number(localStorage.getItem('lastEtape'))

const fetchData = async () => {
  const response = await $fetch(`https://dofusguide.fr/api/tutoriel?id=${guideId.value}&etape=${currentStep.value}`)
  steps.value = response
}

watch([guideId, currentStep], () => {
  fetchData()
})

const updateStep = async (op) => {
  steps.value = []
  if (op === '+') {
    currentStep.value++
  } else {
    if (currentStep.value > 1) currentStep.value--
  }
  await $fetch('/api/users/updateEtape', {
    method: 'POST',
    body: JSON.stringify({
      userId: userId.value,
      guideId: guideId.value,
      lastEtape: currentStep.value
    })
  })
  await fetchData()
}

function heigthAndWidth(pos) {
  let css = ''
  if (pos.hauteur > 0) {
    css += `height: ${pos.hauteur}px;`
  }
  if (pos.largeur > 0) {
    css += `width: ${pos.largeur}px;`
  }
  return css
}

fetchData()
</script>
<template>
  <div class="h-[100vh] w-[100vw] bg-[#191d1f] text-gray-200">
    <div class="py-1.5 px-3 align-middle gap-2 bg-gray-900 rounded-full mx-auto">
      <div class="flex gap-2">
        <img src="/img/icon/suivant.png" alt="" @click="updateStep('-')" class="h-[25px] w-auto cursor-pointer" />
        <input class="text-2xl -my-1 bg-gray-900 text-white w-12 text-center" id="currentStepEdit" v-model="currentStep" />
        <img src="/img/icon/precedent.png" alt="" @click="updateStep('+')" class="h-[25px] cursor-pointer" />
      </div>
    </div>
    <div class="absolute -mt-7" :style="`top: ${s.pos.pos_y}px;left: ${s.pos.pos_x}px;${heigthAndWidth(s.pos)}`" v-for="s in steps">
      <ImgTutoriel v-if="s?.type == 'IMAGE'" :s="s" />
      <TextTutoriel v-else-if="s?.type == 'TEXTE'" :s="s" />
      <QuestTutoriel v-else-if="['QUEST_START', 'QUEST', 'QUEST_FINISH'].includes(s?.type)" :s="s" :user-id="userId" :guide-id="guideId" :type-quest="s.valeur.type" />
      <ItemTutoriel v-else-if="s?.type == 'ITEMS'" :s="s" :user-id="userId" :guide-id="guideId" />
      <HtmlTutorial v-else-if="s?.type == 'HTML'" :s="s" />
      <DungeonTutoriel v-else-if="s?.type == 'DUNGEON'" :s="s" :player-id="userId" :guide-id="guideId" />
      <TravelTutoriel v-else-if="s?.type == 'TRAVEL'" :map-label="s?.valeur.label" :map-link="s?.valeur.link" :map="s?.valeur.map" />
      <SuccessTutoriel v-else-if="s?.type == 'MONSTER'" :success="s?.valeur" />
      <Cac v-else-if="s?.type == 'CAC'" :cac-id="s?.valeur" :guide-id="guideId" :user-id="userId" />
      <LienTutoriel v-else-if="s?.type == 'LIEN'" :s="s" />
    </div>
  </div>
</template>

<style scoped></style>
