'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { redirect } from 'next/navigation'
import { Toast } from 'flowbite-react'

export const TableHeader = ({ search, editSearch, searchButton }) => {
  return (
    <div className="flex flex-col px-2 py-4 w-full justify-between gap-y-2 gap-2 md:gap-4">
      <form onSubmit={searchButton}>
        <div className="flex flex-row justify-between gap-2 w-full">
          <div className="relative w-3/4 items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            <input
              type="search"
              id="default-search"
              value={search}
              onChange={(e) => editSearch(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              placeholder="TN-18989..."
              required
            />
          </div>
          <div className="flex flex-row w-1/4 justify-between gap-2">
            <button className="flex items-center w-full  justify-center px-4 py-4 text-sm font-medium text-gray-900 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 ">
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const canalColors = {
  'Mercado Libre':
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Tienda Nube':
    'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
  Regalo: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  unshipped: 'bg-primary-100 text-primary-800 ',
  shipped: 'bg-green-500 text-white ',
}

const useSalesData = (pagination, search) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    `https://serverep-production.up.railway.app/api/ventas/retiro-local?page=${pagination}&search=${search}`,
    fetcher
  )

  const salesData = data || { orders: [] }

  return { salesData, error, isLoading }
}

export default function LocalSales() {
  const [pagination, setPagination] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [queries, setQueries] = useState({
    search: searchQuery,
  })

  const { salesData, error, isLoading } = useSalesData(
    pagination,
    queries.search
  )
  useEffect(() => {
    if (salesData.orders.length === 1) {
      redirect(`/retiros/${salesData.orders[0].idEP}`)
    }
  }, [salesData])

  const reloadSearch = (e) => {
    e.preventDefault()
    setQueries({
      search: searchQuery,
    })
  }

  const showAll = (e) => {
    e.preventDefault()
    setPagination(1)
    setQueries({
      search: '',
    })
  }

  if (error) return <div>failed to load</div>

  const Pagination = () => {
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px cursor-pointer">
          <li>
            <div
              onClick={() => {
                if (pagination === 1) return
                setPagination(pagination - 1)
              }}
              className="flex items-center justify-center h-full py-1.5 px-4 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
          {[
            pagination - 2,
            pagination - 1,
            pagination,
            pagination + 1,
            pagination + 2,
            pagination + 3,
            pagination + 4,
          ]
            .filter((page) => page > 0)
            .slice(0, 5)
            .map((page, index) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => setPagination(page)}
                    className={
                      page === pagination
                        ? 'flex items-center justify-center px-4 py-2.5 text-sm leading-tight text-blue-500 bg-blue-200 border border-gray-300 hover:bg-blue-400 hover:text-blue-800 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white'
                        : 'flex items-center justify-center px-4 py-2.5 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }
                  >
                    {page}
                  </a>
                </li>
              )
            })}

          <li>
            <div
              onClick={() => setPagination(pagination + 1)}
              className="flex items-center justify-center h-full py-2 px-4 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <div className="relative bg-white shadow-md sm:rounded-lg my-10 mx-2 sm:mx-auto sm:w-4/5 md:w-3/4">
      <TableHeader
        search={searchQuery}
        editSearch={setSearchQuery}
        searchButton={reloadSearch}
      />
      <div className="flex flex-row justify-between items-center px-2 py-4 w-full">
        <Pagination />
        <div>{salesData.orders.lenght}</div>
        <div className="flex flex-row justify-end gap-4 w-full">
          <div>
            <button
              onClick={showAll}
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Ver Todos
            </button>
          </div>
          <Link href={`/retiros/estadisticas`}>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Estadísticas
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className=" py-3 text-center text-sm">
                Estado
              </th>
              <th scope="col" className=" py-3 text-center text-sm">
                Orden
              </th>
              <th
                scope="col"
                className=" py-3 text-center text-sm hidden lg:table-cell "
              >
                Fecha
              </th>
              <th scope="col" className=" py-3 text-center text-sm">
                Nombre
              </th>

              <th
                scope="col"
                className=" py-3 text-center text-sm hidden lg:table-cell"
              >
                Accion
              </th>

              <th scope="col" className=" py-3 text-center text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              [...Array(20)].map((_, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap hidden lg:table-cell ">
                      <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap  hidden lg:table-cell">
                      <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                      <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                      <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                      <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                    </td>
                  </tr>
                )
              })}

            {salesData.orders.map((sale) => {
              return (
                <tr
                  key={sale.idEP}
                  className="border-b dark:border-gray-600 hover:bg-gray-100"
                >
                  <td className="py-4 text-center ">
                    {sale.Payments[0].estado !== 'paid' &&
                    sale.Payments[0].estado !== 'Pagado' ? (
                      <span
                        className={`bg-yellow-100 text-yellow-800 text-sm whitespace-nowrap font-medium px-2 py-1 text-center rounded `}
                      >
                        Pago Pendiente
                      </span>
                    ) : (
                      <span
                        className={`${
                          canalColors[`${sale.Shipment[0].estado}`] ||
                          'bg-primary-100 text-primary-800 '
                        } text-sm whitespace-nowrap font-medium px-2 py-1 text-center rounded `}
                      >
                        {sale.Shipment[0].estado === 'shipped'
                          ? 'Entregado'
                          : 'Entrega Pendiente'}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 font-medium text-cyan-500 font-semibold whitespace-nowrap text-center text-sm">
                    <Link href={`/retiros/${sale.idEP}`}>
                      #{sale.idEP.split('-')[1]}
                    </Link>
                  </td>
                  <td className=" px-2 py-2 font-medium text-gray-900 text-center whitespace-nowrap  text-sm hidden lg:table-cell">
                    {new Date(sale.fechaCreada)
                      .toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                      .split(' ', 3)
                      .join(' ')}
                  </td>

                  <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap max-w-[150px] truncate text-sm text-center">
                    {sale.nombre}
                  </td>

                  <td className="px-2 py-4 text-center hidden lg:table-cell">
                    <Link
                      href={`/retiros/${sale.idEP}`}
                      className="py-2 px-3 rounded-md hover:bg-[rgba(2,156,220,.15)] transition duration-200 ease-in-out text-cyan-500 font-semibold text-sm"
                    >
                      <button className="text-cyan-500 ">Ver Venta</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <nav
        className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Mostrando <span className="font-semibold text-gray-900 ">1-10 </span>
          de <span className="font-semibold text-gray-900 ">1000</span>
        </span>

        <Pagination />
      </nav>
    </div>
  )
}
