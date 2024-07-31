<script setup lang="ts">
import { ref } from 'vue'
import Main from '../../components/main/main.vue'
import sky_js from '../../components/bg/sky_js.vue';

const title = ref('Home')

</script>

<template>
  <sky_js>
    <h1>{{ title }}</h1>
    <p>Welcome to the home page!</p>
    <Main></Main>
  </sky_js>
</template>

<style scoped lang="scss">

</style>
