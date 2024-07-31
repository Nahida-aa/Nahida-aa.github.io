import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/Home.vue';
import Demo from '../pages/Demo/Demo.vue';
import About from '../pages/About/About.vue';
import track_nav from '../components/nav/track-nav.vue';
import track_nav_css from '../components/nav/track-nav-css.vue';
import sky_js from '../components/bg/sky-js.vue';
// import Component2 from '../components/Component2.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/demo', component: Demo },
  { path: '/about', component: About },
  { path: '/nav/track_nav', component: track_nav },
  { path: '/nav/track_nav_css', component: track_nav_css },
  { path: '/bg/sky_js', component: sky_js },
//   { path: '/demo/component2', component: Component2 },
  // 添加更多路由以测试其他组件和页面
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;