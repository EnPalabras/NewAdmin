import SalesTable from '@/components/SalesTable'
import Sidebar from '@/components/Sidebar'

export default async function Home() {
  return (
    <>
      <Sidebar />
      <main className="md:ml-64 mt-14 pt-6 bg-gray-50 dark:bg-gray-900">
        <SalesTable />
      </main>
    </>
  )
}
