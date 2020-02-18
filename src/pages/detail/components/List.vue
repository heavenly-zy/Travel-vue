<template>
  <div class="list">
    <ul class="list-item" v-for="(item,index) of list" :key="index">
      <li class="border-bottom">
        <span class="icon"></span>
        <span>{{item.title}}</span>
      </li>
      <!-- 递归组件 -->
      <li class="children" v-if="item.children">
        <detail-list :list="item.children"></detail-list>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DetailList",
  props: {
    list: {
      type: Array
    }
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #cacaca
.list
  font-size 0.32rem
  .list-item
    min-height 0.88rem
    line-height 0.88rem
    .icon
      display inline-block
      width 0.36rem
      height 0.36rem
      background url('//s.qunarzz.com/piao/image/touch/sight/detail.png') 0 -0.45rem no-repeat
      margin-right 0.1rem
      margin-left 0.2rem
      background-size 0.4rem 3rem
    .children
      padding-left 0.4rem
</style>
