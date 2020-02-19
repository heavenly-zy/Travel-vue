<template>
  <div>
    <div class="container" @click="handleGallaryClick">
      <div class="wrapper">
        <!-- 加v-if="imgList.length"这一句是为了解决loop失效的bug -->
        <swiper v-if="imgList.length" :options="swiperOption">
          <swiper-slide v-for="(img,index) of imgList" :key="index">
            <img :src="img" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonGallary",
  props: {
    imgList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        observer: true, // 监听自己的DOM结构，若发生变化，则刷新Swiper
        observeParents: true, // 监听父级元素的DOM结构，若发生变化，则刷新Swiper
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        }
      }
    };
  },
  methods: {
    handleGallaryClick(e) {
      if (e.target.tagName === "IMG") return;
      this.$emit("closeGallary");
    }
  }
};
</script>

<style lang="stylus" scoped>
.container >>> .swiper-container
  overflow inherit
.container
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background #000
  display flex
  align-items center
  z-index 99
  .wrapper
    width 100%
    height auto
    img
      width 100%
    .swiper-pagination-fraction
      color #fff
      bottom -1rem
</style>
