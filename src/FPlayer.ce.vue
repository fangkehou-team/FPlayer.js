<script setup lang="ts">
import IconPrevious from '@/components/icons/IconPrevious.vue'
import IconPlay from '@/components/icons/IconPlay.vue'
import IconNext from '@/components/icons/IconNext.vue'
import IconList from '@/components/icons/IconList.vue'
import IconDefaultCover from '@/assets/icon/default_cover.svg'
import LyricPanel from '@/components/LyricPanel.vue'
import { onMounted, ref } from "vue";
import IconPause from "@/components/icons/IconPause.vue";
import Music from "@/beans/Music";
import FPlayer from "@/main";
import LogUtil from "@/utils/LogUtil";
import ListPanel from "@/components/ListPanel.vue";

let propFlag = defineProps({
  mode: {
    type: String,
    default: "single",
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  autoSkip: {
    type: Boolean,
    default: false,
  },
})

LogUtil.debug(propFlag);

let musicList = ref([new Music('FPlayer', 'Team Fangkehou', IconDefaultCover, "", "")])
let playList = ref([0]);

let controlFlag = ref({
  playing: false,
  currentTime: 0,
  showLyricPanel: false,
  showListPanel: false,
})

let musicPlayer = ref();
let fPlayerInstance = ref();

function setMusicList(newMusicList: Music[]){
  musicList.value = newMusicList;

  playList.value = Array.from(new Array(newMusicList.length).keys());

  refreshList();

  controlFlag.value.playing = false;
  controlFlag.value.currentTime = 0;

  pushMusic(newMusicList[0]);
}

/**
 * 重新生成随机列表
 * @function refreshList
 * @private
 */
function refreshList() {
  if (propFlag.mode !== FPlayer.MODE_RANDOM) {
    return;
  }
  let current = playList.value[0];
  playList.value.shift();
  let l = playList.value.length;
  let index, temp;
  while (l > 0) {
    index = Math.floor(Math.random() * l);
    temp = playList.value[l - 1];
    playList.value[l - 1] = playList.value[index];
    playList.value[index] = temp;
    l--;
  }
  playList.value.unshift(current);
}

function setFPlayerInstance(instance: FPlayer) {
  fPlayerInstance.value = instance;
}

function next() {
  let current = playList.value[0];
  playList.value.shift();
  playList.value.push(current);
  current = playList.value[0];
  pushMusic(musicList.value[current]);
  play();
  fPlayerInstance.value.notifyListener(FPlayer.ACTION_ON_NEXT);
}

function previous() {
  let current = playList.value[playList.value.length - 1];
  playList.value.unshift(current);
  playList.value.pop();
  pushMusic(musicList.value[current]);
  play();
  fPlayerInstance.value.notifyListener(FPlayer.ACTION_ON_PREVIOUS);
}

function pause() {
  LogUtil.debug(musicPlayer.value);

  controlFlag.value.playing = false;
  musicPlayer.value.pause();
}

function play() {
  LogUtil.debug(musicPlayer.value);

  controlFlag.value.playing = true;
  if (musicPlayer.value.readyState >= 2) {
    musicPlayer.value.play()
      .catch();
  }
}

function jump(index: number) {
  LogUtil.debug(index);

  playList.value = [];
  for (let i = index; i < musicList.value.length; i++) {
    playList.value.push(i);
  }

  for (let i = 0; i < index; i++) {
    playList.value.push(i);
  }

  refreshList();
  controlFlag.value.currentTime = 0;

  pushMusic(musicList.value[index]);
  play();

  fPlayerInstance.value.notifyListener(FPlayer.ACTION_ON_SWITCH);
}

function pushMusic(music: Music) {
  musicPlayer.value.src = music.content;
  musicPlayer.value.load();
}

function onNext() {
  LogUtil.debug("onNext");
  if (propFlag.mode === FPlayer.MODE_SINGLE) {
    LogUtil.debug("single mode");
    pushMusic(musicList.value[playList.value[0]]);
    fPlayerInstance.value.notifyListener(FPlayer.ACTION_ON_NEXT);
    return;
  }
  next();
}

onMounted(() => {
  musicPlayer.value = new Audio();

  musicPlayer.value.addEventListener("canplaythrough", function () {
    fPlayerInstance.value.notifyListener(FPlayer.ACTION_ON_LOAD);
    if (controlFlag.value.playing) {
      musicPlayer.value.play()
        .catch();
    }
  })

  musicPlayer.value.addEventListener("pause", function () {
    if (controlFlag.value.playing) {
      LogUtil.debug("end of song");
      fPlayerInstance.value.notifyListener(FPlayer.ACTION_ON_NEXT);
      onNext();
    }
  })

  musicPlayer.value.addEventListener("error", function () {
    LogUtil.debug("failed to load");
    fPlayerInstance.value.notifyListener(FPlayer.ACTION_ON_FAIL);
    if (controlFlag.value.playing) {
      if (propFlag.autoSkip) {
        next();
      } else {
        pause();
      }
    }
  })
  musicPlayer.value.addEventListener("timeupdate", function () {
    controlFlag.value.currentTime = musicPlayer.value.currentTime;
  })
});

defineExpose({
  setMusicList,
  setFPlayerInstance,
});
</script>

<template>
  <div class="fp_panel">
    <div
      class="fp_control_panel_background"
      :style="{ backgroundImage: 'url(' + musicList[playList[0]].cover + ')' }"
    >
      <div class="fp_control_panel">
        <div class="fp_detail_panel">
          <p class="fp_detail_title">{{ musicList[playList[0]].name }}</p>
          <p class="fp_detail_artist">{{ musicList[playList[0]].artist }}</p>
        </div>
        <div class="fp_button_controller" data-action="previous">
          <IconPrevious @click="previous()" />
        </div>
        <div class="fp_button_controller" data-action="play">
          <IconPlay v-if="!controlFlag.playing" @click="play()" />
          <IconPause v-else @click="pause()" />
        </div>
        <div class="fp_button_controller" data-action="next">
          <IconNext @click="next()" />
        </div>
        <div class="fp_button_controller" data-action="list">
          <IconList @click="controlFlag.showListPanel = !controlFlag.showListPanel" />
        </div>
      </div>
    </div>
    <LyricPanel @click="controlFlag.showLyricPanel = !controlFlag.showLyricPanel" :full-lyric="controlFlag.showLyricPanel" :lyric="musicList[playList[0]].lrc" :current-time="controlFlag.currentTime"></LyricPanel>
    <ListPanel :show-list="controlFlag.showListPanel" :music-list="musicList" @close="()=>{controlFlag.showListPanel = false}" @switch="(index: number)=>{controlFlag.showListPanel = false; jump(index)}" ></ListPanel>
  </div>
</template>

<style>
/* 缓动函数 */
/* transition: all 600ms cubic-bezier(.23, 1, .32, 1);
    animation-duration: 5s; */
/* -webkit-transition: all 600ms cubic-bezier(0.95, 0.05, 0.795, 0.035);
    transition: all 600ms cubic-bezier(0.95, 0.05, 0.795, 0.035); */
* {
  margin: 0;
  padding: 0;
  /* animation-duration: 5s; */
  /* transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1); */
}

.fp_animation {
  transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1);
}

