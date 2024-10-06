<script setup lang="ts"></script>

const copy = () => { const codePromo = document.getElementById('codePromo') if (codePromo) { navigator.clipboard.writeText(codePromo.innerText) } }
const isActive = ''
<template>
  <div class="flex justify-between mt-7">
    <div class="flex flex-col gap-[8px]">
      <div>Code Promo</div>
      <div id="codePromo" class="bg-[#171717] border-2 border-[#00FA4C] rounded-md px-16 py-3 cursor-pointer active:bg-[#00FA4C]" @click="copy()"> ONESTLESGOAT2024 </div>
      <btn label="Nous soutenir" color="primary" size="lg" />
    </div>
    <div class="flex flex-col">
      <div class="bg-blur">
        <button :class=""></button>
        <button :class=""></button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
