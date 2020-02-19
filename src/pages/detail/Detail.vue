<template>
  <div>
    <detail-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></detail-banner>
    <detail-header></detail-header>
    <detail-list :list="categoryList"></detail-list>
    <div class="content"></div>
  </div>
</template>

<script>
import DetailBanner from "./components/Banner.vue";
import DetailHeader from "./components/Header.vue";
import DetailList from "./components/List.vue";
import axios from "axios";
export default {
  name: "Detail",
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data() {
    return {
      sightName: "",
      bannerImg: "",
      gallaryImgs: [],
      categoryList: [],
      lastId: undefined
    };
  },
  methods: {
    getDetailInfo() {
      axios
        .get("/api/detail.json", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(this.getDetailInfoSuccss);
    },
    getDetailInfoSuccss(response) {
      const res = response.data;
      const data = res.data;
      if (res.ret && res.data) {
        this.sightName = data.sightName;
        this.bannerImg = data.bannerImg;
        this.gallaryImgs = data.gallaryImgs;
        this.categoryList = data.categoryList;
      }
    }
  },
  mounted() {
    this.getDetailInfo();
    this.lastId = this.$route.params.id;
  },
  activated() {
    if (this.$route.params.id !== this.lastId) {
      this.getDetailInfo();
      this.lastId = this.$route.params.id
    }
  }
};
</script>

<style lang="stylus" scoped>
.content
  height 50rem
</style>
