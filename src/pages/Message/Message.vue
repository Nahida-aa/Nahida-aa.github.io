<!-- 生成模板 -->
<template>
  <view class="title">留言板</view>
  <view class="out">
    <view class="list">
      <view class="row" v-for="(item,index) in lists" :key="item.id">
        <view class="text">
          {{ item.content }}
        </view>
        <view class="close" @click="onClose(index)"
        >
          <icon
            type="clear"
            :size="23"
            color=""
          />
        </view>
      </view>
    </view>
    <view class="count">
      <view>共有{{lists.length}}条留言</view>
    </view>
    <view class="comment">
      <input
        v-model="iptValue"
        type="text"
        placeholder="要留下点什么才好"
      />
      <button size="mini" type="primary" 
        :disabled="!iptValue.length"
        @click="onSubmit"
      >
        发布
      </button>
    </view>
  </view>
  <!-- 跳转为首页 -->
  <navigator url="/pages/index/index" open-type="navigate">首页</navigator>
</template>

<script setup>
import { ref } from 'vue'
const lists = ref([
  {
    id: 222746,
    content: '666'
  },
  {
    id: 42539,
    content: 'jinitaimei'
  }
])
const onClose = (index) => {
  console.log(index)
  lists.value.splice(index, 1)
}
// 地址不变
const iptValue = ref('')
const onSubmit = () => {
  lists.value.push({
    id: Date.now(),
    content: iptValue.value
  })
  iptValue.value = ''
}
</script>

<style lang="scss" scoped>
.title {
  color: #aac9fa;
  text-shadow: 1px 1px 12px #85cdff;
  font-size: 40px;
  text-align: center;
  position: absolute;
  top: 19%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 100;
  font-weight: 700;
}
.out {
  width: 90vw;
  margin: 15px auto;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  .list {
    .row {
      display: flex;
      padding: 10px 0;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f0f0f0;
      .text {
        flex: 1;
        font-size: 16px;
        color: #333;
      }
      .close {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #f0f0f0;
        color: #999;
        font-size: 20px;
      }
    }
  }
  .count {
    font-size: 14px;
    color: #666;
    padding: 10px 0;
  }
  .comment {
    display: flex;
    align-items: center;
    input {
      flex: 1;
      height: 30px;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      padding: 0 10px;
      box-sizing: border-box;
      margin-right: 10px;
    }
    button {
      height: 30px;
      border-radius: 5px;
    }
  }
}
</style>