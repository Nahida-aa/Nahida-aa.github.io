<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 导入图标路径的函数
const getIconPath = (iconName) => new URL(`../../assets/icons/${iconName}.svg`, import.meta.url).href;

const navItems = ref([
  { name: 'Home', link: '/', icon: getIconPath('城堡') },
  // { name: 'Demo', link: '/demo', icon: getIconPath('1组件示例') },
  { name: 'Article', link: '/article', icon: getIconPath('file-markdown') },
  { name: 'Guestbook', link: '/guestbook', icon: getIconPath('留言板1') },
  { name: 'Friend', link: '/friend', icon: getIconPath('友情链接') },
  { name: 'About', link: '/about', icon: getIconPath('树叶') }
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
const setInitialSlide = (route) => {
  const index = navItems.value.findIndex(item => item.link === route.path);
  if (nav.value && nav.value.children[index]) {
    console.log("nav存在");
    setSlidePosition(checked_slide.value, index);
    
    // 打印当前选中元素的文字
    const currentText = nav.value.children[index].textContent;
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

const route = useRoute();
const router = useRouter();

onMounted(() => {
  setInitialSlide(route);
  window.addEventListener('resize', () => setInitialSlide(route));
});

router.beforeEach((to, from, next) => {
  setInitialSlide(to);
  next();
});
</script>

<template>
<div class="nav-container">
  <ul id="nav" ref="nav">

    <li v-for="(item, index) in navItems" :key="item.name" class="nav-item">
      <router-link :to="item.link" @click="handleClick(index)"
        @mouseover="handleMouseOver(index)" @mouseout="handleMouseOut"
      >
        <img v-if="item.icon" :src="item.icon" alt="" class="nav-icon" />
        <span class="nav-text">{{ item.name }}</span>
      </router-link>
    </li>
    <li class="checked_slide" ref="checked_slide"></li>
    <li class="track_slide" ref="track_slide"></li>
  </ul>
</div>
<div class="nav-placeholder"></div> <!-- 占位符 -->
<router-view></router-view>
</template>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  align-items: center;
  width: 100vw;
  height: auto; // 根据内容自动调整高度
  position: fixed; // 固定定位
  top: 0; // 距离顶部 0
  left: 0; // 距离左侧 0
  background: rgba(245, 245, 245, 0.1); // 半透明背景
  backdrop-filter: blur(10px); // 磨砂玻璃效果
  box-shadow: 20px 40px 40px #00000033;
  #nav {
    position: relative;
    border: none;
    display: flex;
    list-style: none;
    padding: 1vh 1vw;
    li{
      align-items: center;
      a{
        position: relative;
        padding: 1vh 1vw;
        border: none;
        outline: none;
        color: rgb(70, 100, 180);
        display: flex;
        text-decoration: none;
        z-index: 3;
        .nav-icon {
          width: 2vw; /* 设置图标宽度 */
          height: 2vh; /* 设置图标高度 */
          margin-right: 0.5vw; /* 设置图标与文字之间的间距 */
        }
        .nav-text{
          font: 500 2vw '优设标题黑';
          line-height: 2vh;
        }
      }
    }
    .checked_slide,
    .track_slide {
      position: absolute;
      display: inline-block;
      height: 4vh;
      border-radius: 10em;
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
.nav-placeholder {
  height: 7vh; /* 设置占位符的高度与导航栏的高度相同 */
}
</style>