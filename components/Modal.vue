<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Content -->
    <div class="bg-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full relative text-gray-100">
      <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          @click="closeModal"
      >
        &times;
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>