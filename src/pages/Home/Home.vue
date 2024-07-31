<script setup lang="ts">
import { ref } from 'vue'
import Main from '../../components/main/main.vue'

const title = ref('Home')

</script>

<template>
  <h1>{{ title }}</h1>
  <p>Welcome to the home page!</p>
  <Main></Main>
</template>

<style scoped>

</style>
