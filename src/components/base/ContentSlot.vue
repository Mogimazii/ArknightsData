<template>
  <div class="base-content" :class="{long, 'long-content': longContent}">
    <div :style="titleStyle" class="base-content-title">
      <slot name="title" />
    </div>
    <div :style="valueStyle" class="base-content-value">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    width: {
      type: Number,
      default: null
    },
    long: Boolean,
    noWrap: Boolean,
    longContent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['short']),
    titleStyle() {
      const res = {}
      if (this.width) {
        res.width = this.short ? `${this.width / 750 * 200}vw` : this.width + 'px'
      }
      // if (this.noWrap) {
      //   res.display = 'inline-block'
      // } else {
      //   res.margin = '0 auto'
      // }
      return res
    },
    valueStyle() {
      if (!this.short || this.long || this.longContent) return {}
      else return this.titleStyle
    }
  }
}
</script>


<style lang="stylus">
.base-content {
  &-title {
    color: white
    background-color: #313131
    text-align: center
    font-size: 100%
    line-height: 100%
    border-radius: 2px
    width: 80px
    padding: 2px 0
    box-shadow: 1px 1px 2px 1px #3a3a4f
    //box-sizing: border-box
    white-space: nowrap
    word-break: keep-all
  }

  &-value {
    display: inline-block
    padding-top: 10px
  }
}

.long {
  white-space: nowrap

  .base-content {
    &-title {
      width: auto
      padding: 2px 10px
      margin: 5px 5px 5px 0
      display: inline-block
      white-space: nowrap
      word-break: keep-all
    }

    &-value {
      display: inline-block
      width: auto
      text-align: left
      padding: 0
    }
  }
}

.long-content {
  .base-content {
    &-value {
      display: block
      width: 100%
      text-align: left
      white-space: normal
    }
  }
}

@media screen and (max-width: 900px) {
  .base-content {
    &-title {
      display: block
    }

    &-value {
      text-align: center
      padding-top: 5px
    }
  }
}

@media screen and (max-width: 500px) {
  .base-content, .base-content {
    font-size: vw(30)

    &-title {
      display: block
      border-radius: vw(4)
      width: vw(160)
      padding: vw(4) 0 0
      box-shadow: vw(2) vw(4) vw(4) vw(2) rgba(73, 62, 87, 0.95)
    }

    &-value {
      //width: 100%
      text-align: center
      padding-top: vw(5)
    }
  }
}
</style>
