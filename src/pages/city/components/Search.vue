<template>
  <div>
    <div class="search">
      <input type="text" class="search-input" placeholder="输入城市或拼音" v-model="keyword" />
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li
          class="border-bottom"
          v-for="item of list"
          :key="item.id"
          @click="cityClick(item.name)"
        >{{item.name}}</li>
        <li v-show="hasNoData">找不到你想去的城市呢（｡ò ∀ ó｡）</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapMutations } from "vuex";
export default {
  name: "CitySearch",
  props: {
    cities: Object
  },
  data() {
    return {
      keyword: "",
      list: []
    };
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  watch: {
    keyword() {
      // 监听搜索框内的文字变化
      const result = []; // !!这个声明非常重要，每次keyword发生变化都会重置result为空
      for (const i in this.cities) {
        this.cities[i].forEach(value => {
          if (
            value.spell.indexOf(this.keyword) === 0 ||
            value.name.indexOf(this.keyword) === 0
          ) {
            result.push(value);
          }
        });
      }
      this.list = this.keyword ? result : []; // keyword不存在就直接清空list
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.search, {
      mouseWheel: true,
      click: true,
      tap: true
    });
  },
  methods: {
    cityClick(city) {
      this.changeCity(city);
      this.$router.push("/");
    },
    ...mapMutations(["changeCity"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.search
  height 0.72rem
  background $bgColor
  padding 0.1rem 0.1rem
  .search-input
    width 100%
    height 100%
    line-height 0.62rem
    text-align center
    border-radius 0.06rem
    color #666
    padding 0 0.1rem
    box-sizing border-box
.search-content
  overflow hidden
  position absolute
  z-index 1
  top 1.75rem
  right 0
  bottom 0
  left 0
  background #ddd
  li
    line-height 0.62rem
    padding-left 0.2rem
    background #fff
    color #666
</style>
