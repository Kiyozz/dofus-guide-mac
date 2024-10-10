<script setup lang="ts">


defineProps({
  s: Object
})

const convertTag = (html) => {
  // Find tag like <fc=255,255,255> </fc=255,255,255> and replace it with <span style="color: rgba(255,255,255)"> </span>
  const regex = /<fc=(.*?)>(.*?)<\/fc=(.*?)>/g
  return html.replace(regex, (match, p1, p2, p3) => {
    return `<span style="color: rgba(${p1})">${p2}</span>`
  })
}

</script>

<template>
  <div v-html="convertTag(s.valeur)" :style="`font-size: ${s.font.size}px`"></div>
</template>

<style scoped>

</style>