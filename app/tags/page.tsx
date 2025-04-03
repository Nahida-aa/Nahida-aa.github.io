import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import { DocLs } from '../blog/_comp/DocLs';
import { DocsToc } from '../md/comp/DocsToc';
import { DocTagsKV, getTagsKV } from '../md/lib/to';
import { Toc } from '../md/types';
import { toDocBaseList } from '../md/lib/dirTo';
import { contentDir } from '../settings/path';

export default async function Page ({
}: {
}) {
  const tagObjsKV = getTagsKV(await toDocBaseList(contentDir))
  const sortedKeys = Object.keys(tagObjsKV).sort(); // ["api", "html", "web"]

  const toc: Toc[] = sortedKeys.flatMap((tag) => {
    const { docs } = tagObjsKV[tag]
    return [
      {
        depth: 2,
        slug: tag,
        value: tag,
      },
      ...docs.map((doc) => ({
        depth: 3,
        slug: doc.url,
        value: doc.meta.nav_title || doc.meta.title,
      })),
    ];
  })
  return <Suspense fallback={<LoadingS />}>
    <article className="prose dark:prose-invert  col-span-12 lg:col-span-9 lg:px-4  xl:px-8
    mx-auto w-full min-w-0 max-w-full ">
      {sortedKeys.map((tag => (<div key={tag}>
        <h2 key={tag} id={tag}>
          <a href={`/tags/${tag}`}>{tag}</a>
        </h2>
        <DocLs allDocs={tagObjsKV[tag].docs} />
      </div>
      )))}
    </article>
    <DocsToc toc={toc} />
  </Suspense>
}