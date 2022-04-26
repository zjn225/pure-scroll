<template>
  <div class="pure-wrapper" ref='wrapper'>
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import Pullup from '@better-scroll/pull-up'

BScroll.use(MouseWheel);
BScroll.use(Pullup)

export default {
  name: 'scroll',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },

    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },

    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted() {
    this.fitFoldingScreen()
    // 保证在DOM渲染完毕后初始化better-scroll
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    // 下一页数据回来后触发
    pullupEnd() {
      this.scroll.refresh();
      this.scroll.finishPullUp();
      this.scroll.openPullUp();
    },
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        mouseWheel: true,
        pullUpLoad: {
          threshold: 10,
        },
      })

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("pullingUp", () => {
          this.$emit('scrollToEnd')
          this.scroll.refresh();
        });
      }

    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },

    getViewportSize() {
      return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      }
    },

    // 适配折叠屏下页面比例不对的场景、以及安卓机底部全面屏手势遮挡物问题
    fitFoldingScreen() {
      // 滚动区域到屏幕顶部的距离
      const scrollAreaToScreenTop =
        this.$refs.wrapper.getBoundingClientRect().top;
      if (scrollAreaToScreenTop < 0) return;
      // 要设置的滚动区域的高度
      const scrollH = this.getViewportSize().height - scrollAreaToScreenTop;
      this.$refs.wrapper.style.height = `${scrollH}px`;
    }
  },
}
</script>

<style lang="scss" scoped>
.pure-wrapper {
  display: inline-block;
  justify-content: center;
  position: relative;
  overflow: hidden;
  white-space: normal;
  // height: 50vh;

  .scroll-content-2 {
    display: inline-block;
  }
}
</style>