/* Main Panel */

.fp_panel {
  font-family:
    Noto Sans CJK SC,
    sans-serif;
  position: relative;
  /* border: solid 1px black; */
  top: 50px;
  left: 5px;
  overflow: hidden;
  /* padding: 12px; */
  /* box-sizing: border-box; */
  width: 300px;
  height: 160px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px black;
}

/* Control Panel */
.fp_control_panel_background {
  position: absolute;
  z-index: 1;
  width: 300px;
  height: 120px;
  background-color: rgb(70, 46, 124);
  background-position: 0 10%;
  background-size: cover;
}

.fp_control_panel {
  position: relative;
  float: right;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  /*background-size: 100% 100%;*/
  /*background-color: rgba(0, 0, 0, 0.4);*/
}

.fp_detail_panel {
  float: left;
  width: 100%;
  height: 60%;
}

.fp_detail_title {
  font-size: 30px;
  display: block;
  overflow: hidden;
  width: 94%;
  height: 47px;
  margin-left: 6%;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
}

.fp_detail_artist {
  font-size: 15px;
  display: block;
  overflow: hidden;
  width: 94%;
  height: 25px;
  margin-left: 6%;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #e6e6e6;
}

.fp_button_controller {
  float: left;
  width: 25%;
  height: 30%;
}

.fp_button_controller svg {
  width: 100%;
  height: 100%;
}

/* List Panel */
.fp_list_panel {
  position: relative;
  z-index: 1;
  overflow: scroll;
  width: 100%;
  height: 100%;
  padding-top: 2px;
  padding-bottom: 2px;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  transform: translateY(160px);
  background-color: rgb(70, 46, 124);
  scrollbar-width: none;
  /*padding-top: 2px;*/
}

.fp_list_panel::-webkit-scrollbar {
  display: none;
}

.fp_list_item {
  position: relative;
  display: block;
  float: left;
  /*background-color: #fff;*/
  overflow: hidden;
  width: 48%;
  height: 72px;
  margin: 1%;
  border-radius: 12px;
  background-size: cover;
  /*background-position: 0 5%;*/
  box-shadow: 0px 0px 5px #190634;
}

.fp_list_content {
  font-size: 20px;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 50%;
  text-align: center;
  white-space: nowrap;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

/* Lyric Panel */
.fp_lyric_panel {
  position: absolute;
  z-index: 1;
  bottom: 0px;
  overflow: hidden;
  width: 300px;
  height: 40px;
  transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1);
  background-color: rgb(88, 67, 139);
}

.fp_lyric_wrapper {
  position: absolute;
  width: 100%;
  /*overflow: scroll;*/
  /*overflow: hidden;*/
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  text-align: center;
  color: white;
  scrollbar-width: none;
}

.fp_lyric_wrapper::-webkit-scrollbar {
  display: none;
}

.fp_lyric_wrapper p {
  font-size: 25px;
  width: 100%;
  height: 40px;
  white-space: nowrap;
  /*超出的部分隐藏*/
  overflow: hidden;
}

.fp_lyric_item {
  float: left;
}
</style>