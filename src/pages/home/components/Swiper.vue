<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgAddr" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 不禁用自动播放，每次互动后重新启动
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperList: [
        {
          id: "01",
          imgAddr: require("../../../assets/imgs/1.jpg")
        },
        {
          id: "02",
          imgAddr: require("../../../assets/imgs/2.jpg")
        },
        {
          id: "03",
          imgAddr: require("../../../assets/imgs/3.jpg")
        },
        {
          id: "04",
          imgAddr: require("../../../assets/imgs/4.jpg")
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active // 样式穿透
  background #fff !important
.wrapper
  overflow hidden
  background #ddd
  width 100%
  height 0
  padding-bottom 30.47%
  .swiper-img
    width 100%
</style>
