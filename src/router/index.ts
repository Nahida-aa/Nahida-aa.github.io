import { 
  createRouter, 
  createWebHistory,
  // createWebHashHistory
} from 'vue-router';
import Home from '../pages/Home/Home.vue';
import Demo from '../pages/Demo/Demo.vue';
import About from '../pages/About/About.vue';
import trackNav from '../components/nav/track-nav.vue';
import track_nav_css from '../components/nav/track-nav-css.vue';
import sky_js from '../components/bg/sky_js.vue';
import coTop_test from '../components/floatBtn/cd-top_test.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/demo', component: Demo },
  { path: '/about', component: About },
  { path: '/nav/trackNav', component: trackNav },
  { path: '/nav/track-nav-css', component: track_nav_css },
  { path: '/bg/sky_js', component: sky_js },
  { path: '/floatBtn/cd-top_test', component: coTop_test },
  // 添加更多路由以测试其他组件和页面
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

export default router;