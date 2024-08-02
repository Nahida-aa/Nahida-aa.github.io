<script setup lang="ts">
import sky_js from './components/bg/sky_js.vue';
</script>

<template>
  <sky_js></sky_js>
  <router-view></router-view>
</template>

<style lang="scss">
@import './assets/styles/global.scss';
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(../assets/images/track_nav.jpg) no-repeat center center fixed;
  background-size: cover;
}
</style>
