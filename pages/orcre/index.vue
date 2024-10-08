<script setup lang="ts">
import Monster from '~/pages/orcre/_partials/monster.vue'

const ocres = ref([])
const loading = ref(false)
const etape = ref(1)
const etapeMax = ref(35)
const search = ref('')
onMounted(async () => {
  loading.value = true
  ocres.value = await $fetch('https://dofusguide.fr/api/ocre?etape=' + etape.value)
  loading.value = false
})

watch([etape, search], async () => {
  loading.value = true

  loading.value = true
  console.log('search:' + search.value)
  if (search.value === '') {
    ocres.value = await $fetch('https://dofusguide.fr/api/ocre?etape=' + etape.value)
    loading.value = false
    return
  }
  ocres.value = await $fetch('https://dofusguide.fr/api/ocre?name=' + search.value)
  loading.value = false
})
</script>

<template>
  <div class="mt-6 flex flex-col">
    <div class="flex justify-between">
      <div class="rounded-s rounded-e py-2 px-4 ring-1 ring-white flex gap-32 bg-[#171717]">
        <input v-model="search" type="text" class="bg-[#171717] active:border-none focus-visible:ring-0" placeholder="Rechercher un monstre" />
      </div>
      <select v-model="etape">
        <option v-for="i in etapeMax" :value="i" :key="i">{{ i }}</option>
      </select>
    </div>
    <Container>
      <div v-if="loading" class="flex justify-center items-center h-96">
        <Loader />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-[77vh]">
        <monster v-for="ocre in ocres" :key="ocre.id" :ocre="ocre" />
      </div>
    </Container>
  </div>
</template>

<style scoped></style>
