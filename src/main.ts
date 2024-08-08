import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
// import './style.css'  // 确保导入样式文件

createApp(App).use(router).mount('#app')
