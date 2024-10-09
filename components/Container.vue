<script setup lang="ts">
defineProps({
  withHeader: Boolean
})
</script>

<template>
  <NuxtScrollbar tag="div" class="px-3 py-4 mt-6 bg-blur overflow-x-hidden">
    <div v-if="withHeader" class="bg-gray-900 fixed top-0 h-20 w-full -ml-2.5"></div>
    <div class="ml-auto z-10">
      <slot></slot>
    </div>
  </NuxtScrollbar>
</template>

<style scoped></style>
