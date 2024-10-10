<script setup lang="ts">
import moment from 'moment/moment' // Importation explicite de la locale française
moment.locales() // Réapplique la locale après fetch
const today = moment().format('YYYY-MM-DD')

const almanax = ref([])
const getAlmanax = async () => {
  const res = await fetch(`https://dofusguide.fr/api/almanax?after_at=${today}`)
  const data = await res.json()
  almanax.value = data
}

const formatFrench = (text: string) => {
  const day = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  }
  const month = {
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    may: 'Mai',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre'
  }

  return text
    .replace(/monday|tuesday|wednesday|thursday|friday|saturday|sunday/gi, (matched) => day[matched.toLowerCase()])
    .replace(/january|february|march|april|may|june|july|august|september|october|november|december/gi, (matched) => month[matched.toLowerCase()])
}

const getFormat = (date: string) => {
  return formatFrench(moment(date).format('dddd D MMMM'))
}

onMounted(() => {
  getAlmanax()
})
</script>

<template>
  <Container class="max-h-[88vh]" :no-bg="true">
    <div class="grid grid-cols-3 gap-2 -mt-4">
      <container v-for="a in almanax" :key="a.id">
        <div class="flex bg-[#171717] -m-4 py-2 justify-center gap-2">
          <div>{{ getFormat(a.date) }}</div>
        </div>
        <div class="flex mt-7 gap-2">
          <img :src="a.item_image" class="w-[48px] h-[48px]" />
          <div class="flex flex-col gap-4">
            <div>{{ a.qte }} x {{ a.item_name }}</div>
            <div class="font-semibold">Bonus: {{ a.name }}</div>
            <div v-html="a.description"></div>
          </div>
        </div>
      </container>
    </div>
  </Container>
</template>

<style scoped></style>
