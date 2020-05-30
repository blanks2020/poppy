<template>
  <Carousel v-model="defaultIndex" loop :autoplay="true" autoplay-speed="5000" :height="height">
    <CarouselItem v-for="image in images" :key="image.alt">
      <img :src="image.src" alt srcset width="100%" height="100%" />
    </CarouselItem>
  </Carousel>
</template>

<script>
export default {
  data () {
    return {
      defaultIndex: 0,
      height: '500px',
      images: [
        { src: require('@img/carousel-01.jpg'), alt: 'python' },
        { src: require('@img/carousel-02.jpg'), alt: 'flask' },
        { src: require('@img/carousel-03.jpg'), alt: 'jenkins' },
        { src: require('@img/carousel-04.jpg'), alt: 'docker' }
      ]
    }
  },
  mounted () {
    this.height = 0.5 * `${document.documentElement.clientHeight}` + 'px'
  }
}
</script>
