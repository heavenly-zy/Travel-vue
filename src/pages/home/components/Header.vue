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
    <div class="header-right">
      <span>城市</span>
      <svg class="icon jiantou">
        <use xlink:href="#icon-jiantou" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeHeader"
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'; // 注意CSS要在前面加"~"符号
.header
  display flex
  height 0.86rem
  line-height 0.86rem
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
    .icon.jiantou
      width 1.2em
      height 1.2em
</style>
