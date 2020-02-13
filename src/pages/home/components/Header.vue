<template>
  <div class="header">
    <div class="header-left">
      <svg class="icon return">
        <use xlink:href="#icon-return" />
      </svg>
    </div>
    <div class="input-wrapper">
      <div class="header-input">
        <svg class="icon">
          <use xlink:href="#icon-search" />
        </svg>
        <span>输入城市/景点/游玩主题</span>
      </div>
    </div>
    <router-link to="/city">
      <div class="header-right">
        <span>{{city}}</span>
        <svg class="icon jiantou">
          <use xlink:href="#icon-jiantou" />
        </svg>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  props: {
    city: {
      type: String
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'; // 注意CSS要在前面加"~"符号
.header
  display flex
  height $headerHeight
  line-height $headerHeight
  background $bgColor
  color #fff
  .header-left
    width 0.84rem
    display flex
    align-items center
    justify-content center
  .input-wrapper
    flex 1
    padding-top 0.12rem
    padding-bottom 0.12rem
    height 0.64rem
    .header-input
      padding-left 0.2rem
      display flex
      align-items center
      background #fff
      border-radius 0.1rem
      color #ddd
      line-height 0.64rem
  .header-right
    display flex
    justify-content center
    align-items center
    width 1.24rem
    color #fff
    .icon.jiantou
      width 1em
      height 1em
</style>
