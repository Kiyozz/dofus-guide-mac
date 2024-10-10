<script setup lang="ts">
import Container from '~/components/Container.vue'
import Cac from '~/pages/tutoriel/_partials/Cac.vue'

const dungeons = ref([])
const dungeonsUrl = 'https://dofusguide.fr/api/dungeons'
const dungeonsCat = ref(1)
dungeons.value = await $fetch(dungeonsUrl)
const loading = ref(false)
const filteredDungeons = ref([])
filteredDungeons.value = dungeons.value
const searchDungeons = ref('')
watch(dungeonsCat, async () => {
  loading.value = true
  filteredDungeons.value = await $fetch(`${dungeonsUrl}?cat=${dungeonsCat.value}`)
  loading.value = false
})
watch(searchDungeons, () => {
  filteredDungeons.value = dungeons.value.filter((d) => d.nom.toLowerCase().includes(searchDungeons.value.toLowerCase()))
})
</script>

<template>
  <Container v-if="!loading" class="overflow-auto max-h-[87vh]">
    <div class="sticky top-0 bg-[#2b2b3b] py-3 px-4 rounded-full">
      <div class="flex justify-between">
        <div class="">
          <input v-model="searchDungeons" type="text" class="w-full p-2 rounded-full" placeholder="Rechercher un donjon" />
        </div>
        <div class="flex">
          <button class="px-2 rounded-l-full text-white hover:bg-green-500" :class="dungeonsCat == 1 ? 'bg-green-500' : 'bg-[#3b3b3b]'" @click="dungeonsCat = 1">1 - 50 </button>
          <button class="px-2 rounded-none bg-[#3b3b3b] text-white hover:bg-green-500" :class="dungeonsCat == 2 ? 'bg-green-500' : 'bg-[#3b3b3b]'" @click="dungeonsCat = 2">
            51 - 100
          </button>
          <button class="px-2 rounded-none bg-[#3b3b3b] text-white hover:bg-green-500" :class="dungeonsCat == 3 ? 'bg-green-500' : 'bg-[#3b3b3b]'" @click="dungeonsCat = 3"
            >101 - 150
          </button>
          <button class="px-2 rounded-none bg-[#3b3b3b] text-white hover:bg-green-500" :class="dungeonsCat == 4 ? 'bg-green-500' : 'bg-[#3b3b3b]'" @click="dungeonsCat = 4"
            >151 - 199
          </button>
          <button class="px-2 rounded-none bg-[#3b3b3b] text-white hover:bg-green-500" :class="dungeonsCat == 5 ? 'bg-green-500' : 'bg-[#3b3b3b]'" @click="dungeonsCat = 5"
            >200 p1
          </button>
          <button class="px-2 rounded-r-full bg-[#3b3b3b] text-white hover:bg-green-500" :class="dungeonsCat == 6 ? 'bg-green-500' : 'bg-[#3b3b3b]'" @click="dungeonsCat = 6"
            >200 p2
          </button>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <div v-for="d in filteredDungeons" :key="d.id" class="w-full">
        <div class="text-3xl">{{ d.nom }}</div>
        <div>
          <svg class="h-1 w-[90%]">
            <line x1="0" y1="0" x2="100%" y2="" style="stroke: #777575; stroke-width: 10" />
          </svg>
        </div>
        <div class="flex justify-between mt-2">
          <div class="flex flex-col gap-4">
            <div v-for="s in d.success" :key="s.id" class="flex gap-2">
              <Cac :cac-id="s.id" :user-id="0" :guide-id="99" />
              <div class="flex flex-col gap-1">
                <div class="text-2xl text-[#eb762d]">{{ s.nom }}</div>
                <div class="text-lg">{{ s.description }}</div>
              </div>
            </div>
          </div>
          <div>
            <img :src="d.image" class="w-32 h-auto" alt="d.nom" />
          </div>
        </div>
        <div class="flex mt-3">
          <img src="/img/icon/menu_quests.png" alt="quests" class="h-12" />
          <div class="my-auto">
            <svg class="h-1 w-[67vw]">
              <line x1="0" y1="0" x2="100%" y2="" style="stroke: #777575; stroke-width: 10" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col ms-4">
          <div v-for="q in d.quest" :key="q.id" class="flex">
            <img src="/img/icon/menu_quests.png" alt="quests" class="h-8" />
            <a class="text-2xl text-[#93cb32]" :href="q.lien" target="_blank">{{ q.nom }}</a>
          </div>
        </div>
      </div>
    </div>
  </Container>
  <div v-else>
    <div class="flex justify-center items-center h-[50vh]">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  </div>
</template>

<style scoped></style>
