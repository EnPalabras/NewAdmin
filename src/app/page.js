import SalesTable from '@/components/SalesTable'
import Sidebar from '@/components/Sidebar'

export default async function Home() {
  // const sales = await getSales()

  return (
    <>
      <Sidebar />
      <main className="md:ml-64 mt-14 pt-6 bg-gray-50 dark:bg-gray-900">
        <SalesTable />
      </main>
    </>
  )
}

// async function getSales() {
//   const res = await fetch(
//     'https://serverep-production.up.railway.app/api/ventas/get-orders',
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       next: {
//         revalidate: 10,
//       },
//     }
//   )
//   if (!res.ok) {
//     throw new Error(res.status)
//   }

//   const data = await res.json()

//   return data
// }
