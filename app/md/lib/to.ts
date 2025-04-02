import { text2slug } from "@/lib/utils/slug";
import remarkHeadings from "@vcarl/remark-headings";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { DocBase, DocMeta, DocSearchValue, Toc } from "../types";
import path from "path";
import { getFileWithMetaWithToc } from "./get";
import matter from "gray-matter";
import fs from "fs/promises"
import { cleanMarkdown } from "@/app/search/indexer";

const mdProcessor = unified()
.use(remarkParse)
.use(remarkStringify)
.use(remarkFrontmatter)
.use(remarkHeadings);

type ContentWithMeta = {
  metadata: DocMeta;
  content: string;
}
export const content2meta = async (rawContent: string): Promise<ContentWithMeta> => {
  const { data: metadata, content } = matter(rawContent) as unknown as {
    data: DocMeta;
    content: string
  }
  metadata.description = metadata.description || `${cleanMarkdown(content).slice(0, 27)}...` // 取前27个字符 如果不够长则是取全部
  // metadata.title = metadata.title || fileName
  console.log("content2meta: ", metadata)
  return { metadata, content }
}
export const content2Toc = async (content: string): Promise<Toc[]> => {
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

// 2025/10/01/xx.mdx -> 2025/10/01/xx.mdx
// 2025/10/02/xx.md -> 2025/10/01/xx.md
export const path2slug = (relativePath: string): string => relativePath
// 2025/10/01/xx.mdx -> ["2025", "10", "01", "xx.mdx"]
export const path2segments = async (relativePath: string): Promise<string[]> => {
  const segments = relativePath.split("/")
  return segments
}
// 2025/10/01/xx.mdx -> /blog/2025/10/01/xx.mdx
export const path2url = (relativePath: string): string => `/blog/${relativePath}`
// 2025/10/01/xx.mdx -> xx.mdx
export const path2name = (filePath: string): string => {
  // 2025/10/01/xx.mdx -> xx
  // return path.basename(filePath, path.extname(filePath));
  return path.basename(filePath);
}

// /home/aa/repo/docs/123/456/789.mdx , process.cwd()/docs
export const path2MdxJson = async (fullPath: string, contentDir: string): Promise<DocSearchValue> => {
  const relativePath = path.relative(contentDir, fullPath);  // 123/456/789.mdx
  const { metadata, content, rawContent, toc } = await getFileWithMetaWithToc(fullPath)
  return {
    title: metadata.title,
    description: metadata.description,
    url: `/blog/${relativePath}`,
    slug: relativePath,
    segments: relativePath.split("/"),
    filePath: relativePath,
    meta: metadata||null,
    content: content||'',
    toc
  }
}

export const dir2MdxJsonLs = async (contentDir: string): Promise<DocSearchValue[]> => {
  const allDocs: DocSearchValue[] = []
    // Recursive function to process all files in a directory
    const processDir = async (dirPath: string) => {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
  
    // 使用 Promise.all 并行处理所有条目
    await Promise.all(entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {// 并行处理子目录
        await processDir(fullPath);
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        try {
          // 并行处理文件
          const docData = await path2MdxJson(fullPath, contentDir);
          allDocs.push(docData);
        } catch (error) {
          console.error(`Error processing ${fullPath}:`, error);
        }
      }
    }));
  };
  await processDir(contentDir);
  return allDocs
}

export const sortDocsBy_updated_at =  (docs: DocBase[]): DocBase[] => {
  return docs.sort((a, b) => {
    const aDate = a.meta?.updated_at ? new Date(a.meta.updated_at) : new Date(0);
    const bDate = b.meta?.updated_at ? new Date(b.meta.updated_at) : new Date(0);
    return bDate.getTime() - aDate.getTime();
  });
}

type DocTagValue = {
  count: number
  docs: DocBase[]
}
export type DocTagsKV = Record<string, DocTagValue>

export const getTagsKV = (allDocsBase: DocBase[]): DocTagsKV => {
  const tagsMap: DocTagsKV = {};

  allDocsBase.forEach((doc) => {
    const { url, meta } = doc;

    if (meta?.tags) {
      meta.tags.forEach((tag) => {
        if (!tagsMap[tag]) {
          tagsMap[tag] = { count: 0, docs: [] };
        }
        tagsMap[tag].count += 1;
        tagsMap[tag].docs.push({
          url,
          meta,
        });
      });
    }
  });

  return tagsMap;
};