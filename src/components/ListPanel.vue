<script setup lang="ts">
import IconDefaultCover from "@/assets/icon/default_cover.svg";
import Music from "@/beans/Music";

let propFlag = defineProps({
  showList: {
    type: Boolean,
    default: false,
  },
  musicList: {
    type: Array<Music>,
    default: [new Music('FPlayer', 'Team Fangkehou', IconDefaultCover, "", "")],
  }
});

defineEmits<{
  switch: [id: number],
  close: [],
}>()

</script>

<template>
  <div class="fp_list_panel" :style=" propFlag.showList ? { transform: 'translateY(0px)' } : {}" @click="$emit('close')">
    <div class="fp_list_item" v-for="(music, index) in propFlag.musicList" :style="{backgroundImage: 'url(' + music.cover + ')'}" @click="$emit('switch', index)">
      <p class="fp_list_content" style="top: 0;">{{music.name}}</p>
      <p class="fp_list_content" style="bottom: 0;">{{music.artist}}</p>
    </div>
  </div>
</template>

<style>
</style>