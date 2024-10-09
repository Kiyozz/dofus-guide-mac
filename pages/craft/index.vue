<script setup lang="ts">
import Loader from '~/components/Loader.vue'

const crafts = ref([])
const loading = ref(true)
const searchBar = ref('')
const limit = ref(10)
const skip = ref(0)

const minItemsToKeep = 20 // Nombre minimum d'éléments à garder dans la liste

const selectedCraft = ref([])

const fetchData = async () => {
  const where = []
  if (searchBar.value) {
    where.push(`name=${searchBar.value}`)
  }
  where.push(`limit=${limit.value}`)
  where.push(`skip=${skip.value}`)
  return await $fetch(`https://dofusguide.fr/api/equipments?${where.join('&')}`)
}

const infiniteScroll = async () => {
  if (loading.value) return
  skip.value += limit.value
  const data = await fetchData()
  if (data && data.length > 0) {
    crafts.value = [...crafts.value, ...data]
  }
}

const handleScroll = () => {
  const scrollInfinite = document.getElementById('scrollInfinite')
  if (scrollInfinite) {
    const bottomReached = scrollInfinite.scrollTop + scrollInfinite.clientHeight >= scrollInfinite.scrollHeight - 50
    if (bottomReached && !loading.value) {
      infiniteScroll()
    }

    // Détection du scroll vers le haut
    const topReached = scrollInfinite.scrollTop === 0
    console.log(scrollInfinite.scrollTop)
    if (topReached && crafts.value.length > minItemsToKeep) {
      unloadOldItems()
    }
  }
}

const unloadOldItems = async () => {
  if (loading.value) return
  skip.value = 0
  const data = await fetchData()
  if (data && data.length > 0) {
    crafts.value = data
  }
}

onMounted(async () => {
  crafts.value = await $fetch('https://dofusguide.fr/api/equipments?limit=10')
  loading.value = false

  const scrollInfinite = document.getElementById('scrollInfinite')
  if (scrollInfinite) {
    scrollInfinite.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  const scrollInfinite = document.getElementById('scrollInfinite')
  if (scrollInfinite) {
    scrollInfinite.removeEventListener('scroll', handleScroll)
  }
})

watch([searchBar], async () => {
  if (searchBar.value !== '') {
    crafts.value = await fetchData()
  } else {
    await unloadOldItems()
  }
})

const truncateName = (name, length) => {
  if (name.length > length) {
    return `${name.substring(0, length)}...`
  }
  return name
}

const addCraft = (c, solo) => {
  if (solo) {
    selectedCraft.value = [c]
    return
  }
  const index = selectedCraft.value.findIndex((craft) => craft.id === c.id)
  if (index === -1) {
    selectedCraft.value.push({ ...c, qte: 1 })
  } else {
    selectedCraft.value[index].qte += 1
  }
}

const removeCraft = (c) => {
  const index = selectedCraft.value.findIndex((craft) => craft.id === c.id)
  if (index !== -1) {
    selectedCraft.value = selectedCraft.value.filter((craft) => craft.id !== c.id)
  }
}

const launch = (c = null) => {
  if (c) {
    selectedCraft.value = [c]
  }
  window.localStorage.setItem('crafts', JSON.stringify(selectedCraft.value))
  window.electronAPI.openModal(300, 1, 100, 'craft/todo')
}
</script>

<template>
  <div>
    <input v-model="searchBar" type="text" class="mt-7 rounded-full py-2 px-4" placeholder="Rechercher un item" />
    <div class="flex gap-2">
      <Container class="w-2/3 overflow-auto overflow-x-hidden h-[80vh] w-full" id="scrollInfinite">
        <div v-if="!loading" class="grid grid-cols-2 gap-2">
          <div v-for="c in crafts" :key="c.id" class="px-4 py-2 bg-gray-900 rounded shadow-2xl cursor-default">
            <div class="flex items-center gap-6">
              <div>
                <img :src="c.picture" class="w-[62px]" />
              </div>
              <div class="flex flex-col gap-2">
                <div>
                  <h2 class="font-semibold">{{ truncateName(c.name, 20) }}</h2>
                </div>
                <div>
                  <span class="text-[#00FA4C] text-sm">Lvl : {{ c.level }}</span>
                </div>
              </div>
            </div>
            <hr class="my-4 stroke-1 opacity-60" />
            <div class="flex flex-col gap-2 mb-4">
              <div v-for="item in c.items" :key="item.id" class="flex gap-2">
                <div>
                  <img :src="item.picture" class="w-[20px]" alt="" />
                </div>
                <div class="my-auto">{{ item.qte }} x {{ item.name }}</div>
              </div>
            </div>
            <div class="flex gap-2 mb-auto">
              <btn color="primary" class="w-full" label="Lancer" variant="soft" @click="launch(c)" />
              <btn color="primary" class="w-full" label="Ajouter" variant="soft" @click="addCraft(c, false)" />
            </div>
          </div>
        </div>
        <Loader v-else />
      </Container>
      <div class="w-1/3 flex flex-col gap-2">
        <Container class="min-h-64 max-h-[81vh]">
          <div class="flex flex-col gap-2">
            <div v-for="craft in selectedCraft" :key="craft.id" class="bg-[#171717] rounded-lg p-1 grid grid-cols-5 justify-between items-center">
              <div class="w-[40px]">
                <img :src="craft.picture" />
              </div>
              <div class="col-span-2">
                <p class="whitespace-nowrap">{{ truncateName(craft.name, 10) }}</p>
              </div>
              <div class="ms-auto text-green-500">{{ craft.qte }}</div>
              <div class="ms-auto">
                <!-- Delete -->
                <btn color="danger" icon="/img/svg/close.svg" icon-only variant="outline" @click="removeCraft(craft)" />
              </div>
            </div>
          </div>
        </Container>
        <btn color="primary" class="w-full" label="Lancer" @click="launch()" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
