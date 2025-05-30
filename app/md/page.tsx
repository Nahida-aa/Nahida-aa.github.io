import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import { CustomMDX } from './mdx';
import { SerializeOptions } from 'node_modules/next-mdx-remote/dist/types';
import { getFile, getFileWithMetaWithToc } from './lib/get';
import { notFound } from 'next/navigation';
import { title } from '@/components/primitives';
import { MdxComp } from './types';
// import 'katex/dist/katex.min.css';

export default async function Page ({
  // searchParams,
}: {
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // const { page = '1', sort = 'asc', query = '' } = await searchParams
  const file_path = `app/md/mdx-page/test.mdx`
  
  // const {default: MdxDoc} = await import(`@/public/blog/alg.json`)
  const { metadata, content, rawContent, toc } = await getFileWithMetaWithToc(file_path)
  // console.log("metadata:", metadata, "content:", content, "rawContent:", rawContent)
  if (!rawContent) return notFound()
  const format = file_path.endsWith('.md') ? 'md' : 'mdx'
  const mdxOptions: SerializeOptions = {
    mdxOptions: {
      format: format as 'md' | 'mdx', // 确保 format 是 'md' 或 'mdx'
    },
  };
  const {content: JSXContent, frontmatter} = await CustomMDX({ source: rawContent, options: mdxOptions })
  // console.log("JSXContent:", JSXContent, 
  //   // "frontmatter:", frontmatter
  // )
  // const Content: MdxComp['default'] = JSXContent as unknown as MdxComp['default']
  // const { default: Content, frontmatter: metadata } = await import("@/app/[locale]/md/test.mdx") as MdxComp
    

  return <Suspense fallback={<LoadingS />}>
  <section className='mx-6'>
  <article className="prose dark:prose-invert  mx-auto max-w-full  ">
    <h1 className={`${title()} flex justify-center `}>{metadata?.title}</h1>
    <p>{metadata?.description}</p>
    {/* <CustomMDX source={MdxDoc.content} /> */}
    {JSXContent}
    {/* <Content /> */}
  </article>
  </section>
</Suspense>
}