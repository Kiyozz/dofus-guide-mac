<script setup lang="ts">
import Loader from '~/components/Loader.vue'

const crafts = ref([])
const loading = ref(true)
const searchBar = ref('')
const filteredCrafts = computed(() => {
  return crafts.value.filter((c) => c.name.toLowerCase().includes(searchBar.value.toLowerCase()))
})
onMounted(async () => {
  crafts.value = await $fetch('https://dofusguide.fr/api/equipments')
  loading.value = false
})
</script>

<template>
  <Container v-if="!loading" class="overflow-auto h-[70vh] w-full" :with-header="true">
    <input v-model="searchBar" type="text" placeholder="Rechercher un craft" class="w-1/2 p-2 text-gray-400 rounded-full mb-3 top-0 fixed mt-4" />
    <div class="grid grid-cols-3 gap-2 mt-20">
      <div v-for="c in filteredCrafts" :key="c.id" class="px-4 py-2 bg-gray-900 rounded shadow-2xl cursor-default">
        <div class="flex flex-col">
          <div class="flex align-middle">
            <img :src="c.picture" class="w-24" />
            <h2 class="text-2xl font-bold mx-auto my-auto">{{ c.name }}</h2>
          </div>
          <div v-for="item in c.items" :key="item.id" class="flex gap-2">
            <div>
              <img :src="item.picture" class="w-[20px]" alt="" />
            </div>
            <div class="my-auto">{{ item.qte }} x {{ item.name }}</div>
          </div>
          <div class="flex justify-between">
            <div class="my-auto">Niveau : {{ c.level }}</div>
            <div class="flex gap-2">
            <div class="my-auto"><button>Pin</button></div>
            <div class="my-auto"><button class="py-2 px-6 bg-green-500 rounded-full">Ajouter</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
  <Loader v-else />
</template>

<style scoped></style>
