<template>
  <div class="cd-top-container" @mousedown="startDrag">
    <a  class="cd-top" aria-label="scroll to the top of the page" @click.prevent="scrollToTop"></a> 
  </div>
  <div v-for="item in 100">
    <!-- <p>点击次数: {{ clickCount }}</p>
    <p v-if="isHovered">鼠标悬停中...</p>
    <p v-else>鼠标不在悬停</p> -->
    <p v-show="isMouseDown && !isMouseMoving">鼠标按下了...</p>
    <p v-show="!(isMouseDown && !isMouseMoving)">鼠标还没按下</p>
    <p v-show="isMouseMoving">鼠标正在按住并移动...</p>
    <p v-show="!isMouseMoving">鼠标还没按住并移动</p>
    <p v-show="isMouseUp">鼠标松开了...</p>
    <p v-show!isMouseUp>鼠标还没松开或还没有按下</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';



const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const cdTopContainer = document.querySelector('.cd-top-container');
  if (cdTopContainer) {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = documentHeight - windowHeight;
    const newTop = Math.min(0, -95 + (scrollPosition / maxScroll) * 95);
    cdTopContainer.style.top = `${newTop}vh`;
  }
};

const scrollToTop = () => {
  // 
  console.log('scrollToTop');
  window.scrollTo({
    top: 0,
    // behavior: 'smooth'
  });
};

const isHovered = ref(false);
const clickCount = ref(0);
const isMouseDown = ref(false);
const isMouseUp = ref(false);
const isMouseMoving = ref(false);

// 处理鼠标悬停事件
const handleMouseEnter = () => {
  isHovered.value = true;
};
// 鼠标离开事件
const handleMouseLeave = () => {
  isHovered.value = false;
};

// 处理鼠标点击事件
const handleClick = () => {
  clickCount.value++;
};


const isDragging = ref(false);


const startY = ref(0);
const startScrollY = ref(0);

const currentY = ref(0);

const startDrag = (event) => {
  // 按下鼠标时，记录初始位置和滚动位置
  if (event.button !== 0) return; // 仅在左键按下时开始拖动
  document.addEventListener('mousemove', onDrag);
  document.documentElement.classList.add('no-select');

  // debug
  console.log('startDrag');
  isMouseDown.value = true;

  isDragging.value = true;
  startY.value = event.clientY;
  startScrollY.value = window.scrollY;
  
  document.addEventListener('mouseup', stopDrag);
};

// const onDrag = (event) => {
//   // 拖动时，计算鼠标移动距离，调整滚动位置
//   if (!isDragging.value) return;
//   // debug
//   console.log('onDrag');
//   isMouseMoving.value = true;
  
//   const deltaY = event.clientY - startY.value;
//   window.scrollTo({
//     top: startScrollY.value + deltaY,
//     behavior: 'auto'
//   });
// };

// const onDrag = (event) => {
//   if (!isMouseDown.value) return;
//   isMouseMoving.value = true;
//   currentY.value = event.clientY;
//   const dragDistance = currentY.value - startY.value;
//   const documentHeight = document.documentElement.scrollHeight;
//   const windowHeight = window.innerHeight;
//   const maxScroll = documentHeight - windowHeight;
//   const scrollPosition = (dragDistance / 95) * maxScroll;
//   window.scrollTo(0, scrollPosition);
// };

const onDrag = (event) => {
  if (!isMouseDown.value) return;
  currentY.value = event.clientY;
  const dragDistance = currentY.value - startY.value;
  const maxDragDistance = window.innerHeight * 0.95;
  const scrollPosition = (dragDistance / maxDragDistance) * document.documentElement.scrollHeight;
  window.scrollTo(0, scrollPosition);
};

const stopDrag = () => {
  // 松开鼠标时，停止拖动
  // debug
  console.log('stopDrag');
  isMouseUp.value = true;
  isMouseDown.value = false;
  isMouseMoving.value = false;

  isDragging.value = false;
  document.documentElement.classList.remove('no-select');
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('mouseup', stopDrag);

});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
});
</script>

<style lang="scss">
.cd-top-container {
  position: fixed;
  margin-right: 4vw;
  right: 20px;
  top: -95vh; /* 初始位置在视口上方 */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: top 0.5s ease; /* 添加过渡效果 */
  .cd-top {
    position: absolute;
    height: 95vh;
    aspect-ratio: 7 / 90; /* 设置宽高比 */
    background: url('../../assets/images/scroll.png') no-repeat center;
    background-size: contain; /* 确保背景图片按比例缩放 */
  }
}
.no-select {
  user-select: none;
}
/* 隐藏垂直滚动条 */
body::-webkit-scrollbar {
    width: 0;
    height: 0;
}

body::-webkit-scrollbar-track {
    background: transparent;
}

body::-webkit-scrollbar-thumb {
    background: transparent;
}

/* 隐藏水平滚动条 */
body::-webkit-scrollbar-horizontal {
    height: 0;
}

body::-webkit-scrollbar-thumb-horizontal {
    background: transparent;
}
/* 确保页面内容可以滚动 */
body {
    overflow: auto;
}
</style>