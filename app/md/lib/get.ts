import path from "path"
import fs from "fs"
import matter from 'gray-matter';
import { DocMeta } from "../types";
import { content2meta, content2Toc, path2name } from "./to";

export const getFile = (file_path: string) => {
  // 判断是否是绝对路径
  const filePath = path.isAbsolute(file_path)
    ? file_path // 如果是绝对路径，直接使用
    : path.join(process.cwd(), file_path); // 如果是相对路径，拼接到 process.cwd()
  let rawContent = '';

  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return null;
  } 

  try {
    rawContent = fs.readFileSync(filePath, 'utf8');
    // 判断空文件
    if (!rawContent) {
      console.log(`Empty file: ${filePath}`);
      return null;
    }
  } catch (err) {
    console.error(`Failed to read file: ${filePath}`, err);
    return null;
  }
  return rawContent
}

export const getFileWithMeta = (file_path: string) => {
  const rawContent = getFile(file_path)
  if (!rawContent) return {
    metadata: null,
    content: null,
    rawContent: null
  }

  const { data: metadata, content } = matter(rawContent) as unknown as {
    data: DocMeta;
    content: string
  }
  return { metadata, content, rawContent }
};

type ContentWithMetaWithToc = {
  metadata: DocMeta|null;
  content: string;
  rawContent: string|null;
  toc: {
    depth: number;
    value: string;
    slug: string;
  }[];
}
export const getFileWithMetaWithToc = async(file_path: string):Promise<ContentWithMetaWithToc> => {
  const rawContent = getFile(file_path)
  if (!rawContent) return {
    metadata: null,
    content: "",
    rawContent: null,
    toc: []
  }
  const [toc, {metadata, content}, 
    // {url, slug, segments}
  ] = await Promise.all([
    content2Toc(rawContent),
    content2meta(rawContent),
    // processSlug(relativePath)
  ]);
  return { metadata, content, rawContent, toc }
};
