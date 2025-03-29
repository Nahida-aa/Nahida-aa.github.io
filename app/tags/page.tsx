import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';

export default async function Page ({
}: {
}) {
  return <Suspense fallback={<LoadingS />}>
    <article className="prose dark:prose-invert  col-span-12 lg:px-4  xl:px-8
    mx-auto w-full min-w-0 max-w-full ">
    <h1>Page</h1>
    <p>This is the Page page.</p>
    </article>
  </Suspense>
}