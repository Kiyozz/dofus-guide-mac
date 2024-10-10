<script setup lang="ts">

const props = defineProps({
  mapLabel: String,
  mapLink: String,
  map: String,
})
//copy on clipboard the map link
const copyMap = () => {
  let travelCmd = `/travel ${props.mapLabel}`
  travelCmd = travelCmd.replace('[', '')
  travelCmd = travelCmd.replace(']', '')
  navigator.clipboard.writeText(travelCmd).then(() => {
    console.log('copyText: ', travelCmd)
  });
}

</script>

<template>
  <span style="font-size: 15px;color: #9d4870" @click="copyMap()" class="cursor-pointer">{{ mapLabel }}</span>
</template>

<style scoped>

</style>