<template>
  <div class="search">
    <input type="text" class="search-input" placeholder="输入城市或拼音" />
  </div>
</template>

<script>
export default {
  name: "CitySearch"
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
</style>
