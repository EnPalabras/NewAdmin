import SalesTable from '@/components/SalesTable'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="md:ml-64  mt-10 lg:mt-4">
        <SalesTable />
      </main>
    </>
  )
}
