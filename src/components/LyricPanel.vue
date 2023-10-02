<script setup lang="ts">
import Lyric from "@/beans/Lyric";
import LogUtil from "@/utils/LogUtil";
import { ref } from "vue";

let propFlag = defineProps({
  lyric: {
    type: Array<Lyric>,
    default: [new Lyric(0, "无歌词")],
    validator(value: Array<Lyric>): boolean {
      return value.length >= 1;
    },
  },
  currentTime: {
    type: Number,
    default: 0,
  },
  fullLyric: {
    type: Boolean,
    default: false,
  },
});

let currentLyricFlag = ref(0);
let fpLyricPanel = ref();

function getCurrentLyricId(currentTime: number) {
  let currentLyricId = currentLyricFlag.value;

  if (propFlag.lyric[currentLyricId] == null) {
    currentLyricId = 0;
  }

  if (propFlag.currentTime < propFlag.lyric[currentLyricId].time) {
    for (let i = currentLyricId; i > 0; i--) {
      if (propFlag.lyric[i] == null) {
        continue;
      }
      if (propFlag.lyric[i].time <= currentTime) {
        currentLyricId = i;
        break;
      }
    }
  } else {
    for (let i = currentLyricId; i < propFlag.lyric.length; i++) {
      if (propFlag.lyric[i] == null) {
        continue;
      }
      if (propFlag.lyric[i].time <= currentTime) {
        currentLyricId = i;
      } else {
        break;
      }
    }
  }

  currentLyricFlag.value = currentLyricId;

  return currentLyricId;
}

function getCurrentLyricPrefix() {
  let currentLyricId = currentLyricFlag.value;

  if (propFlag.lyric[currentLyricId] == null) {
    currentLyricId = 0;
  }

  let currentTime = propFlag.currentTime;
  let nextTime = 0;

  if (propFlag.currentTime < propFlag.lyric[currentLyricId].time) {
    currentTime = propFlag.lyric[currentLyricId].time;
  }

  if (propFlag.lyric[currentLyricId + 1] == null) {
    return 0;
  }

  nextTime = propFlag.lyric[currentLyricId + 1].time;

  return 1 - (nextTime - currentTime) / (nextTime - propFlag.lyric[currentLyricId].time);
}

function needScroll(index: number){

  if (index != currentLyricFlag.value) {
    return false;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 这一步很重要. 需要指定字段size,和family.
  // 如果不指定size, 则默认为12px
  // 如果不指定font-family则不能获取该字体下的精确宽度
  ctx.font = "25px Noto Sans CJK";
  let ctxLength = ctx.measureText(propFlag.lyric[index].lyric).width;

  LogUtil.debug(ctxLength);

  //TODO:歌词动态设置宽度
  if (ctxLength >= 300) {
    return true
  }
  return false;
}

function isFullLyric() {
  if (!propFlag.fullLyric) {
    LogUtil.debug(fpLyricPanel);

    if (fpLyricPanel.value != null) {
      fpLyricPanel.value.scrollTo(0,0);
    }
  }

  return propFlag.fullLyric;
}

LogUtil.debug(propFlag);
</script>

<template>
  <div ref="fpLyricPanel" class="fp_animation fp_lyric_panel" :style="isFullLyric() ? {height: '100%', overflow: 'auto'} : {height: '40px', overflow: 'hidden'}">
    <div
      class="fp_lyric_wrapper"
      :style="{ transform: 'translateY(' + -40 * getCurrentLyricId(propFlag.currentTime) + 'px)'}"
    >
      <p
        :key="index"
        v-for="(lyricItem, index) in propFlag.lyric"
        :data-id="index"
      >
        <ul :class="needScroll(index) ? 'fp_lyric_item' : ''"
             :style="needScroll(index) ? { transform: 'translateX(' + -110 * getCurrentLyricPrefix() + '%)', marginLeft: 110 * getCurrentLyricPrefix() + '%' } : {}">
          {{ lyricItem.lyric }}
        </ul>

      </p>
    </div>
  </div>
</template>

<style></style>