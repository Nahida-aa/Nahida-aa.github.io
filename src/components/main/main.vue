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
<router-view></router-view>
<Footer></Footer>
<cdTop></cdTop>
</template>

<style scoped lang="scss">

</style>