<script setup lang="ts">
// import Nav from './nav.vue'
import Nav from '../nav/track-nav.vue'
import Header from './header.vue';
import Footer from './footer.vue';
import cdTop from '../floatBtn/cd-top_test.vue';
</script>

<template>
<Nav></Nav>
<Header></Header>
<slot>
  
</slot>
<cdTop></cdTop>
<Footer></Footer>
</template>

<style scoped lang="scss">

</style>