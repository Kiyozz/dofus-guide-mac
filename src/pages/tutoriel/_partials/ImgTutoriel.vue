<script setup lang="ts">
defineProps({
  s: Object
})
</script>

<template>
  <img :src="s.valeur" alt=""/>
</template>

<style scoped>

</style>