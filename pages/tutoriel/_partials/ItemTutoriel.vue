<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Cac from '~/pages/tutoriel/_partials/Cac.vue'

// Props
const props = defineProps({
  s: Object,
  userId: Number,
  guideId: Number,
  withoutDb: Boolean
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
</script>

<template>
  <div class="flex gap-2">
    <img :src="s.valeur.image" class="my-auto" style="height: 25px; width: 25px" />
    <Cac :cac-id="s.id" :user-id="userId" :guide-id="guideId" :without-db="withoutDb" />
    <div class="flex gap-2">
      <span style="font-size: 15px">{{ s.valeur.qte }}x</span>
      <span ref="textElement" class="text-nowrap" style="font-size: 15px">
        {{ truncatedText || s.valeur.name }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
