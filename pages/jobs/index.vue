<script setup lang="ts">
const jobs = [
  {
    id: 1,
    title: 'Mineur',
    image: '/img/jobs/mineur.png'
  },
  {
    id: 2,
    title: 'Bûcheron',
    image: '/img/jobs/bucheron.png'
  },
  {
    id: 3,
    title: 'Pêcheur',
    image: '/img/jobs/pecheur.png'
  },
  {
    id: 4,
    title: 'Paysan',
    image: '/img/jobs/paysan.png'
  },
  {
    id: 5,
    title: 'Alchimiste',
    image: '/img/jobs/alchimiste.png'
  }
]
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <container v-for="job in jobs" :key="job.id">
      <div class="flex">
        <img :src="job.image" class="bg-[#171717] w-[40px]" />
      </div>
    </container>
  </div>
</template>

<style scoped></style>
