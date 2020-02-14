<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="letterClick"
      @touchstart="touchStart"
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
      touchStatus: false
    };
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
        const startY = this.$refs.A[0].getBoundingClientRect().top; // 'A' 距离屏幕顶部的距离
        const touchY = e.touches[0].clientY; // 滑动元素距离屏幕顶部的距离
        const index = Math.floor(
          (touchY - startY) / this.$refs.A[0].offsetHeight
        );
        if (index >= 0 && index < this.letters.length) { // 控制 index === 0~21
          this.bus.$emit("change", this.letters[index]);
        }
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
