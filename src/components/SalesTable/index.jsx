export const TableHeader = () => {
  return (
    <div class="flex flex-col items-center md:flex-row py-4 md:space-between w-full gap-y-2 gap-0 md:gap-8">
      <form class="w-3/4 md:w:2/3 mx-2">
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

      <button
        type="button"
        class="flex items-center w-3/4 md:w-1/3 mx-2 justify-center px-4 py-4 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        Agregar Venta
      </button>
    </div>
  )
}
// ;<div class="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
export default function SalesTable() {
  return (
    <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 py-8 px-4 mx-auto  lg:py-16">
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
                  <th scope="col" class="px-4 py-3">
                    Canal
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Estado
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Orden
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Nombre
                  </th>
                  <th scope="col" class="hidden xl:table-cell px-4 py-3">
                    Tipo Pago
                  </th>
                  <th scope="col" class="hidden xl:table-cell px-4 py-3">
                    Tipo Envío
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Total
                  </th>
                  <th scope="col" class="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <div class="flex items-center">19/04/2000</div>
                  </td>
                  <td class="px-4 py-2">
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 text-center rounded dark:bg-primary-900 dark:text-primary-300">
                      Tienda Nube
                    </span>
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="flex items-center">Finalizada</div>
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    TN-18989
                  </td>

                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Agustín Iglesias
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <span class="text-gray-500 dark:text-gray-400">
                      Mercado Pago
                    </span>{' '}
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <div class="flex items-center">
                      <span class="text-gray-500 dark:text-gray-400">
                        Envío Pack
                      </span>
                    </div>
                  </td>

                  <td class="px-4 py-2">$3.2M</td>
                  <td class="px-2 py-1">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <div class="flex items-center">19/04/2000</div>
                  </td>
                  <td class="px-4 py-2">
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      Tienda Nube
                    </span>
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="flex items-center">Finalizada</div>
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    TN-18989
                  </td>

                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Agustín Iglesias
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <span class="text-gray-500 dark:text-gray-400">
                      Mercado Pago
                    </span>{' '}
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <div class="flex items-center">
                      <span class="text-gray-500 dark:text-gray-400">
                        Envío Pack
                      </span>
                    </div>
                  </td>

                  <td class="px-4 py-2">$3.2M</td>
                  <td class="px-2 py-1">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <div class="flex items-center">19/04/2000</div>
                  </td>
                  <td class="px-4 py-2">
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      Tienda Nube
                    </span>
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="flex items-center">Finalizada</div>
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    TN-18989
                  </td>

                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Agustín Iglesias
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <span class="text-gray-500 dark:text-gray-400">
                      Mercado Pago
                    </span>{' '}
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden xl:table-cell">
                    <div class="flex items-center">
                      <span class="text-gray-500 dark:text-gray-400">
                        Envío Pack
                      </span>
                    </div>
                  </td>

                  <td class="px-4 py-2">$3.2M</td>
                  <td class="px-2 py-1">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
