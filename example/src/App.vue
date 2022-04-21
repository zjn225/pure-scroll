<template>
  <div>
    <div class="wrap">
      <pure-scroll :list='list'>

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
      for (let i = 0; i < 100; i++) {
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
