<template>
  <div class="header">
    <router-link to="/">
      <span class="header-return">
        <svg class="icon return">
          <use xlink:href="#icon-return" />
        </svg>
      </span>
    </router-link>
    <span>城市选择</span>
  </div>
</template>

<script>
export default {
  name: "CityHeader"
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.header
  position relative
  height $headerHeight
  line-height $headerHeight
  text-align center
  color #fff
  background $bgColor
  font-size 0.32rem
  .header-return
    position absolute
    left 0.2rem
    top 0.1rem
    color #fff
</style>
