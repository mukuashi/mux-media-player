<template>
  <div :class="app.prefix + '-media-player'">
    <slot />
  </div>
</template>
<style lang="scss" scoped src="./index.scss"></style>
<script>
/*
 * Copyright (c) 2015-Now mukuashi@PhotoArtLife, All rights reseved.
 * @fileoverview | 统一视频音频播放器组件，支持audio、video等多类型，借鉴https://github.com/sampotts/plyr
 * @Author: mukuashi | mukuashi@qq.com
 * @version 0.1 | 2018-09-26 // Initial version.
 * @version 0.2 | 2018-12-14 // add mode、get Video Info prop，支持视频截屏，音频暂不需
 * @version 0.3 | 2018-12-24 // optimize global app config
 * @Date:   2018-09-26 18:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2019-02-22 12:41:34
*/
import Plyr from 'plyr'
import app from '@/settings'
import 'plyr/dist/plyr.css'

export default {
  name: 'MediaPlayer',
  props: {
    /** Options object for plyr config. */
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    /** Array of events to emit from the plyr object */
    emit: {
      type: Array,
      required: false,
      default () { return [] }
    },
    /** 资源类型，先支持video和audio */
    mode: {
      type: [ String,null ],
      required: false,
      default: null
    }
  },
  data () {
    return {
      player: {},
      app
    }
  },

  mounted () {
    //初始化一些设置，支持各种自定义
    this.player = new Plyr(this.$el.firstChild, this.opts)
    this.$emit('player', this.player)
    this.emit.forEach(element => {
      this.player.on(element, this.emitPlayerEvent)
    })
  },

  computed: {
    opts () {
      const options = this.options
      if (!this.options.hasOwnProperty('hideYouTubeDOMError')) {
        options.hideYouTubeDOMError = true
      }
      return options
    },

  },

  beforeDestroy () {
    try {
      this.player.destroy()
    } catch (e) {
      if (!(this.opts.hideYouTubeDOMError && e.message === 'The YouTube player is not attached to the DOM.')) {
        console.error(e)
      }
    }
  },

  methods: {
    emitPlayerEvent (event) {
      this.$emit(event.type, event)
    }
  },
}
</script>