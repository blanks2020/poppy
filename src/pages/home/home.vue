<template>
  <div class="home">
    <IndexCarousel />
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    IndexCarousel: () => import('@c/IndexCarousel')
  }
}
</script>

<style lang="stylus" scoped>
.home {
  // height: 200px;
}
</style>
