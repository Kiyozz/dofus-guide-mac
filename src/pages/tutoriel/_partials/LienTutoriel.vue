<script setup lang="ts">
const props = defineProps({
  s: Object
})


function formatColor(c) {
  const color = c.split('|')
  return `rgba(${color[0]}, ${color[1]}, ${color[2]})`
}

const color = formatColor(props.s.font.color)

</script>

<template>
  <a :style="`color: ${color}; font-size: 15px`" :href="s.valeur.link" target="_blank">{{ s.valeur.label }}</a>
</template>

<style scoped>

</style>