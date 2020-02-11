<template>
  <div class="icons">
    <swiper>
      <swiper-slide class="clearfix" v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="img-wrapper">
            <img :src="item.imgAddr" />
          </div>
          <p>{{item.name}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  data() {
    return {
      iconList: [
        {
          id: "01",
          imgAddr: require("../../../assets/imgs/a.png"),
          name: "景点门票"
        },
        {
          id: "02",
          imgAddr: require("../../../assets/imgs/b.png"),
          name: "泡温泉"
        },
        {
          id: "03",
          imgAddr: require("../../../assets/imgs/c.png"),
          name: "一日游"
        },
        {
          id: "04",
          imgAddr: require("../../../assets/imgs/d.png"),
          name: "两江夜游"
        },
        {
          id: "05",
          imgAddr: require("../../../assets/imgs/e.png"),
          name: "精品小团"
        },
        {
          id: "06",
          imgAddr: require("../../../assets/imgs/f.png"),
          name: "神秘武隆"
        },
        {
          id: "07",
          imgAddr: require("../../../assets/imgs/g.png"),
          name: "重庆欢乐谷"
        },
        {
          id: "08",
          imgAddr: require("../../../assets/imgs/h.png"),
          name: "重庆动物园"
        },
        {
          id: "09",
          imgAddr: require("../../../assets/imgs/i.png"),
          name: "黑山谷"
        }
      ]
    };
  },
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.clearfix::after
  content ''
  display block
  clear both
.icons >>> .swiper-container
  width 100%
  height 0
  padding-bottom 80%
.icon
  position relative
  width 25%
  height 0
  padding-bottom 25%
  float left
  .img-wrapper
    position absolute
    top 0
    left 0
    right 0
    bottom 0.44rem
    text-align center
    img
      height 100%
  p
    position absolute
    left 0
    right 0
    bottom 0
    height 0.44rem
    line-height 0.44rem
    color $fontColor
    text-align center
</style>
