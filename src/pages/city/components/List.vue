<template>
  <div class="list" ref="wrapper">
    <div>
      <section>
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list clearfix">
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
        </div>
      </section>

      <section>
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list clearfix">
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
          <div class="button-wrapper">
            <button>北京</button>
          </div>
        </div>
      </section>

      <section>
        <div class="title border-topbottom">A</div>
        <ul class="item-list">
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
          <li class="item border-bottom">阿拉善</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "CityList",
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
  }
};
</script>

<style lang="stylus" scoped>
.clearfix::after
  content ''
  display block
  clear both
.border-bottom
  &:before
    border-color #ccc
.border-topbottom
  &:before
    border-color #ccc
  &:after
    border-color #ccc
.list
  overflow hidden
  position absolute
  top 1.75rem
  left 0
  right 0
  bottom 0
  .title
    line-height 0.54rem
    background #eee
    color #666
    font-size 0.26rem
    padding-left 0.2rem
    color #666
  .button-list
    padding 0.1rem 0.6rem 0.1rem 0.1rem
  .button-wrapper
    float left
    width 30%
    margin 0.1rem
    button
      padding 0.1rem 0
      width 100%
      border 0.02rem solid #ccc
      border-radius 0.06rem
      background #ffffff
  .item-list
    .item
      line-height 0.76rem
      padding-left 0.2rem
</style>
