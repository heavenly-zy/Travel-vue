<template>
  <div class="icons">
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
    <div class="icon">
      <div class="img-wrapper">
        <img src="../../../assets/imgs/a.png" alt />
      </div>
      <p>景点门票</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeIcons"
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.icons
  width 100%
  height 0
  padding-bottom 50%
  background #ddd
  display flex
  flex-wrap wrap
  .icon
    position relative
    width 25%
    height 0
    padding-bottom 25%
    .img-wrapper
      position absolute
      top 0
      left 0
      right 0
      bottom .44rem
      text-align center
      img
        height 100%
    p
      position absolute
      left 0
      right 0
      bottom 0
      height .44rem
      line-height .44rem
      color $fontColor
      text-align center
</style>
