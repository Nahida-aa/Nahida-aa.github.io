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
  
  // Optionally, add any other Next.js config below
  // reactStrictMode: true,
  // webpack: (config, { isServer }) => {
  //   return config
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
