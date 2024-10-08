<script setup lang="ts">
import Container from '~/components/Container.vue'
import Loader from '~/components/Loader.vue'
import Guide from '~/pages/guides/_partials/guide.vue'
import Perso from '~/pages/guides/_partials/perso.vue'

const tutorials = ref([])
const loading = ref(false)
const selectedGuide = ref(0)
const selectedPerso = ref(0)
const users = ref([])
const isModalOpen = ref(false)
const createPerso = reactive({
  pseudo: '',
  gender: false,
  classeId: 0
})

const topGuide = ref(300)
const leftGuide = ref(1)
const opacityGuide = ref(100)
const classes = await $fetch('https://dofusguide.fr/api/players')
const getGender = computed(() => (createPerso.gender ? 'Féminin' : 'Masculin'))

onMounted(async () => {
  loading.value = true
  tutorials.value = await $fetch('https://dofusguide.fr/api/tutoriel/name?dev')
  loading.value = false
})
const updatedGuide = async (id) => {
  selectedGuide.value = id
  const response = await window.electronAPI.prismaOperation('player', 'findMany', { where: { guideId: id } })
  if (response.success) {
    users.value = response.data
  }
}
const deletePerso = async (id: number) => {
  const response = await window.electronAPI.prismaOperation('player', 'delete', { where: { id } })
  if (response.success) {
    if (selectedPerso.value === id) {
      selectedPerso.value = 0
    }
    users.value = users.value.filter((user) => user.id !== id)
  }
}

const closeModal = () => {
  isModalOpen.value = false
}
const openModal = () => {
  isModalOpen.value = true
}

const submitPerso = async () => {
  const response = await window.electronAPI.prismaOperation('player', 'create', {
    data: {
      pseudo: createPerso.pseudo,
      guideId: selectedGuide.value,
      classe: createPerso.classeId,
      gender: createPerso.gender ? 'female' : 'male',
      lastEtape: 1
    }
  })
  if (response.success) {
    users.value.push(response.data)
  }
  closeModal()
}

const openGuide = () => {
  const user = users.value.find((user) => user.id === selectedPerso.value)
  window.localStorage.setItem('guideId', selectedGuide.value)
  window.localStorage.setItem('userId', selectedPerso.value)
  window.localStorage.setItem('lastEtape', user.lastEtape)
  window.electronAPI.openModal(topGuide.value, leftGuide.value, opacityGuide.value / 100)
}
</script>

<template>
  <div v-if="!loading">
    <Container class="w-full">
      <div class="flex flex-col gap-[4px]">
        <Guide v-for="tuto in tutorials" :key="tuto.id" :tuto="tuto" :selected-guide="selectedGuide" :on-click-btn="openModal" @click="updatedGuide(tuto.id)" />
      </div>
    </Container>
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col gap-8">
        <Container>
          <div class="flex gap-8">
            <span>Classe</span>
            <span>Pseudo</span>
          </div>
          <div class="relative overflow-x-auto flex flex-col gap-4">
            <perso v-for="user in users" :key="user.id" :on-delete="deletePerso" :user="user" :selected-perso="selectedPerso" @click="selectedPerso = user.id"></perso>
          </div>
        </Container>
        <btn color="primary" label="Lancer le guide" class="" :disabled="selectedPerso == 0" @click="openGuide()" />
      </div>
      <Container>
        <div class="flex flex-col gap-0">
          <div class="flex gap-2 items-center">
            <label for="topGuide">Top</label>
            <input type="number" v-model="topGuide" id="topGuide" class="w-full px-1.5 py-1 bg-gray-800 text-gray-200 rounded-full my-2" />
          </div>
          <div class="flex gap-2 items-center">
            <label for="leftGuide">Left</label>
            <input type="number" v-model="leftGuide" id="leftGuide" class="w-full px-1.5 py-1 bg-gray-800 text-gray-200 rounded-full my-2" />
          </div>
          <!--
          <div class="flex gap-2 items-center">
            <label for="opacityGuide">Opacity</label>
            <input type="number" v-model="opacityGuide" id="opacityGuide" class="w-full px-1.5 py-1 bg-gray-800 text-gray-200 rounded-full my-2" />
          </div>-->
        </div>
      </Container>
    </div>
    <Modal :is-open="isModalOpen" @close="closeModal">
      Créer un personnage
      <input
        type="text"
        placeholder="Pseudo"
        class="w-full px-3 py-2 bg-gray-800 text-gray-200 rounded-full my-3"
        :value="createPerso.pseudo"
        @input="(event) => (createPerso.pseudo = event.target.value)"
      />
      <div class="flex flex-wrap gap-1.5 justify-center">
        <btn
          v-for="classe in classes"
          :key="classe.id"
          size="lg"
          icon-only
          :icon="classe.icon"
          :color="createPerso.classeId === classe.id ? 'primary' : 'secondary'"
          @click="createPerso.classeId = classe.id"
        />
      </div>
      <label class="inline-flex items-center mb-5 cursor-pointer">
        <input type="checkbox" class="sr-only peer" @click="createPerso.gender = !formGender" />
        <div
          class="relative w-9 h-5 bg-sky-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"
        />
        <span class="ms-3 text-sm font-medium text-gray-200">{{ getGender }}</span>
      </label>
      <button class="px-3 py-2 bg-green-500 text-gray-200 rounded-full my-3 w-full hover:bg-green-800" @click="submitPerso()">Ajouter </button>
      <button class="px-3 py-2 bg-red-500 text-gray-200 rounded-full my-3 w-full hover:bg-red-800" @click="closeModal()">Annuler </button>
    </Modal>
  </div>
  <Loader v-else />
</template>
