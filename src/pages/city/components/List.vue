<template>
  <div class="list" ref="wrapper">
    <div>
      <section>
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list clearfix">
          <div class="button-wrapper">
            <button>{{currentCity}}</button>
          </div>
        </div>
      </section>

      <section>
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list clearfix">
          <div
            class="button-wrapper"
            v-for="item of hotCities"
            :key="item.id"
            @click="cityClick(item.name)"
          >
            <button>{{item.name}}</button>
          </div>
        </div>
      </section>

      <section v-for="(item,key) of cities" :key="key" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <ul class="item-list">
          <li
            class="item border-bottom"
            v-for="innerItem of item"
            :key="innerItem.id"
            @click="cityClick(innerItem.name)"
          >{{innerItem.name}}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "CityList",
  props: {
    cities: Object,
    hotCities: Array
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      mouseWheel: true,
      click: true,
      tap: true
    });
    this.bus.$on("change", letter => {
      const element = this.$refs[letter][0];
      this.scroll.scrollToElement(element);
    });
  },
  methods: {
    cityClick(city) {
      this.changeCity(city); // 映射过后的changeCity就是mutations中的changeCity
      this.$router.push("/");
    },
    ...mapMutations(["changeCity"]) // this.$store.commit('changeCity', city)
  },
  computed: {
    ...mapState({
      currentCity: "city" // 映射计算属性 this.currentCity 为 store.state.city
    })
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
