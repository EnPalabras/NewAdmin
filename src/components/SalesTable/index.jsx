'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export const TableHeader = () => {
  return (
    <div class="flex flex-row py-4 w-full justify-between gap-y-2 gap-2 md:gap-8">
      <form class="mx-2 w-full max-w-[550px]">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="TN-18989..."
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
          >
            Buscar
          </button>
        </div>
      </form>

      <Link
        href="/cargar"
        class="flex items-center mx-2 w-full max-w-[150px] justify-center px-4 py-4 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        Agregar Venta
      </Link>
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

// ;<div class="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
const useSalesData = (pagination) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    `https://serverep-production.up.railway.app/api/ventas/get-orders?page=${pagination}`,
    fetcher
  )

  const salesData = data || { orders: [] }

  return { salesData, error, isLoading }
}

export default function SalesTable() {
  const [pagination, setPagination] = useState(1)

  const { salesData, error, isLoading } = useSalesData(pagination)

  if (error) return <div>failed to load</div>

  return (
    <section class="mx-auto py-2">
      <div class="px-4 mx-auto lg:px-12">
        <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <TableHeader />
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="hidden xl:table-cell px-4 py-3">
                    Fecha
                  </th>
                  <th scope="col" class="px-4 py-3 ">
                    Canal
                  </th>
                  <th scope="col" class="px-4 py-3 hidden xl:table-cell">
                    Estado
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Orden
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Nombre
                  </th>
                  <th scope="col" class="hidden xl:table-cell px-4 py-3">
                    Productos
                  </th>
                  <th scope="col" class="hidden xl:table-cell px-4 py-3">
                    Tipo Envío
                  </th>
                  <th scope="col" class="px-4 py-3 text-center">
                    Total
                  </th>
                  <th scope="col" class="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  [...Array(20)].map((_, index) => {
                    return (
                      <tr
                        key={index}
                        class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                          <p class="leading-relaxed h-5 animate-pulse bg-gray-400 border-radius-20 rounded"></p>
                        </td>
                      </tr>
                    )
                  })}
                {salesData.orders.map((sale) => {
                  return (
                    <tr
                      key={sale.idEP}
                      class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                        <div class="flex items-center">
                          {
                            new Date(sale.fechaCreada)
                              .toLocaleString()
                              .split(',')[0]
                          }
                        </div>
                      </td>

                      <td class="px-4 py-2">
                        {}
                        <span
                          class={`bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 ${
                            canalColors[sale.canalVenta] || ''
                          } text-xs whitespace-nowrap font-medium px-2 py-1 text-center rounded `}
                        >
                          {sale.canalVenta}
                        </span>
                      </td>
                      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                        <div class="flex items-center">{sale.estado}</div>
                      </td>
                      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {sale.idEP}
                      </td>

                      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {sale.nombre.split(' ', 3).join(' ')}
                      </td>
                      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                        <span class="text-gray-500 dark:text-gray-400">
                          {sale.Products.length}
                        </span>{' '}
                      </td>
                      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                        <div class="flex items-center">
                          <span class="text-gray-500 dark:text-gray-400">
                            Envío Pack
                          </span>
                        </div>
                      </td>

                      <td
                        class="px-4 py-4 flex justify-between items-end whitespace-nowrap font-semibold 
                      "
                      >
                        <p>$</p>
                        {sale.Payments.reduce((acc, payment) => {
                          return (acc + payment.montoTotal).toLocaleString(
                            'es-AR',
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                              maximumSignificantDigits: 3,
                            }
                          )
                        }, 0)}
                      </td>
                      <td class="px-2 py-1">
                        <button
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                        >
                          <svg
                            aria-hidden="true"
                            class="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span class="sr-only">Icon description</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando{' '}
              <span class="font-semibold text-gray-900 dark:text-white">
                1-10{' '}
              </span>
              de{' '}
              <span class="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>

            <nav aria-label="Page navigation example">
              <ul class="inline-flex -space-x-px cursor-pointer">
                <li>
                  <div
                    onClick={() => {
                      if (pagination === 1) return
                      setPagination(pagination - 1)
                    }}
                    class="flex items-center justify-center h-full py-1.5 px-4 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
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
                    class="flex items-center justify-center h-full py-2 px-4 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
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
