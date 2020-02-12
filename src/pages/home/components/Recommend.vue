<template>
  <div>
    <div class="title">
      <img src="../../../assets/imgs/like.png" />
      <span>猜你喜欢</span>
    </div>
    <ul class="recomList">
      <li class="border-bottom" v-for="item of recommendList" :key="item.id">
        <img :src="item.imgAddr" />
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-intro">{{item.intro}}</p>
          <button>查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  data() {
    return {
      recommendList: [
        {
          id: "01",
          imgAddr: require("imgs/A.jpg"),
          title: "庆隆·易汤南山温泉",
          intro: "介绍介绍介绍介绍介绍介绍"
        },
        {
          id: "02",
          imgAddr: require("imgs/B.jpg"),
          title: "庆隆·易汤南山温泉",
          intro: "介绍介绍介绍介绍介绍介绍"
        },
        {
          id: "03",
          imgAddr: require("imgs/C.jpg"),
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
  img
    width 0.3rem
    height 0.3rem
    float left
    padding 0.24rem 0.1rem
.recomList
  li
    height 1.9rem
    display flex
    padding 0.2rem
    img
      height 100%
    .item-info
      padding 0.1rem
      min-width 0
      .item-title
        font-size 0.32rem
        font-weight bold
        line-height 0.54rem
        ellipsis()
      .item-intro
        line-height 0.4rem
        color #ccc
        ellipsis()
      button
        line-height 0.44rem
        margin-top 0.16rem
        background #ff9300
        padding 0 0.2rem
        border-radius 0.06rem
        color #fff
</style>
