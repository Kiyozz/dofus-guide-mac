<script setup lang="ts">
definePageMeta({
  layout: 'tutorial'
})

const base_url = 'https://magem.fr/images/IMG_ROUTE/'
const extension = '.png'
const route = useRoute()
const id = ref(route.params.id)
const index = ref(1)
const imageValid = ref(null) // Nouvelle variable pour stocker la validité de l'image

watch(route.params.id, () => {
  id.value = route.params.id
  checkImage() // Vérification de l'image lors du changement d'ID
})

// URL calculée
const url = computed(() => {
  return `${base_url}${id.value}_${index.value}${extension}`
})

// Fonction pour vérifier si l'image est valide
const checkImage = () => {
  const img = new Image()
  img.onload = () => {
    imageValid.value = true
  }
  img.onerror = () => {
    imageValid.value = false
    console.error('Image not found', url.value)
  }
  img.src = url.value
}

// Fonction pour changer l'index
const updateStep = (operator: string) => {
  if (operator === '+') {
    index.value++
  } else {
    if (index.value === 1) return
    index.value--
  }
  checkImage() // Vérifier l'image à chaque changement d'index
}

// Initialiser la vérification de l'image
checkImage()

</script>

<template>
  <div class="overflow-x-hidden flex flex-col items-center justify-center">
    <div class="py-1.5 px-3 align-middle gap-2 bg-gray-900 rounded-full mx-auto">
      <div class="flex gap-2">
        <img src="/img/icon/suivant.png" alt="" @click="updateStep('-')" class="h-[25px] w-auto cursor-pointer" />
        <input id="currentStepEdit" v-model="index" class="text-2xl -my-1 bg-gray-900 text-white w-12 text-center" />
        <img src="/img/icon/precedent.png" alt="" @click="updateStep('+')" class="h-[25px] cursor-pointer" />
      </div>
    </div>

    <!-- Vérification de la validité de l'image -->
    <div v-if="imageValid === false" class="text-red-500 text-lg">Aucun route trouver</div>
    <img v-else :src="url" class="img-cover" alt="img" />
  </div>
</template>

<style scoped>
.img-cover {
  width: 100vw;
  height: 92vh;
  object-fit: cover;
}
</style>
