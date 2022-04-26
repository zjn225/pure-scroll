<template>
  <div>
    <div class="wrap">
      <pure-scroll ref='pureScroll' class="pure" :data="list" :pullup='isPullup' @scrollToEnd='scrollToEnd'>
        <div class="scroll-content">
          <div class="scroll-item-wrap">
            <div class="scroll-item" v-for='(item,index) in list' :key='index'>
              {{item.name}}
            </div>
          </div>
          <div class="bottom">
            <div class="bottom-tip-block" v-if="isEnd && list.length > 4">
              <div>到底啦！！</div>
            </div>
            <div class="load" v-else-if="isPullUpLoad && !isEnd">
              Loading...
            </div>
          </div>
          <!-- 放一些到底啦之类的提示 -->
        </div>
      </pure-scroll>
    </div>
  </div>
</template>

<script>
const PAGE = 1
export default {
  name: 'app',
  data() {
    return {
      isPullup: true,
      page: PAGE,
      list: [],
      isEnd: false, // 是否到底
      isPullUpLoad: false, // 是否正在上拉中
      isLoading: false // 是否接口请求中
    }
  },
  computed: {

  },
  mounted() {
    this.request()
  },
  methods: {
    async getList() {
      const arr = [];
      for (let i = 10; i < 101; i++) {
        arr.push({
          name: i
        });
      }
      return arr;
    },
    async request(page = PAGE) {
      // 强行到底测试
      if (page > 2) {
        this.isEnd = true
        this.isPullUpLoad = false
        return
      }

      const arr = await this.getList()

      console.log('arr', arr);
      this.list = [...this.list, ...arr]

      this.$refs.pureScroll && this.$refs.pureScroll.pullupEnd()
      this.isEnd = arr.length ? false : true;
      this.isPullUpLoad = false
      this.isLoading = false


      console.log('request page: ', page, this.list);
    },
    scrollToEnd() {
      this.request(++this.page)
    }
  },
};
</script>

<style lang="scss">
@import "./assets/reset";
.wrap {
  -webkit-overflow-scrolling: touch;
  /* Firefox隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;

  &::-webkit-scrollbar {
    width: p2r(0) !important;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    width: p2r(0) !important;
    height: 0;
  }
  *::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
}

.bottom {
  height: 100px;
}

.normal-scroll {
  margin: 0 auto;
  height: 90vh;
  width: 90%;
  margin-top: 20px;
  border: 2px solid red;
  overflow: scroll;
  background: gray;
}

.wrapper {
  margin: 0 auto;
  height: 90vh;
  width: 90%;
  margin-top: 20px;
  border: 2px solid red;
  overflow: hidden;
}

.list {
  background-color: lightblue;
}

.list-item {
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid green;
}
</style>
