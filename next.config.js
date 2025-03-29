// const createMDX = require('@next/mdx');

// const rehypePrettyCode_options = {
//   // keepBackground: false, // 是否继承背景色
//   defaultLang: "plaintext",
//   // theme: moonlightTheme,
//   theme: {
//     dark: "github-dark-dimmed",
//     light: "github-light",
//   },
//   tokensMap: {
//     var: "variable",
//     str: "string",
//     fn: "entity.name.function",
//     cls: "entity.name.class",
//   },
// };
console.log('next.config.js')
// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [
//       require('remark-gfm'),
//       [require('remark-frontmatter'), {type: 'yaml', marker: '-'}],
//       require('remark-mdx-frontmatter'),
//       [require('remark-math')]
//     ],
//     rehypePlugins: [
//       require('rehype-callouts'),
//       [require('rehype-pretty-code'), rehypePrettyCode_options],
//       // require('rehype-mathjax'),
//     ],
//   },
// });


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 禁用图片优化
  },
  // Configure `pageExtensions` to include markdown and MDX files
  // pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // 不支持将 mdx 作为模块导入
  pageExtensions: ['js', 'jsx','ts', 'tsx'], // 不支持将 mdx 作为模块导入
  webpack: (config) => {
    // 启用 WebAssembly 支持
    config.experiments = { 
      asyncWebAssembly: true,
      layers: true 
    }
    // 修复 WASM 文件路径问题
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm"
    return config
  },
  // Optionally, add any other Next.js config below
  // reactStrictMode: true,
  // webpack: (config, { isServer }) => {
  //   return config
  // },

  // async headers() { // export 时不支持 headers
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/sw.js',
  //       headers: [
  //         {
  //           key: 'Content-Type',
  //           value: 'application/javascript; charset=utf-8',
  //         },
  //         {
  //           key: 'Cache-Control',
  //           value: 'no-cache, no-store, must-revalidate',
  //         },
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "default-src 'self'; script-src 'self'",
  //         },
  //       ],
  //     },
  //   ]
  // },

  transpilePackages: ['next-mdx-remote'],
};

// const plugins = [
//   // withMDX, // pnpm add @next/mdx, 仅需安装这个来实现
//   // withBundleAnalyzer, 
// ]

module.exports = nextConfig; // CommonJS 写法
// module.exports =  plugins.reduce((prev, item) => item(prev), nextConfig)
// export default plugins.reduce((prev, item) => item(prev), nextConfig)
// export default withMDX(nextConfig)
