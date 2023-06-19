import Link from 'next/link'
import { use } from 'react'

const BreadCrumbOrder = (id) => {
  return (
    <nav className="flex ml-5 md:ml-10" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Inicio
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <Link
              href="/ventas"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              Ventas
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
              {id.id}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

const ProductImage = {
  Desconectados:
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/juego-para-familias1-e967b8ecf1aad2e0bf16728584939231-1024-1024.webp',
  Destapados:
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/juego-para-amigos-y-pareja1-04a8074a73b8e6859b16728612235787-1024-1024.webp',
  'Año Nuevo':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/11-6abc5a8f6a44714a8516678314509320-1024-1024.webp',
}

const StatusInfo = ({ estado }) => {
  const statusColor = {
    'Pendiente Envío': {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      circle: 'bg-blue-500',
    },

    'Pendiente Pago': {
      color:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      circle: 'bg-yellow-500',
    },
    Finalizada: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      circle: 'bg-green-500',
    },
    Abierta: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      circle: 'bg-green-500',
    },
  }

  return (
    <span
      className={`inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300
        ${statusColor[estado] && statusColor[estado].color}
      `}
    >
      <span
        className={`w-2 h-2 mr-1 bg-gray-500 rounded-full
        ${statusColor[estado] && statusColor[estado].circle}
      `}
      ></span>
      {estado}
    </span>
  )
}

export default function Page({ params }) {
  const data = use(getData(params.id))

  return (
    <section className="bg-white dark:bg-gray-900 md:ml-64 mt-4 py-16">
      <BreadCrumbOrder id={params.id} />
      <div className="px-6 md:px-10">
        <div className="flex flex-row justify-between items-center mt-10 ">
          <div>
            <h1 className="text-4xl font-extrabold max-w-screen-xl text-center tracking-tight leading-none text-gray-900  dark:text-white">
              {params.id}
            </h1>
          </div>
          <div className="flex items-stretch gap-2">
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 shadow-md f font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 "
            >
              Light
            </button>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg shadow-md text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Default
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-6 pb-4 border-b ">
          <span className="text-gray-500">Fecha de venta: </span>
          <span className="text-gray-900 ml-2">
            {' '}
            {new Date(data.order.fechaCreada).toLocaleDateString()}
          </span>
          <span className="text-gray-300 mx-3"> | </span>
          <StatusInfo estado={data.order.estado} />
        </div>

        {data.order.Products.map((product) => {
          return (
            <div className="flex flex-row justify-between items-center mt-10  mx-auto">
              <div className="flex h-full flex-row items-center">
                <img
                  src={ProductImage[product.producto]}
                  className="w-24 h-24 rounded-lg border border-gray-300"
                />
                <div className="flex flex-col ml-4 justify-between  gap-4">
                  <span className="font-bold">{product.producto}</span>
                  <span className="text-gray-500 text-sm">
                    Juego de Cartas | Único | ${' '}
                    {product.precioUnitario.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col ml-4 justify-between gap-4 items-end">
                <span className="font-bold">
                  $ {product.precioTotal.toLocaleString('es-AR')}{' '}
                </span>

                <span className="text-gray-500">x{product.cantidad}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-20">{JSON.stringify(data, null, 2)}</div>
    </section>
  )
}

async function getData(id) {
  const res = await fetch(
    `https://serverep-production.up.railway.app/api/ventas/order/${id}`
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
