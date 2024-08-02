<script setup lang="ts">
// 这里可以引入一些你想要测试的组件
</script>

<template>
  <div>
    <h1>演示页面</h1>
    <ul>
      <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/demo">Demo</router-link></li>
      <li><router-link to="/nav/trackNav">/nav/trackNav</router-link></li>
      <li><router-link to="/nav/track-nav-css">/nav/track-nav-css</router-link></li>
      <li><router-link to="/bg/sky_js">/bg/sky_js</router-link></li>
      <!-- 添加更多链接以测试其他组件和页面 -->
    </ul>
  </div>
</template>

<style scoped lang="scss">
/* 添加一些样式以美化测试页面 */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: blue;
}

a:hover {
  text-decoration: underline;
}
</style>