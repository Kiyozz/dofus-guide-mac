<script setup lang="ts">
const props = defineProps<{
  ocre: Object
}>()
const ocreInDb = ref({})
onMounted(async () => {
  // check if ocre is in db
  const result = await window.electronAPI.prismaOperation('ocre', 'findUnique', {
    where: {
      id: props.ocre.id
    }
  })
  if (result.success && result.data != null) {
    ocreInDb.value = result.data
  } else {
    const newObj = await window.electronAPI.prismaOperation('ocre', 'create', {
      data: {
        id: props.ocre.id,
        qte: 0
      }
    })
    if (newObj.success) {
      ocreInDb.value = newObj.data
    }
  }
})

const updateQte = async (value: number) => {
  const newObj = await window.electronAPI.prismaOperation('ocre', 'update', {
    where: {
      id: props.ocre.id
    },
    data: {
      qte: ocreInDb.value.qte + value
    }
  })
  if (newObj.success) {
    ocreInDb.value = newObj.data
  }
}

const isArchiMonstre = () => {
  return props.ocre.etape >= 20 && props.ocre.etape <= 34
}
</script>
<template>
  <div class="relative">
    <div v-if="isArchiMonstre()" class="absolute top-0 right-0 h-[32px] w-[32px]">
      <img src="/img/archi.png" alt="" />
    </div>
    <div :style="[`background-image: url('/img/monster_bg.png')`]" class="bg-card rounded-lg">
      <img :src="ocre.image" alt="" class="p-4" :class="ocreInDb?.qte == 0 ? 'mask' : ''" />
      <div class="text-center font-semibold">{{ ocre.name }}</div>
      <div class="flex justify-center items-center gap-4">
        <div>
          <btn icon="/img/svg/minus.svg" icon-only color="danger" size="sm" variant="soft" @click="updateQte(-1)" :disabled="ocreInDb.qte == 0" />
        </div>
        <div class="p-2 text-4xl">{{ ocreInDb?.qte }}</div>
        <div>
          <btn icon="/img/svg/add.svg" icon-only size="sm" variant="soft" @click="updateQte(+1)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-card {
  width: 229px;
  height: 323px;
  background-position: top !important;
  background-repeat: no-repeat !important;
  background-color: #171717;
}

.mask {
  filter: grayscale(1);
}
</style>
