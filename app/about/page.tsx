import { JSX, Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';

import { SerializeOptions } from 'node_modules/next-mdx-remote/dist/types';

import { notFound } from 'next/navigation';
import { title } from '@/components/primitives';
import { getFileWithMeta, getFileWithMetaWithToc } from '../md/lib/get';
import { CustomMDX } from '../md/mdx';
import { DocsToc } from '../md/comp/DocsToc';


export default async function Page ({
  // searchParams,
}: {
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // const { page = '1', sort = 'asc', query = '' } = await searchParams
  const file_path = `app/md/mdx-page/about.md`
  
  // const {default: MdxDoc} = await import(`@/public/blog/alg.json`)
  const { metadata, content, rawContent, toc } = await getFileWithMetaWithToc(file_path)
  // console.log("metadata:", metadata, "content:", content, "rawContent:", rawContent)
  if (!content) return notFound()
  const format = file_path.endsWith('.md') ? 'md' : 'mdx'
  const mdxOptions: SerializeOptions = {
    mdxOptions: {
      format: format as 'md' | 'mdx', // 确保 format 是 'md' 或 'mdx'
    },
  };
  const {content: JSXContent, frontmatter} = await CustomMDX({ source: rawContent, options: mdxOptions })
  const Content = (): JSX.Element => JSXContent;
  return <Suspense fallback={<LoadingS />}>
  <section className='px-4 sm:px-6 w-full min-w-0  flex-1 grid grid-cols-12'>
    <article className="prose dark:prose-invert  col-span-12 lg:col-span-9 lg:px-4 xl:col-span-9 xl:px-8
    mx-auto w-full min-w-0 max-w-full ">
      <h1 className={`${title()} flex justify-center `}>{metadata?.title}</h1>
      <p>{metadata?.description}</p>
    {/* <CustomMDX source={MdxDoc.content} /> */}
    {/* {JSXContent} */}
      <Content />
    </article>
    <DocsToc toc={toc} />
  </section>
  {/* <section>下面TODO</section> */}
</Suspense>
}