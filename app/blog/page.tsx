import { title } from "@/components/primitives";
import { getFileWithMeta, getFileWithMetaWithToc } from "../md/lib/get";
import { notFound } from "next/navigation";
import { CustomMDX } from "../md/mdx";
import { JSX, Suspense } from "react";
import { LoadingS } from "@/components/ui/loading/Loading";
import { DocsToc } from "../md/comp/DocsToc";

export default async function BlogPage() {
  const file_path = `app/md/mdx-page/test.mdx`
  // const {default: MdxDoc} = await import(`@/public/blog/alg.json`)
  const { metadata, content, rawContent, toc } = await getFileWithMetaWithToc(file_path)
  console.log("metadata:", metadata, "content:", content, "rawContent:", rawContent)
  if (!content) return notFound()
  const {content: JSXContent, frontmatter} = await CustomMDX({ source: rawContent })
  // const Content = (): JSX.Element => JSXContent;
  return <Suspense fallback={<LoadingS />}>
  <section className='px-4 sm:px-6 w-full min-w-0  flex-1 grid grid-cols-12'>
    <article className="prose dark:prose-invert  col-span-12 lg:col-span-9 lg:px-4 xl:col-span-9 xl:px-8
    mx-auto w-full min-w-0 max-w-full ">
      <h1 className={`${title()} flex justify-center `}>{metadata?.title||'Title'}</h1>
      <p>{metadata?.description}</p>
      {/* <CustomMDX source={MdxDoc.content} /> */}
      {JSXContent}
      {/* <Content /> */}
    </article>
    <DocsToc toc={toc} />
  </section>
</Suspense>
}
