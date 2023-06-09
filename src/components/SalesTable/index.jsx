'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export const TableHeader = ({
  search,
  editSearch,
  channel,
  editChannel,
  searchButton,
}) => {
  console.log(channel)
  return (
    <div className="flex flex-col px-2 py-4 w-full justify-between gap-y-2 gap-2 md:gap-4">
      <div className="flex flex-row justify-between gap-2 w-full">
        <div className="relative w-full items-center">
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="TN-18989..."
            required
          />
        </div>

        <select
          id="channel"
          onChange={(e) => editChannel(e.target.value)}
          class="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="all" disabled>
            Canal
          </option>
          <option value="all">Todos</option>
          <option value="Tienda Nube">Tienda Nube</option>
          <option value="Mercado Libre">Mercado Libre</option>
          <option value="Reventa">Reventa</option>
          <option value="Regalo">Regalos</option>
        </select>
      </div>

      <div className="flex flex-row justify-between gap-2">
        <button
          onClick={searchButton}
          className="flex items-center w-full  justify-center px-4 py-4 text-sm font-medium text-gray-900 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          Buscar
        </button>
        <Link
          href="/cargar"
          className="flex items-center w-full  justify-center px-4 py-4 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          Agregar Venta
        </Link>
      </div>
    </div>
  )
}

const canalColors = {
  'Mercado Libre':
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Tienda Nube':
    'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
  Regalo: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
}

// ;<div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
const useSalesData = (pagination, salesChannel, search) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    `https://serverep-production.up.railway.app/api/ventas/get-orders?page=${pagination}&sales=${salesChannel}&search=${search}`,
    fetcher
  )

  const salesData = data || { orders: [] }

  return { salesData, error, isLoading }
}

export function useDebounce(value, timeout) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), timeout)

    return () => clearTimeout(handler)
  }, [value, timeout])

  return debouncedValue
}

export default function SalesTable() {
  const [pagination, setPagination] = useState(1)
  const [salesChannel, setSalesChannel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [queries, setQueries] = useState({
    sales: salesChannel,
    search: searchQuery,
  })
  // const debouncedSearchQuery = useDebounce(searchQuery, 2000)

  const { salesData, error, isLoading } = useSalesData(
    pagination,
    queries.sales,
    queries.search
  )

  const reloadSearch = () => {
    setQueries({
      sales: salesChannel,
      search: searchQuery,
    })
  }

  if (error) return <div>failed to load</div>

  return (
    <section className="mx-auto py-2">
      <div className="px-4 mx-auto lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <TableHeader
            search={searchQuery}
            editSearch={setSearchQuery}
            channel={salesChannel}
            editChannel={setSalesChannel}
            searchButton={reloadSearch}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 striped">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="hidden xl:table-cell px-4 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3 ">
                    Canal
                  </th>
                  <th scope="col" className="px-4 py-3 hidden xl:table-cell">
                    Estado
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Orden
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="hidden xl:table-cell px-4 py-3">
                    Productos
                  </th>

                  <th scope="col" className="px-4 py-3"></th>
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
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                          <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                          <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                          <p className="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                      </tr>
                    )
                  })}
                {salesData.orders.map((sale) => {
                  return (
                    <tr
                      key={sale.idEP}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                        <div className="flex items-center">
                          {
                            new Date(sale.fechaCreada)
                              .toLocaleString()
                              .split(',')[0]
                          }
                        </div>
                      </td>

                      <td className="px-4 py-2">
                        {}
                        <span
                          className={`bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 ${
                            canalColors[sale.canalVenta] || ''
                          } text-xs whitespace-nowrap font-medium px-2 py-1 text-center rounded `}
                        >
                          {sale.canalVenta}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                        <div className="flex items-center">{sale.estado}</div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {sale.idEP}
                      </td>

                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap max-w-[150px] truncate dark:text-white">
                        {sale.nombre.split(' ', 3).join(' ')}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                        <span className="text-gray-500 dark:text-gray-400">
                          {sale.Products.length}
                        </span>{' '}
                      </td>

                      <td className="px-2 py-1">
                        <Link
                          href={`/ventas/${sale.idEP}`}
                          className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                        >
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
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
              Mostrando{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10{' '}
              </span>
              de{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>

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
          </nav>
        </div>
      </div>
    </section>
  )
}
