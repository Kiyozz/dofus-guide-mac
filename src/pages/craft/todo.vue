<script setup lang="ts">
import ItemTutoriel from '~/pages/tutoriel/_partials/ItemTutoriel.vue'

definePageMeta({
  layout: 'tutorial'
})
const items = ref([])

onMounted(() => {
  const savedCrafts = window.localStorage.getItem('crafts')
  if (savedCrafts) {
    const crafts = JSON.parse(savedCrafts)
    crafts.forEach((c) => {
      c.items.forEach((i) => {
        console.log(c)
        const existingItem = items.value.find((item) => item.id === i.id)
        if (!existingItem) {
          items.value.push({
            id: i.id,
            valeur: {
              name: i.name,
              image: i.picture,
              qte: i.qte * c.qte
            }
          })
        } else {
          items.value = items.value.map((item) => {
            if (item.id === i.id) {
              return {
                ...item,
                valeur: {
                  ...item.valeur,
                  qte: item.valeur.qte + i.qte * c.qte
                }
              }
            }
            return item
          })
        }
      })
    })
  }
  console.log(items.value)
})
</script>

<template>
  <div class="flex flex-col gap-2 py-2 px-4">
    <h1 class="text-2xl font-bold">Liste des items</h1>
    <ItemTutoriel v-for="i in items" :key="i.id" :s="i" :user-id="99" :guide-id="99" :without-db="true" />
  </div>
</template>

<style scoped></style>
