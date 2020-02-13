<template>
  <ul class="list">
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet"
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.list
  position absolute
  top 1.73rem
  right 0
  bottom 0
  width 0.4rem
  display flex
  flex-direction column
  justify-content center
  align-items center
  .item
    line-height 0.44rem
    width 0.6rem
    text-align center
    color $bgColor
</style>
