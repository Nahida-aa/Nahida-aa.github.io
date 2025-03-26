import { title } from "@/components/primitives";
import { getFile } from "../md/lib/get";
import { notFound } from "next/navigation";
import { CustomMDX } from "../md/mdx";
import { Suspense } from "react";
import { LoadingS } from "@/components/ui/loading/Loading";

export default async function BlogPage() {
  const file_path = `app/md/mdx-page/test.mdx`
  // const {default: MdxDoc} = await import(`@/public/blog/alg.json`)
  const { metadata, content, rawContent } = getFile(file_path)
  console.log("metadata:", metadata, "content:", content, "rawContent:", rawContent)
  if (!content) return notFound()
  const {content: JSXContent, frontmatter} = await CustomMDX({ source: rawContent })
  return <Suspense fallback={<LoadingS />}>
  <section className='mx-6'>
  <article className="prose dark:prose-invert  mx-auto max-w-full  ">
    <h1 className={`${title()} flex justify-center `}>{metadata.title}</h1>
    {/* <CustomMDX source={MdxDoc.content} /> */}
    {JSXContent}
    {/* <Content /> */}
  </article>
  </section>
</Suspense>
}
