// import { CompileOptions } from '@mdx-js/mdx';
// export interface SerializeOptions {
//   scope?: Record<string, unknown>;
//   mdxOptions?: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'> & {
//     useDynamicImport?: boolean;
//   };
//   parseFrontmatter?: boolean;
// }

export type DocMeta = {
  title: string; // The page's <h1> title, used for SEO and OG Images. 页面标题 <h1> ，用于 SEO 和 OG 图片
  nav_title?: string; // Overrides the page's title in the navigation. This is useful when the page's title is too long to fit. If not provided, the title field is used. 覆盖页面标题在导航中。当页面标题过长无法适应时很有用。如果未提供，则使用 title 字段。
  description: string; // The page's description, used in the <meta name="description"> tag for SEO. 页面描述，用于 <meta name="description"> 标签的 SEO。
  tags?: string[]; // A list of tags for the page. Used for categorization and filtering. 页面的标签列表。简单分类和过滤。
  created_at?: string; // The date the page was created.  页面创建日期。
  updated_at?: string; // The date the page was last updated. 页面最后更新日期。
  source?: string; // Pulls content into a shared page. See Shared Pages. 拉取内容到共享页面。见共享页面。
  related?: { // A list of related pages at the bottom of the document. These will automatically be turned into cards. See Related Links. 文档底部相关页面列表。这些将自动转换为卡片。参见相关链接。 Links will be automatically generated for pages that have child pages. For example, the Optimizing section has links to all of its child pages. //链接将自动生成，用于具有子页面的页面。例如，优化部分包含对其所有子页面的链接。
    description?: string; // A description of the related content. 相关内容的描述。
    links: string[]; // A list of links to related content. 相关内容的链接列表。
  }
  version?: string //	A stage of development. e.g. experimental,legacy,unstable,RC
}

export type Toc = {
  depth: number
  value: string
  slug: string
}

export type DocSearchValue = {
  title: string // 指定文档的标题
  description: string // 指定文档的描述
  url: string // /blog/2025/10/01/xx.mdx, 指定文档的 URL
  slug: string // 2025/10/01/xx.mdx, 指定文档的 slug, 用于 静态生成
  segments: string[] // ["2025", "10", "01", "xx.mdx"], 指定文档的 slug, 用于 静态生成
  filePath: string // 2025/10/01/xx.mdx 指定文档的相对路径
  meta: DocMeta|null // 指定文档的 meta 信息
  content: string // mdx\md 的去 meta 内容
  toc: Toc[]
}

export type MdxComp = {
  default: typeof import("@/app/md/mdx-page/test.mdx")["default"]
  frontmatter: DocMeta
}