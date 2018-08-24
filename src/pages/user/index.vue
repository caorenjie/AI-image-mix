<template>
  <div class="container">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>


<script>
  export default {
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .container {
    position: relative;
    height: 100px;
    .left {
      float: left;
      background: red;
      width: 30px;
      height: 100%;
    }
    .right {
      width: 100%;
      height: 100%;
      background: blue;
      padding-left: 30px;
    }
  }
</style>

