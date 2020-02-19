<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="letterClick"
      @touchstart.prevent="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object
  },
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    };
  },
  updated() {
    // data变化时触发(cities请求到数据，变为非空)updated
    this.startY = this.$refs.A[0].getBoundingClientRect().top; // 'A' 距离屏幕顶部的距离
  },
  computed: {
    letters() {
      const letters = Object.keys(this.cities);
      return letters; // ['A','B','C',...]
    }
  },
  methods: {
    letterClick(e) {
      this.bus.$emit("change", e.target.innerText);
    },
    touchStart() {
      this.touchStatus = true;
    },
    touchMove(e) {
      if (this.touchStatus) {
        if (this.timer) clearTimeout(this.timer); // 函数节流
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY; // 滑动元素距离屏幕顶部的距离
          const index = Math.floor(
            (touchY - this.startY) / this.$refs.A[0].offsetHeight
          );
          if (index >= 0 && index < this.letters.length) {
            // 控制 index === 0~21
            this.bus.$emit("change", this.letters[index]);
          }
        }, 16);
      }
    },
    touchEnd() {
      this.touchStatus = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.list
  position absolute
  top 1.73rem
  right 0.1rem
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
