<script setup lang="ts">
const props = defineProps({
  user: Object,
  selectedPerso: Number,
  onDelete: Function
})
const classes = await $fetch('https://dofusguide.fr/api/players')

const getImg = () => {
  const c = classes.find((classe) => classe.id === props?.user?.classe)
  return c['image_' + props?.user?.gender]
}
</script>

<template>
  <div class="flex items-center justify-between p-1 rounded-lg bg-[#171717] cursor-pointer" :class="selectedPerso == user.id ? 'active' : ''">
    <div class="img_container">
      <img :src="getImg()" alt="" class="img" />
    </div>
    <div class="text-sm font-medium flex-1 ms-8">{{ user.pseudo }}</div>
    <btn size="xs" icon="/img/svg/close.svg" variant="outline" color="danger" @click="onDelete(user.id)" />
  </div>
</template>

<style scoped>
.img_container {
  height: 2.5rem;
  overflow: hidden;
  width: 2.5rem;
}

.img {
  object-fit: cover;
  transform: scale(3) translateY(20%); /* Ajuste la position après le scaling */
}

.active {
  border: 2px solid #00fa4c;
  border-radius: 8px;
}
</style>
