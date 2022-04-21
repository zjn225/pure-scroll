<template>
  <div>
    <div class="wrap">
      <pure-scroll :list='list' :normal-scroll='false'>

      </pure-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    list() {
      const list = [];
      for (let i = 0; i < 101; i++) {
        list.push({
          name: i
        });
      }
      return list;
    },
  },
  mounted() {
  },
  methods: {

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
