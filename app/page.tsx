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
    Hello, 我的第一个 github pages
    <UserInfo />
  </Suspense>
}