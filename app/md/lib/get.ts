import path from "path"
import fs from "fs"
import matter from 'gray-matter';
import { DocMeta } from "../types";
import { mdContent2Toc } from "./to";

export const getFile = (file_path: string) => {
  // console.log(`getFile: ${file_path}`)
  const filePath = path.join(process.cwd(),`${file_path}`)
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

export const getFileWithMetaWithToc = async(file_path: string) => {
  const rawContent = getFile(file_path)
  if (!rawContent) return {
    metadata: null,
    content: null,
    rawContent: null,
    toc: []
  }
  const [toc, {data:metadata, content}, 
    // {locale,type,url, slug, segments, order}
   ] = await Promise.all([
    mdContent2Toc(rawContent),
    matter(rawContent),
    // processSlug(relativePath)
  ]);
  return { metadata, content, rawContent, toc }
};