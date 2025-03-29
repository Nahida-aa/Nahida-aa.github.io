export default async function Layout({ 
  children,
}: {
  children: React.ReactNode,
}) {
  return <section className='px-4 sm:px-6 w-full min-w-0  flex-1 grid grid-cols-12'>
    {children}
  </section>
}