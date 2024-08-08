<script setup>
import { ref, onMounted } from 'vue';

const items = ref([
  { name: 'Alpha', link: '#' },
  { name: 'Beta', link: '#' },
  { name: 'Gamma', link: '#' },
  { name: 'Delta', link: '#' },
  { name: 'Epsilon', link: '#' }
]);

// 两个滑块
const checked_slide = ref(null);
const track_slide = ref(null);
const nav = ref(null);

// 通用函数：设置滑块位置和宽度
const setSlidePosition = (slide, index) => {
  const position = nav.value.children[index].getBoundingClientRect();
  const navRect = nav.value.getBoundingClientRect();
  slide.style.left = `${position.left - navRect.left}px`;
  slide.style.width = `${position.width}px`;
  slide.style.opacity = 1;
};

// 初始化滑块
const setInitialSlide = () => {
  if (nav.value && nav.value.children[2]) {
    console.log("nav存在");
    setSlidePosition(checked_slide.value, 2);
    
    // 打印当前选中元素的文字
    const currentText = nav.value.children[2].textContent;
    console.log("当前选中元素的文字:", currentText);
  }
};

// 点击事件处理函数
const handleClick = (index) => {
  setSlidePosition(checked_slide.value, index);
};

// 鼠标悬停事件处理函数
const handleMouseOver = (index) => {
  setSlidePosition(track_slide.value, index);
  track_slide.value.classList.add('squeeze');
};

// 鼠标移出事件处理函数
const handleMouseOut = () => {
  track_slide.value.style.opacity = 0;
  track_slide.value.classList.remove('squeeze');
};

onMounted(() => {
  setInitialSlide();
});
</script>

<template>
<div class="nav-container">
  <ul id="nav" ref="nav">
    <li class="checked_slide" ref="checked_slide"></li>
    <li class="track_slide" ref="track_slide"></li>
    <li><a href="#" 
      @click="handleClick(2)" 
      @mouseover="handleMouseOver(2)" 
      @mouseout="handleMouseOut">
      Alpha</a>
    </li>
    <li><a href="#"
      @click="handleClick(3)" 
      @mouseover="handleMouseOver(3)" 
      @mouseout="handleMouseOut">Beta</a></li>
    <li><a href="#" @click="handleClick(4)" 
      @mouseover="handleMouseOver(4)" 
      @mouseout="handleMouseOut">Gamma</a></li>
    <li><a href="#" @click="handleClick(5)" 
      @mouseover="handleMouseOver(5)" 
      @mouseout="handleMouseOut">Delta</a></li>
    <li>
      <a href="#" @click="handleClick(6)" 
        @mouseover="handleMouseOver(6)" 
        @mouseout="handleMouseOut">Epsilon
      </a>
    </li>
  </ul>
</div>
</template>

<style lang="scss">
.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  #nav {
    position: relative;
    border: none;
    border-radius: 10em;
    display: flex;
    list-style: none;
    background: #f5f5f5;
    box-shadow: 20px 40px 40px #00000033;
    padding: 10px;
    li{
      a{
        position: relative;
        padding: 15px 50px;
        font: 500 24px '优设标题黑';
        border: none;
        outline: none;
        color: rgb(70, 100, 180);
        display: inline-block;
        text-decoration: none;
        z-index: 3;
      }
    }
    .checked_slide,
    .track_slide {
      position: absolute;
      display: inline-block;
      height: 60px;
      border-radius: 10em;
      // 
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
    }
    .checked_slide {
      background-color: rgb(170, 190, 255);
      z-index: 2;
    }
    .track_slide {
      opacity: 0;
      background-color: rgba(170, 190, 255, 0.5);
      z-index: 1;
      box-shadow: 0 0 20px #ffffffaa inset;
    }
    .squeeze {
      transform: scale(0.9);
    }
  }
}

@media (max-width: 768px) {
  .nav-container {
    #nav {
      flex-direction: column;
      
      li {
        a {
          padding: 10px 20px;
          font-size: 20px;
        }
      }
      
      .checked_slide,
      .track_slide {
        height: 40px;
      }
    }
  }
}
</style>