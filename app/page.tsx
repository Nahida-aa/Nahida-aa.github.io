import { Suspense } from 'react';
import { LoadingS } from '@/components/ui/loading/Loading';
import { UserInfo } from './user/user-info';

export default async function Page ({
  // params,
  // searchParams,
}: {
  // params: Promise<{ slug: string }>,
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // const { slug } = await params
  // const { page = '1', sort = 'asc', query = '' } = await searchParams
  return <Suspense fallback={<LoadingS />}>
    <section className='px-4 sm:px-6 w-full min-w-0  flex-1 grid grid-cols-12'>
    <div className='col-span-12'>
      
    Hello, 我的第一个 github pages
    <img src="https://count.getloli.com/get/@Nahida-aa?theme=gelbooru" alt="count" />
    <UserInfo />
    </div>
    </section>
  </Suspense>
}