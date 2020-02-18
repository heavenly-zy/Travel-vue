<template>
  <div>
    <detail-banner></detail-banner>
    <detail-header></detail-header>
    <detail-list :list="list"></detail-list>
  </div>
</template>

<script>
import DetailBanner from "./components/Banner.vue";
import DetailHeader from "./components/Header.vue";
import DetailList from "./components/List.vue";
export default {
  name: "Detail",
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data() {
    return {
      list: [
        {
          title: "成人票",
          children: [
            {
              title: "成人三馆联票",
              children: [{ title: "成人三馆联票 --- 分店" }]
            },
            { title: "成人五馆联票" }
          ]
        },
        {
          title: "学生票"
        },
        {
          title: "儿童票"
        },
        {
          title: "特惠票"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped></style>
