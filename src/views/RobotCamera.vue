<template>
  <div class="video-container">
    <button @click="toggleMute">切换静音{{ muted }}</button>
    <video ref="videoRef" class="robot-video" :muted="muted" autoplay controls></video>
    <div class="status-bar">
      状态:
      <span :style="{ color: isPlaying ? '#42b983' : '#ff4d4f' }">
        {{ isPlaying ? '传输中' : '未连接' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import flvjs from 'flv.js';

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const videoRef = ref(null);
const isPlaying = ref(false);
let flvPlayer = null;
let timer = null;

const muted = ref(true);
const toggleMute = () => {
  if (videoRef.value) {
    muted.value = !muted.value;
    videoRef.value.muted = muted.value;
  }
};

const initPlayer = () => {
  if (flvjs.isSupported()) {
    flvPlayer = flvjs.createPlayer(
      {
        type: 'flv',
        isLive: true,
        hasAudio: true,
        url: props.url,
        cors: true
      },
      {
        enableWorker: false, // 在某些环境下，启用 Worker 可能会导致问题， 视频播放不出来
        enableStashBuffer: false,
        stashInitialSize: 128,
        autoCleanupSourceBuffer: true
      }
    );

    flvPlayer.attachMediaElement(videoRef.value);
    flvPlayer.load();
    flvPlayer.play();

    flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
      console.error('FLV 播放错误:', errorType, errorDetail, errorInfo);
      isPlaying.value = false;
    });

    flvPlayer.on(flvjs.Events.STATISTICS_INFO, statisticsInfo => {
      if (statisticsInfo) {
        isPlaying.value = true;
      }
    });

    timer = setInterval(() => {
      if (videoRef.value) {
        const end = videoRef.value.buffered.length > 0 ? videoRef.value.buffered.end(0) : 0;
        const diff = end - videoRef.value.currentTime;

        if (diff > 1.5) {
          console.log('检测到显著延迟，正在追赶...', diff);
          videoRef.value.currentTime = end - 0.1;
        }
      }
    }, 3000);
  }
};

onMounted(() => {
  nextTick(() => {
    initPlayer();
  });
});

onUnmounted(() => {
  if (flvPlayer) {
    try {
      flvPlayer.pause();
      flvPlayer.unload();
      flvPlayer.detachMediaElement();
      flvPlayer.destroy();
    } catch (error) {
      console.error('销毁 FLV 播放器时出错:', error);
    }
    flvPlayer = null;
  }
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});
</script>

<style scoped>
.video-container {
  width: 100%;
  max-width: 800px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.robot-video {
  width: 100%;
  display: block;
}

.status-bar {
  padding: 8px;
  color: #fff;
  background: #333;
  font-size: 14px;
}
</style>
