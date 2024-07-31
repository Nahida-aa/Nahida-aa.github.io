<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>

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