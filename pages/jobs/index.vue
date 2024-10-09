<script setup lang="ts">
const jobs = await $fetch('https://dofusguide.fr/api/jobs')

const truncate = (text: string, length: number) => {
  if (text.toLowerCase().includes('bois')) {
    text = text.replace('Bois de', '')
    text = text.replace('Bois d\'', '')
  }
  if (text.length > length) {
    return text.slice(0, length) + '...'
  }
  return text
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
          <div class="flex flex-col items-center cursor-pointer">
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
