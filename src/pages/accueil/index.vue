<script setup lang="ts">
const copy = () => {
  const codePromo = document.getElementById('codePromo')
  if (codePromo) {
    navigator.clipboard.writeText(codePromo.innerText)
  }
}
const isActive = ref('actu')

const getClass = (name: string) => {
  if (name === isActive.value) return 'underline underline-offset-8'
  return ''
}
</script>
<template>
  <div class="flex justify-between mt-7">
    <div class="flex flex-col gap-[8px]">
      <div>Code Promo</div>
      <div id="codePromo" class="bg-[#171717] border-2 border-[#00FA4C] rounded-md px-16 py-3 cursor-pointer active:bg-[#00FA4C] text-white" @click="copy()"> ONESTLESGOAT2024 </div>
      <btn label="Nous soutenir" color="primary" size="lg" />
    </div>
    <div class="flex flex-col">
      <div class="bg-blur">
        <div class="flex gap-2">
          <button class="text-white" :class="getClass('actu')" @click="isActive = 'actu'">Actualité</button>
          <button class="text-white" :class="getClass('devlog')" @click="isActive = 'devlog'">Devlog</button>
        </div>
        <div v-if="isActive == 'actu'">
          <h4>Actualité</h4>
        </div>
        <div v-else>
          <h4>Devlog</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
