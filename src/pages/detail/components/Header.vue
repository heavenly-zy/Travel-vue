<template>
  <div>
    <router-link tag="div" class="header-abs" v-show="showAbs" to="/">
      <svg class="icon abs return">
        <use xlink:href="#icon-return" />
      </svg>
    </router-link>
    <div class="header-fixed" :style="opacityStyle" ref="fixed">
      <router-link tag="svg" class="icon fixed return" to="/">
        <use xlink:href="#icon-return" />
      </router-link>
      <span>景点详情</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeatilHeader",
  data() {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    };
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop;
      const height = this.$refs.fixed.offsetHeight;
      let opacity = top / (height * 5);
      if (top > height) {
        this.showAbs = false;
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = { opacity };
      } else {
        this.showAbs = true;
        this.opacityStyle.opacity = 0;
      }
    }
  },
  activated() {
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.header-abs
  position fixed
  left 0.1rem
  top 0.1rem
  width 0.72rem
  height 0.72rem
  line-height 0.72rem
  text-align center
  border-radius 50%
  background rgba(0, 0, 0, 0.5)
  .icon.abs.return
    color #fff
    font-size 0.25rem
    vertical-align sub
.header-fixed
  position fixed
  width 100%
  top 0
  left 0
  height $headerHeight
  line-height $headerHeight
  text-align center
  color #fff
  background $bgColor
  font-size 0.32rem
  .icon.fixed.return
    font-size 0.25rem
    position absolute
    left 0.26rem
    top 0.26rem
</style>
