<script setup lang="ts">
import { ref } from 'vue'
import Main from '../../components/main/main.vue'
// import sky_js from '../../components/bg/sky_js.vue';

const title = ref('Home')

</script>

<template>
  <!-- <sky_js></sky_js> -->
  <Main>
    <h1>{{ title }}</h1>
    <p>Welcome to the home page!</p>
    <div v-for="item in 500">内容</div>
  </Main>

</template>

<style scoped lang="scss">
// .content {
//   position: relative;
//   z-index: 1; /* 确保内容在背景前面 */
// }
</style>
