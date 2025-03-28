import { text2slug } from "@/lib/utils/slug";
import remarkHeadings from "@vcarl/remark-headings";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { Toc } from "../types";

const mdProcessor = unified()
.use(remarkParse)
.use(remarkStringify)
.use(remarkFrontmatter)
.use(remarkHeadings);

export const mdContent2Toc = async (content: string): Promise<Toc[]> => {
  const vfile = await mdProcessor.process(content);
  // Place to store custom info (default: {}).
  // 翻译: 存储自定义信息的地方（默认值：{}）。
  // It’s OK to store custom data directly on the file but moving it to data is recommended.
  // 翻译: 将自定义数据直接存储在文件上是可以的，但建议将其移动到 data 上。
  const data = vfile.data as {
    headings: {depth: number
      value: string}[]
  }
  const toc = data.headings.map((heading) => ({
    depth: heading.depth,
    value: heading.value,
    slug: text2slug(heading.value)
  }))
  // console.log(`processMdxGenTocList:toc: `, toc)
  return toc
}