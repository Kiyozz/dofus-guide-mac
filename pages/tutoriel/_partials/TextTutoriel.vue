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
  <span :style="`color: ${color};font-size: ${s.font.size}px`">{{ s.valeur }}</span>
</template>

<style scoped>

</style>