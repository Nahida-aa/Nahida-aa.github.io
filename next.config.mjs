// import type { NextConfig } from 'next';
// import createMDX, { NextMDXOptions } from '@next/mdx'
import createMDX from '@next/mdx'
// import type { Options } from '@mdx-js/loader'
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkMath from 'remark-math';
import rehypeCallouts from 'rehype-callouts';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeMathjax from 'rehype-mathjax';

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

const isDev = process.env.NODE_ENV === 'development'

// let withMDX: (config: NextConfig) => NextConfig
let withMDX;

if (isDev) {
  const mdxCfg = {
    // Add markdown plugins here, as desired
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [
        // [remarkGfm, {}],
        ['remark-gfm'],
        // ['@vcarl/remark-headings'],
        ['remark-frontmatter', {type: 'yaml', marker: '-'}], // 解析 frontmatter 到 语法树
        ['remark-mdx-frontmatter'], // 导出 frontmatter
        // ['remark-mermaidjs'],
        // [remarkMath,{}],
        ['remark-math', {}]
      ],
      rehypePlugins: [
        ['rehype-callouts'],
        // ['rehype-katex', { strict: true, throwOnError: true }]
        // [rehypeMathjax,{}],
        // ['rehype-mermaid'],
        ['rehype-pretty-code', rehypePrettyCode_options],
        ["rehype-mathjax"],
      ],
    },
  }
  withMDX = createMDX(mdxCfg)
} else {
  withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [
        remarkGfm,
        [remarkFrontmatter, {type: 'yaml', marker: '-'}],
        remarkMdxFrontmatter,
        [remarkMath, {}]
      ],
      rehypePlugins: [
        rehypeCallouts,
        [rehypePrettyCode, rehypePrettyCode_options],
        rehypeMathjax,
      ],
    },
  });
}

// console.log(`process.env: `, process.env)
const STATIC_EXPORT = process.env.STATIC_EXPORT
const output = STATIC_EXPORT ? "export" : undefined
const images = STATIC_EXPORT ? {
    unoptimized: true, // 禁用图片优化
  } : undefined

// /** @type {import('next').NextConfig} */
const nextConfig = {
  output,
  images,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    return config
  },
  transpilePackages: ['next-mdx-remote'],
};

const plugins = [
  withMDX, // pnpm add @next/mdx, 仅需安装这个来实现
  // withBundleAnalyzer, 
]

// module.exports = nextConfig; CommonJS 写法
// export default plugins.reduce((prev, item) => item(prev), nextConfig)
export default withMDX(nextConfig)
