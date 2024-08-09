<script setup lang="ts">
import { ref } from 'vue'
import Main from '../../components/main/main.vue'

const title = ref('About')

</script>

<template>
<Main>
  <h1>{{ title }}</h1>
  <p>Welcome to the about page!</p>
</Main>
</template>

<style scoped>

</style>