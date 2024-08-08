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
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
}

body {
  place-items: center;
  display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 100vh;
  // height: 0;
  // background: url(../assets/images/track_nav.jpg) no-repeat center center fixed;
  // background-size: cover;
  // z-index: -10;
  // pointer-events: none;
}
</style>
