<template>
  <div class="home">
    <IndexCarousel />
    <IndexBanner />
    <IndexInformation />
    <IndexModule />
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    IndexCarousel: () => import('@c/IndexCarousel'),
    IndexBanner: () => import('@c/IndexBanner'),
    IndexInformation: () => import('@c/IndexInformation'),
    IndexModule: () => import('@c/IndexModule')
  }
}
</script>

<style lang="stylus" scoped>
.home {
  // height: 200px;
}
</style>
