<script setup lang="ts">
defineProps({
  name: String,
  avatar: String,
  discord: String,
  twitch: String,
  youtube: String
})
</script>

<template>
  <div class="inline-flex gap-[8px]">
    <img :src="avatar" alt="" class="rounded-full w-[24px] h-[24px] border-2 border-green-500" />
    <div class="f-text">{{ name }}</div>
    <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
      <img src="/img/icon/discord.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
    </div>
    <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
      <img src="/img/icon/twitch.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
    </div>
    <div class="h-[24px] w-[24px] bg-[#16171d] rounded-md">
      <img src="/img/icon/youtube.png" alt="" class="w-[16px] h-[16px] mx-auto mt-[4px]" />
    </div>
  </div>
</template>

<style scoped>
.f-text {
  font-size: 0.8rem;
  color: #fff;
}
</style>
