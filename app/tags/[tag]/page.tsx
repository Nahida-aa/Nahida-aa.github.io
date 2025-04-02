import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import tagsJson from '@/public/data/tags.json';
import { DocLs } from '@/app/blog/_comp/DocLs';
import { DocTagsKV } from '@/app/md/lib/to';
const tagObjsKV: DocTagsKV = tagsJson

export const generateStaticParams = async() => {
  
  const params: { tag: string }[] = [
    ...Object.keys(tagObjsKV).map((tag) => ({ tag })),
  ];
  return params
}
export default async function Page ({
  params,
  // searchParams,
}: {
  params: Promise<{ tag: string }>,
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { tag } = await params
  const { docs: docsBase} = tagObjsKV[tag]
  // const { page = '1', sort = 'asc', query = '' } = await searchParams
  return <Suspense fallback={<LoadingS />}>
    <article className="prose dark:prose-invert  col-span-12 lg:px-4  xl:px-8
    mx-auto w-full min-w-0 max-w-full ">
    <DocLs allDocs={docsBase} />
    </article>
  </Suspense>
}