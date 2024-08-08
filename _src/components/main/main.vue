<script setup lang="ts">
import Nav from './nav.vue'
import Header from './header.vue';
import Footer from './footer.vue';
</script>

<template>
<Nav></Nav>
<Header></Header>
<router-view></router-view>
<Footer></Footer>
</template>

<style scoped>

</style>