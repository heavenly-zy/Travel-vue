<template>
  <div>
    <div class="title">
      <span>周末去哪儿</span>
    </div>
    <ul class="recomList">
      <li class="border-bottom" v-for="item of recommendList" :key="item.id">
        <div class="item-img-wrapper">
          <img :src="item.imgAddr" />
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-intro">{{item.intro}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeWeekend",
  data() {
    return {
      recommendList: [
        {
          id: "01",
          imgAddr: require("imgs/aa.jpg"),
          title: "庆隆·易汤南山温泉",
          intro: "介绍介绍介绍介绍介绍介绍"
        },
        {
          id: "02",
          imgAddr: require("imgs/bb.jpg"),
          title: "庆隆·易汤南山温泉",
          intro: "介绍介绍介绍介绍介绍介绍"
        },
        {
          id: "03",
          imgAddr: require("imgs/cc.jpg"),
          title: "庆隆·易汤南山温泉",
          intro: "介绍介绍介绍介绍介绍介绍"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.title
  height 0.8rem
  line-height 0.8rem
  background #f5f5f5
  padding-left 0.26rem
  img
    width 0.3rem
    height 0.3rem
    float left
    padding 0.24rem 0.1rem
.recomList
  .item-img-wrapper
    overflow hidden
    width 100%
    height 0
    padding-bottom 37%
    img
      width 100%
  .item-info
    padding 0.2rem
    min-width 0
    .item-title
      font-size 0.28rem
      line-height 0.54rem
      ellipsis()
    .item-intro
      line-height 0.4rem
      color #616161
      ellipsis()
</style>
