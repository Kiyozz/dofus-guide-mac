<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Cac from '~/pages/tutoriel/_partials/Cac.vue'
import TravelTutoriel from '~/pages/tutoriel/_partials/TravelTutoriel.vue'

// Props
const props = defineProps({
  s: Object,
  userId: Number,
  guideId: Number,
  typeQuest: String
})

// Référence à l'élément contenant le texte
const textElement = ref<HTMLElement | null>(null)

// Texte coupé
const truncatedText = ref<string | null>(null)

// Fonction pour vérifier si le texte dépasse 100px
const checkTextWidth = () => {
  const element = textElement.value
  if (element) {
    const textWidth = element.offsetWidth
    if (textWidth > 100) {
      truncatedText.value = truncateWithEllipsis(props.s?.valeur.name, 20) // Troncature
    } else {
      truncatedText.value = props.s?.valeur.name // Aucun changement
    }
  }
}

// Fonction pour tronquer le texte avec "..."
const truncateWithEllipsis = (text: string, maxLength: number) => {
  let truncated = text
  if (text.length > maxLength) {
    truncated = text.substring(0, maxLength) + '...'
  }
  return truncated
}

// Vérification lors du montage et de tout changement de la prop `s`
onMounted(() => {
  checkTextWidth()
})

watch(
  () => props.s?.valeur.name,
  () => {
    checkTextWidth()
  }
)
const getColor = () => {
  if (props.typeQuest === 'QUEST_START') {
    return '#888deb'
  } else if (props.typeQuest === 'TDM') {
    return '#88b8ba'
  } else {
    return '#93cb32'
  }
}
</script>

<template>
  <div class="flex" style="gap: 5px">
    <img src="/img/icon/menu_quests.png" class="my-auto" style="height: 25px; width: 25px" />
    <Cac :cac-id="s?.valeur.id" :user-id="userId" :guide-id="guideId" />
    <div class="flex flex-col ms-[5px]" style="gap: 0.2px">
      <span ref="textElement" class="text-nowrap" :style="`color: ${getColor()}; font-size: 15px`">
        {{ typeQuest === 'QUEST_FINISH' ? 'Finir : ' : '' }}
        {{ truncatedText || s?.valeur.name }}
      </span>
      <div class="flex gap-2">
        <a style="font-size: 15px; color: #18728a" :href="s.valeur.link" target="_blank">{{ s?.valeur.name_pnj }}</a>
        <TravelTutoriel :map-label="s?.valeur.position_start.position" :map-link="s?.valeur.position_start.cmd" :map="s?.valeur.position_start.map" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
