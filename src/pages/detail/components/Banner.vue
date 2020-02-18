<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img
        src="http://img1.qunarzz.com/sight/p0/1812/9d/9d03c608dfe15a2aa3.img.jpg_600x330_6957db71.jpg"
      />
      <div class="banner-info">
        <div class="banner-title">桐花湾美人谷游乐园</div>
        <div class="banner-number-wrapper">
          <div class="banner-number">
            <svg class="icon">
              <use xlink:href="#icon-img" />
            </svg>
            <span>7</span>
          </div>
        </div>
      </div>
    </div>
    <common-gallary :imgList="imgList" @closeGallary="handleGallaryClose" v-show="showGallary"></common-gallary>
  </div>
</template>

<script>
import CommonGallary from "common/gallary/Gallary.vue";
export default {
  name: "DetailBanner",
  components: {
    CommonGallary
  },
  data() {
    return {
      imgList: [
        "http://img1.qunarzz.com/sight/p0/1803/b9/b967924f39891022a3.img.jpg_r_800x800_6f9e2624.jpg",
        "http://img1.qunarzz.com/sight/p0/1803/57/5734f99e952d78c6a3.img.jpg_r_800x800_71a3cbb4.jpg"
      ],
      showGallary: false
    };
  },
  methods: {
    handleBannerClick() {
      this.showGallary = true;
    },
    handleGallaryClose() {
      this.showGallary = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.banner::after
  content ''
  display block
  position absolute
  bottom 0
  width 100%
  height 0.3rem
  background-image linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
.banner
  position relative
  overflow hidden
  width 100%
  height 0
  padding-bottom 55%
  img
    width 100%
  .banner-info
    position absolute
    bottom 0.36rem
    right 0.2rem
    left 0.2rem
    min-height 0.4rem
    color #fff
    display flex
    .banner-title
      line-height 0.4rem
      font-size 0.36rem
    .banner-number-wrapper
      margin-left auto
      line-height 0.4rem
      .banner-number
        display inline-block
        width 1.2rem
        height 0.4rem
        background rgba(0, 0, 0, 0.5)
        border-radius 0.2rem
        font-size 0.24rem
        line-height 0.4rem
        text-align center
        .icon
          font-size 0.2rem
          vertical-align text-bottom
          margin-right 0.1rem
</style>
