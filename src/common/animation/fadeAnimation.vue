<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOutDown"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "FadeAnimation"
};
</script>

<style lang="stylus" scoped>
@import '~styles/animate.css'
</style>
