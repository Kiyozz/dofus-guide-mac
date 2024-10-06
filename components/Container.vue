<script setup lang="ts">
defineProps({
  withHeader: Boolean
})
</script>

<template>
  <div class="px-3 py-4 mt-6 bg-blur overflow-x-hidden">
    <div class="bg-gray-900 fixed top-0 h-20 w-full -ml-2.5" v-if="withHeader"></div>
    <div class="ml-auto">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
