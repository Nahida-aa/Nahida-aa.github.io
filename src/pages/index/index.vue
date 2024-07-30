<template>
  <view class="content">
    <image class="logo" src="/static/imgs/Nahida.jpg" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
  <navigator url="/pages/message/message">留言</navigator>
  <navigator url="/pages/cart/cart">购物车</navigator>
  <!-- 邮箱 -->
  <navigator
    url="mailto:Nahida-aa@outlook.com"
  >
    邮箱
  </navigator>
  <a href="mailto:Nahida-aa@outlook.com">邮箱</a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Nahida-aa')
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
