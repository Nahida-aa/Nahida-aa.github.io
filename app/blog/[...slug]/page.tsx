import { JSX, Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import { getFile, getFileWithMetaWithToc } from '@/app/md/lib/get';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/app/md/mdx';
import { title } from '@/components/primitives';
import { DocsToc } from '@/app/md/comp/DocsToc';
import { dir2MdxJsonLs } from '@/app/md/lib/to';
import { contentDir } from '@/app/settings/path';
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata({ params, 
  // searchParams 
}: {
    params: Promise<{ slug: string[] }>
    // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
  const dSlug = slug.join('/')
  const { metadata, content, rawContent, toc } = await getFileWithMetaWithToc(`docs/${dSlug}`)

  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export const generateStaticParams = async() => {
  const allDocs = await dir2MdxJsonLs(contentDir)
  const params: { slug: string[] }[] = [
    // {slug: ['2025', '03', '25', 'alg.mdx']},
    // {slug: ['2025', '03', '26', 'bfs.mdx']},
    // {slug: ['2025', '03', '27', 'dfs.mdx']},
    // {slug: ['2025', '03', '28', 'Union-Find.mdx']},
  ];
  allDocs.forEach((doc) => {
    const { segments } = doc
    params.push({ slug: segments })
  })
  return params
}

export default async function Page ({
  params,
}: {
  params: Promise<{ slug: string[] }>,
}) {
  const { slug } = await params
  const dSlug = slug.join('/')
  const { metadata, content, rawContent, toc } = await getFileWithMetaWithToc(`docs/${dSlug}`)
  if (!rawContent) return notFound()
  const {content: JSXContent, frontmatter} = await CustomMDX({ source: rawContent })
  const Content = (): JSX.Element => JSXContent;
  return <Suspense fallback={<LoadingS />}>
  <section className='px-4 sm:px-6 w-full min-w-0  flex-1 grid grid-cols-12'>
    <article className="prose dark:prose-invert  col-span-12 lg:col-span-9 lg:px-4 xl:col-span-9 xl:px-8
    mx-auto w-full min-w-0 max-w-full ">
      <h1 className={`${title()} flex justify-center `}>{metadata?.title||'Title'}</h1>
      <p>{metadata?.description|| 'description'}</p>
      <Content />
    </article>
    <DocsToc toc={toc} />
  </section>
  </Suspense>
}