<script setup lang="ts">
const jobs = await $fetch('https://dofusguide.fr/api/jobs')

const truncate = (text: string, length: number) => {
  if (text.toLowerCase().includes('bois')) {
    text = text.replaceAll('Bois de', '')
    text = text.replaceAll("Bois d'", '')
  }
  if (text.length > length) {
    return text.slice(0, length) + '...'
  }
  return text
}

const normalize = (text: string) => {
  text = text.replaceAll('é', 'e')
  text = text.replaceAll('è', 'e')
  text = text.replaceAll('ê', 'e')
  text = text.replaceAll('à', 'a')
  text = text.replaceAll('â', 'a')
  text = text.replaceAll('ç', 'c')
  text = text.replaceAll('î', 'i')
  text = text.replaceAll('ô', 'o')
  text = text.replaceAll('û', 'u')
  text = text.replaceAll('ù', 'u')
  return text
}

const openMap = (job: string, skill: string) => {
  let j = normalize(job)
  let s = normalize(skill)
  console.log(s)
  if (s.toLowerCase().includes('bois')) {
    s = s.replaceAll('Bois de', '')
    s = s.replaceAll("Bois d'", '')
  }
  console.log(s)
  j = j.toUpperCase().replaceAll(' ', '')
  s = s.toUpperCase().replaceAll(' ', '')
  if (s.includes('5FEUILLES')) {
    s = s.replaceAll('5FEUILLES', '5FEUILLE')
  }
  s = s.replace("'", '')
  console.log(`jobs/${j}_${s}`)
  window.electronAPI.openJobs(`jobs/${j}_${s}`)
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2 overflow-auto max-h-[80vh]">
    <container v-for="job in jobs" :key="job.id" class="overflow-x-hidden">
      <div class="flex bg-[#171717] -m-4 pl-4 py-2 items-center gap-2">
        <div>
          <img :src="job.image" class="bg-[#171717] w-[40px]" />
        </div>
        <div>{{ job.name }}</div>
      </div>
      <div class="grid grid-cols-10 mt-7">
        <div v-for="s in job.skills">
          <div class="flex flex-col items-center cursor-pointer" @click="openMap(job.name, s.name)">
            <div>
              <img :src="s.image" class="bg-[#171717]/40 w-[40px] p-1 rounded-lg" />
            </div>
            <div class="text-sm">{{ truncate(s.name, 5) }}</div>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<style scoped></style>
