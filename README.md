# Nahida-aa.github.io

如果你有一个名为 Nahida-aa.github.io 的仓库，这意味着你已经或者正在设置一个个人网站，利用 GitHub Pages 服务。GitHub Pages 允许你直接从 GitHub 仓库托管网站内容，非常适合托管静态网站（例如，使用 HTML、CSS 和 JavaScript 创建的网站）。

以下是一些基本步骤来配置和更新你的 GitHub Pages 网站：

- 启用 GitHub Pages：

  - 转到你的仓库设置（Repository settings）。
  - 找到 "GitHub Pages" 部分。
  - 选择你的源分支（通常是 main 或 master），然后点击 "Save"。
- 添加内容：

  - 你的网站内容需要放在你的仓库中。对于一个基本的网站，你至少需要一个 index.html 文件。
  - 你可以直接在 GitHub 上编辑文件，或者在本地编辑后推送到 GitHub。
- 自定义域名（可选）：

  - 如果你想使用自定义域名而不是默认的 nahida-aa.github.io，你可以在仓库的 settings 下的 GitHub Pages 部分设置自定义域名。
- 更新网站：

  - 每当你推送新的更改到你的 GitHub 仓库时，GitHub Pages 将自动重新构建并发布你的网站。
- 访问你的网站：

  - 一旦 GitHub Pages 被激活并且你的仓库中有了网站内容，你就可以通过访问 https://nahida-aa.github.io 来查看你的网站了。
  
记得查看 GitHub 的官方文档来获取更详细的指导和最佳实践。GitHub Pages 是一个强大的工具，可以用来托管个人项目、展示你的简历或者作为一个博客平台。

## jekyll.yml

Jekyll 是一个静态网站生成器，通常用于创建博客和项目文档。它是由 GitHub Pages 支持的，因此非常适合用于托管在 GitHub 上的个人或项目网站。以下是 Jekyll 的一些关键特性：

1. **静态网站生成**：Jekyll 将 Markdown 文件和模板转换为静态 HTML 文件，这些文件可以直接部署到任何 Web 服务器上。

## uniapp-vite-ts-scss

```sh
my-uniapp-project/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── static/                   # 静态资源 
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── Header.vue
│   │   └── Footer.vue
│   ├── pages/                     # 页面组件 (也有写成views的)
│   │   ├── Home.vue
│   │   └── About.vue
│   ├── App.vue                    # 根组件
│   ├── main.ts
│   ├── router/
│   │   └── index.ts
│   ├── store/
│   │   └── index.ts               # 状态管理
│   └── utils/
│       └── api.ts
├── .gitignore
├── index.html                     # 入口 HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### ./index.html

引入 `./src/main.ts` 入口文件，`<meta>` 标签中添加 `viewport-fit=cover` 属性，用于适配 iPhone X 等异形屏设备。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script>
      var coverSupport = 'CSS' in window && typeof CSS.supports === 'function' && (CSS.supports('top: env(a)') ||
        CSS.supports('top: constant(a)'))
      document.write(
        '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
        (coverSupport ? ', viewport-fit=cover' : '') + '" />')
    </script>
    <title></title>
    <!--preload-links-->
    <!--app-context-->
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### ./src/main.ts

```ts
import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  // 创建一个 SSR 应用实例，并将 App 组件作为根组件传入
  const app = createSSRApp(App);
  return {
    app,
  };
}
```

引入 `App.vue` 根组件

还可能会引入路由、状态管理等(可以自己添加)。

### ./src/App.vue

```vue
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
```

### ./src/pages.json

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      //  remove comments content
      // "style": {
      //   "navigationBarTitleText": "首页"
      // }
    },
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    // "backgroundColor": "#F8F8F8"
    "navigationStyle": "custom",  // 取消原生导航栏 (上方的)
    "app-plus": {
      "titleNView": false // 取消标题栏
    }
  },
  "uniIdRouter": {}
}
```

### ./src/router

```sh
pnpm install vue-router
mkdir "src/router"
touch src/router/router.ts
```

```ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import home from '@/pages/home/home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
```

#### ./src/main.ts (导入router)

```ts
import { createSSRApp } from "vue";
import App from "./App.vue";
// import router
import router from "./router/router";

export function createApp() {
  const app = createSSRApp(App);
  // use router (注册 router)
  app.use(router);
  
  return {
    app,
  };
}
```

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
