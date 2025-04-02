import path from "path"
import fs from "fs"
import matter from 'gray-matter';
import { DocMeta } from "../types";
import { content2meta, content2Toc, path2name } from "./to";
import { title } from "process";
import { cleanMarkdown } from "@/app/search/indexer";

export const getFile = (file_path: string) => {
  // 判断是否是绝对路径
  const filePath = path.isAbsolute(file_path)
    ? file_path // 如果是绝对路径，直接使用
    : path.join(process.cwd(), file_path); // 如果是相对路径，拼接到 process.cwd()
  let rawContent = '';

  const fileName = path.basename(filePath);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return { rawContent: null, fileName };
  } 

  try {
    rawContent = fs.readFileSync(filePath, 'utf8');
    // 判断空文件
    if (!rawContent) {
      console.log(`Empty file: ${filePath}`);
      return { rawContent: null, fileName };
    }
  } catch (err) {
    console.error(`Failed to read file: ${filePath}`, err);
    // return null;
  }
  
  return { rawContent, fileName };
}

export const getFileWithMeta = (file_path: string) => {
  const {rawContent, fileName} = getFile(file_path)
  if (!rawContent) return {
    metadata: {
      title: fileName
    },
    content: null,
    rawContent: null
  }

  const { data: metadata, content } = matter(rawContent) as unknown as {
    data: DocMeta;
    content: string
  }
  metadata.title = metadata.title || fileName
  metadata.description = metadata.description || `${cleanMarkdown(content).slice(0, 27)}...`
  return { metadata, content, rawContent }
};

type ContentWithMetaWithToc = {
  metadata: DocMeta;
  content: string;
  rawContent: string|null;
  toc: {
    depth: number;
    value: string;
    slug: string;
  }[];
}
export const getFileWithMetaWithToc = async(file_path: string):Promise<ContentWithMetaWithToc> => {
  const {rawContent, fileName} = getFile(file_path)
  if (!rawContent) return {
    metadata: {title: fileName,description: ""},
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
  metadata.title = metadata.title || fileName
  return { metadata, content, rawContent, toc }
};
