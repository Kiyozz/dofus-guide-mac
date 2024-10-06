<script setup lang="ts">
useElectron()
const props = defineProps<{
  guideId: number
}>()
const isModalOpen = ref(false)
const formPseudo = ref('')
const formGender = ref(false)
const users = ref([])
const classes = await $fetch('https://dofusguide.fr/api/players')
const classeForm = ref('')
const closeModal = () => {
  isModalOpen.value = false
}
const getGender = computed(() => (formGender.value ? 'Féminin' : 'Masculin'))
onMounted(async () => {
  const response = await window.electronAPI.prismaOperation('player', 'findMany', { where: { guideId: props.guideId } })
  if (response.success) {
    users.value = response.data
  }
})
watch(
  () => props.guideId,
  async () => {
    const response = await window.electronAPI.prismaOperation('player', 'findMany', { where: { guideId: props.guideId } })
    if (response.success) {
      users.value = response.data
      closeModal()
    }
  }
)

const submitPerso = async () => {
  const response = await window.electronAPI.prismaOperation('player', 'create', {
    data: {
      guideId: props.guideId,
      name: formPseudo.value,
      gender: formGender.value ? 'female' : 'male',
      classe: classeForm.value,
      lastEtape: 1
    }
  })
  if (response.success) {
    users.value.push(response.data)
  }
}
const deletePerso = async (id) => {
  const response = await window.electronAPI.prismaOperation('player', 'delete', { where: { id } })
  if (response.success) {
    users.value = users.value.filter((user) => user.id !== id)
  }
}
const lancerLeGuide = (guideId, userId, lastEtape) => {
  window.localStorage.setItem('guideId', guideId)
  window.localStorage.setItem('userId', userId)
  window.localStorage.setItem('lastEtape', lastEtape)
  window.electronAPI.openModal()
}
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex">
      <button class="px-3 py-2 bg-green-500 text-gray-200 rounded-full my-3 w-1/5 hover:bg-green-800" @click="isModalOpen = true">Ajouter </button>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-400">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          <th scope="row" class="px-[6%] py-[0.4%]">Classe</th>
          <th scope="row" class="px-[6%] py-[0.4%]">Pseudo</th>
          <th scope="row" class="px-[6%] py-[0.4%]"></th>
        </tr>
      </thead>
      <tbody>
        <tr :class="'border-b bg-gray-800 border-gray-700 cursor-pointer bg-gray-800'" v-for="user in users">
          <td class="px-[6%] py-[0.5%}">
            <img :src="classes.find((classe) => classe.id == user.classe)?.['image_' + user.gender]" class="w-20" alt="" />
          </td>
          <td class="px-[6%] py-[0.5%]">{{ user.name }}</td>
          <td class="px-[6%] py-[0.5%] text-end">
            <button
              class="px-3 py-2 bg-green-500 text-gray-200 rounded-r-none rounded-l-full my-3 hover:bg-green-800"
              @click="lancerLeGuide(user.guideId, user.id, user.lastEtape)"
            >
              Lancer le guide
            </button>
            <button class="px-3 py-2 bg-red-500 text-gray-200 rounded-full my-3 rounded-r-full rounded-l-none hover:bg-red-800" @click="deletePerso(user.id)">Supprimer </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    Créer un personnage
    <input
      type="text"
      placeholder="Pseudo"
      class="w-full px-3 py-2 bg-gray-800 text-gray-200 rounded-full my-3"
      :value="formPseudo"
      @input="(event) => (formPseudo = event.target.value)"
    />
    <div class="flex flex-wrap gap-1.5 justify-center">
      <button
        v-for="classe in classes"
        :class="'' + (classeForm == classe.id ? 'bg-green-500' : 'bg-gray-800') + ' px-3 py-2 text-gray-200 rounded-md w-1/6 hover:bg-green-800'"
        @click="classeForm = classe.id"
      >
        <img :src="classe.icon" alt="" />
      </button>
    </div>
    <label class="inline-flex items-center mb-5 cursor-pointer">
      <input type="checkbox" class="sr-only peer" @click="formGender = !formGender" />
      <div
        class="relative w-9 h-5 bg-sky-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"
      ></div>
      <span class="ms-3 text-sm font-medium text-gray-200">{{ getGender }}</span>
    </label>
    <button class="px-3 py-2 bg-green-500 text-gray-200 rounded-full my-3 w-full hover:bg-green-800" @click="submitPerso()">Ajouter </button>
  </Modal>
</template>

<style scoped></style>
