<script setup lang="ts">
defineProps({
  isOpen: Boolean
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <!-- Modal Content -->
    <div class="bg-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full relative text-gray-100">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
