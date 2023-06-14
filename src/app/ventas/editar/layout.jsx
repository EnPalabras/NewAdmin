import Sidebar from '@/components/Sidebar'

export default async function Cargar({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <Sidebar />{' '}
      <section className="bg-gray-50 dark:bg-gray-900">{children}</section>
    </>
  )
}
