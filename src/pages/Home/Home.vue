<script setup lang="ts">
import { ref } from 'vue'
import Main from '../../components/main/main.vue'
import SkyJs from '../../components/bg/sky_js.vue';

const title = ref('Home')

</script>

<template>
  <SkyJs>
    <h1>{{ title }}</h1>
    <p>Welcome to the home page!</p>
    <Main></Main>
  </SkyJs>
</template>

<style scoped lang="scss">

</style>
