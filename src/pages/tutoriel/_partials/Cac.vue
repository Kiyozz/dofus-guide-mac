<script setup lang="ts">
const props = defineProps({
  cacId: String,
  userId: Number,
  guideId: Number,
  withoutDb: Boolean
})

const hasCac = async () => {
  if (props.withoutDb) return
  const response = await window.electronAPI.prismaOperation('cac', 'findUnique', {
    where: {
      playerId: props.userId,
      guideId: props.guideId,
      cacId: props.cacId?.toString()
    }
  })
  if (response.success) hasCheckCache.value = response.data !== null
}

const hasCheckCache = ref(false)
const checkboxImg = ['/img/icon/checkbox_off.png', '/img/icon/checkbox_on.png']
const toggleCheckbox = async () => {
  hasCheckCache.value = !hasCheckCache.value
  if (props.withoutDb) return
  if (hasCheckCache.value) {
    await window.electronAPI.prismaOperation('cac', 'create', {
      data: {
        playerId: props.userId,
        guideId: props.guideId,
        cacId: props.cacId?.toString()
      }
    })
  } else {
    await window.electronAPI.prismaOperation('cac', 'delete', {
      where: {
        playerId: props.userId,
        guideId: props.guideId,
        cacId: props.cacId?.toString()
      }
    })
  }
}

const getBg = computed(() => {
  return hasCheckCache.value ? checkboxImg[0] : checkboxImg[1]
})

hasCac()
</script>

<template>
  <img :src="getBg" id="" class="my-auto cursor-pointer" style="height: 18px; width: 18px" @click="toggleCheckbox()" alt="" />
</template>

<style scoped></style>
