<template>
  <view class="container">
    <checkbox-group @change="itemChange">
      <view class="item" v-for="(item, index) in cart" :key="item.id">
        <checkbox class="checkbox" 
        :value="item.id"
        :checked="item.checked"
        >
        </checkbox>
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="price">￥{{ item.price }}</text>
        </view>
        <view class="quantity-control">
          <button class="quantity-btn" @click="decreaseQuantity(index)">-</button>
          <text class="quantity">{{ item.quantity }}</text>
          <button class="quantity-btn" @click="increaseQuantity(index)">+</button>
        </view>
      </view>
    </checkbox-group>
    <view class="card">
      <text class="total-text">
        选中 {{ total_quantity }} 件商品 总价：￥{{ total_price }} 元
      </text>
    </view>
    {{ cart }}
  </view>
</template>
  
<script setup>
import { ref,watch } from 'vue'

const cart = ref([
  {
    id: "1",
    name: '小米',
    price: 100,
    quantity: 1,
    checked: false
  },
  {
    id: "2",
    name: '华为',
    price: 200,
    quantity: 1,
    checked: false
  }
])

// 减少商品数量
const decreaseQuantity = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--
  }
}
// 增加商品数量
const increaseQuantity = (index) => {
  cart.value[index].quantity++
}

function itemChange(e) {
  console.log(e)
  cart.value.forEach(item => {
    item.checked = e.detail.value.includes(item.id)
  })
}
// 计算选中商品的总数量和总价格
const total_quantity = ref(0)
const total_price = ref(0)
watch(cart, () => {
  total_quantity.value = cart.value.filter(item => item.checked).reduce((total, item) => total + item.quantity, 0)
  total_price.value = cart.value.filter(item => item.checked).reduce((total, item) => total + item.price * item.quantity, 0)
}, { deep: true })
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.checkbox {
  margin-right: 10px;
}
.info {
  flex: 1;
}
.name, .price {
  margin-bottom: 5px;
}
.quantity-control {
  display: flex;
  align-items: center;
  .quantity-btn {
    background-color: #f0f0f0;
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
  }
  .quantity {
    // 特殊显示的样式
    font-weight: bold;
    color: #333;
  }
}
.total-text {
  margin-top: 20px;
  text-align: center;
}
</style>