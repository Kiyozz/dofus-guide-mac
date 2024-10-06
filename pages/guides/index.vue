<script setup lang="ts">
import moment from 'moment/moment'
import Container from '~/components/Container.vue'
import SelectPerso from '~/pages/guides/_partials/selectPerso.vue'
import Loader from '~/components/Loader.vue'

const tutorials = ref([])
const loading = ref(false)
const selectedGuide = ref(null)

onMounted(async () => {
  loading.value = true
  tutorials.value = await $fetch('https://dofusguide.fr/api/tutoriel/name?dev')
  loading.value = false
})
</script>

<template>
  <Container v-if="!loading">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="row" class="px-[6%] py-[0.4%]">Titre</th>
            <th scope="row" class="px-[6%] py-[0.4%]">Créateur</th>
            <th scope="row" class="px-[6%] py-[0.4%]">Mise à jour</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b hover:bg-gray-500 border-gray-700 cursor-pointer"
            v-for="tutorial in tutorials"
            @click="selectedGuide = tutorial.id"
            :class="selectedGuide == tutorial.id ? 'bg-gray-700' : 'bg-gray-800'"
          >
            <td class="px-[6%] py-[0.5%]">{{ tutorial.name }}</td>
            <td class="px-[6%] py-[0.5%]">{{ tutorial.autheur }}</td>
            <td class="px-[6%] py-[0.5%]">{{ moment(tutorial.updated_at).format('DD/MM/YYYY HH:mm') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="selectedGuide" class="mt-3">
      <selectPerso :guide-id="selectedGuide" />
    </div>
  </Container>
  <Loader v-else />
</template>

<style scoped></style>