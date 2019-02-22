<template>
  <div class="home">
    <img alt="home logo" src="../../assets/logo.png">
    <media-player :emit="['timeupdate']" @timeupdate="handleGetVideoTimeEvent">
      <video crossorigin :src="url">
        <source :src="url" type="video/mp4" />
        <source :src="url" type="video/mov" />
      </video>
    </media-player>
  </div>
</template>
<style lang="scss" scoped src="./index.scss"></style>
<script>
// @ is an alias to /src
import MediaPlayer from '@/components/media-player';

export default {
  name: 'Home',
  components: {
    MediaPlayer,
  },
  data() {
    return {
      url: 'https://static1.gotokeep.com/homepage/full.mp4'
    }
  },

  methods: {
    handleGetVideoTimeEvent(value) {
      // 获取拖拽视频帧当前时间
      if(value) {
        let time = value && value.detail.plyr.currentTime
        console.log(time)
      } 
    }
  }
};
</script>
