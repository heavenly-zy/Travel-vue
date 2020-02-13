<template>
  <div>
    <home-header :city="city"></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
import HomeHeader from "./components/Header.vue";
import HomeSwiper from "./components/Swiper.vue";
import HomeIcons from "./components/Icons.vue";
import HomeRecommend from "./components/Recommend.vue";
import HomeWeekend from "./components/Weekend.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data() {
    return {
      city: "",
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    };
  },
  methods: {
    getHomeInfo() {
      axios.get("/api/home.json").then(this.getHomeInfoSuccss);
    },
    getHomeInfoSuccss(response) {
      const res = response.data;
      const data = res.data;
      if (res.ret && res.data) {
        this.city = data.city;
        this.swiperList = data.swiperList;
        this.iconList = data.iconList;
        this.recommendList = data.recommendList;
        this.weekendList = data.weekendList;
      }
    }
  },
  mounted() {
    this.getHomeInfo();
  }
};
</script>

<style>
</style>
