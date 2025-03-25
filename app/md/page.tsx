import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import { CustomMDX } from './mdx';
import { SerializeOptions } from 'node_modules/next-mdx-remote/dist/types';
import { getFile } from './lib/get';
import { notFound } from 'next/navigation';
import { title } from '@/components/primitives';
import { MdxComp } from './types';
// import 'katex/dist/katex.min.css';

export default async function Page ({
  params,
  // searchParams,
}: {
  params: Promise<{ locale: string }>,
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  console.log("md:locale:", locale)
  // const { page = '1', sort = 'asc', query = '' } = await searchParams
  const file_path = `app/md/test.mdx`
  const { metadata, content, rawContent } = getFile(file_path)
  // console.log("metadata:", metadata, "content:", content, "rawContent:", rawContent)
  if (!content) return notFound()
  const {content: JSXContent, frontmatter} = await CustomMDX({ source: rawContent })
  console.log("JSXContent:", JSXContent, 
    // "frontmatter:", frontmatter
  )
  // const Content: MdxComp['default'] = JSXContent as unknown as MdxComp['default']
  // const { default: Content, frontmatter: metadata } = await import("@/app/[locale]/md/test.mdx") as MdxComp
    
  // const format = 'mdx';
  // const mdxOptions: SerializeOptions = {
  //   mdxOptions: {
  //     format: format as 'md' | 'mdx', // 确保 format 是 'md' 或 'mdx'
  //   },
  // };
  try {
    return <Suspense fallback={<LoadingS />}>
    <section className='mx-6'>
    <article className="prose dark:prose-invert  mx-auto max-w-full  ">
      <h1 className={`${title()} flex justify-center `}>{metadata.title}</h1>
      {JSXContent}
      {/* <Content /> */}
    </article>
    </section>
  </Suspense>
    // 可能抛出错误的代码
  } catch (error: any) {
      console.log('Error occurred:', error);
      return <div>{error}</div>;
  }

}