import type { NextConfig } from 'next';
import createMDX, { NextMDXOptions } from '@next/mdx'
// import type { Options } from '@mdx-js/loader'

const rehypePrettyCode_options = {
  // keepBackground: false, // 是否继承背景色
  defaultLang: "plaintext",
  // theme: moonlightTheme,
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  tokensMap: {
    var: "variable",
    str: "string",
    fn: "entity.name.function",
    cls: "entity.name.class",
  },
};
let remarkPlugins: any[] = []
let rehypePlugins: any[] = []
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  remarkPlugins = [
    // [remarkGfm, {}],
    ['remark-gfm'],
    ['@vcarl/remark-headings'],
    ['remark-frontmatter', {type: 'yaml', marker: '-'}], // 解析 frontmatter 到 语法树
    ['remark-mdx-frontmatter'], // 导出 frontmatter
    // ['remark-mermaidjs'],
    // [remarkMath,{}],
    ['remark-math', {}]
  ]
  rehypePlugins = [
    ['rehype-callouts'],
    // ['rehype-katex', { strict: true, throwOnError: true }]
    // [rehypeMathjax,{}],
    // ['rehype-mermaid'],
    ['rehype-pretty-code', rehypePrettyCode_options],
    ["rehype-mathjax"],
  ]
  // remarkPlugins.push(['remark-gfm'])
  // rehypePlugins.push(['rehype-callouts'])
  // rehypePlugins.push(['rehype-mathjax'])
  // rehypePlugins.push(['rehype-pretty-code', rehypePrettyCode_options])
} else {
}
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
} as NextMDXOptions)


// console.log(`process.env: `, process.env)

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

const plugins = [
  withMDX, // pnpm add @next/mdx, 仅需安装这个来实现
  // withBundleAnalyzer, 
]

// module.exports = nextConfig; js 写法
export default plugins.reduce((prev, item) => item(prev), nextConfig)
