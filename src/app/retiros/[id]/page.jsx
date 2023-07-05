import Link from 'next/link'
import { use } from 'react'
import { ReceivedPayment, Shipped } from './buttons'
import { ModalEditProducts, ModalEditPayment, ModalTwoPayments } from './Modals'

const BreadCrumbOrder = (id) => {
  return (
    <div className="flex flex-row justify-between">
      <nav className="flex ml-5 md:ml-10" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <div className="flex items-center">
              <Link
                href="/retiros"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Retiros
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
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {id.id}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex mr-5 md:mr-10">
        <Link href={`/retiros/estadisticas`}>
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Estadísticas
          </button>
        </Link>
      </div>
    </div>
  )
}

const ProductImage = {
  Desconectados:
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/juego-para-familias1-e967b8ecf1aad2e0bf16728584939231-1024-1024.webp',
  Destapados:
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/juego-para-amigos-y-pareja1-04a8074a73b8e6859b16728612235787-1024-1024.webp',
  'Año Nuevo':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/11-6abc5a8f6a44714a8516678314509320-1024-1024.webp',
  'Buzo Tu Señal':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/buzo-tu-senal_mesa-de-trabajo-1-011-2d3a5cd64013f2548a16883408519593-1024-1024.webp',
  'Buzo Un Sueño':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/buzo-un-sueno-051-41af2210747cb1c1cf16883397405736-1024-1024.webp',
  'Remera Atenta':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/remera-atenta-0411-fac604ce204852caa416883958442242-1024-1024.webp',
  'Remera Preguntame':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/remera-preguntame-031-9d3c35d9c19a0ba6d016883409951164-1024-1024.webp',
  'Remera Club':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/remera-club_mesa-de-trabajo-111-681542d295a27bc42c16883954762190-1024-1024.webp',
  'Tote Bag':
    'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/products/totebag-en-palabras1-62073269754e91139916883297106646-1024-1024.webp',
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

const ShipmentInfo = ({ estado }) => {
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
    shipped: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      circle: 'bg-green-500',
    },
    Pendiente: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      circle: 'bg-red-500',
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

const PaymentStatus = {
  authorized: 'Autorizado',
  pending: 'Pendiente',
  paid: 'Pagado',
  abandoned: 'Abandonado',
  refunded: 'Reintegrado',
  voided: 'Rechazado',
}

const ShipStatus = {
  fulfilled: 'Entregado',
  shipped: 'Entregado',
  unpacked: 'Pendiente',
  unfilfilled: 'Pendiente',
  unshipped: 'Pendiente',
}

export default function Page({ params }) {
  const data = use(getData(params.id))
  const tnData = use(tnFetch(data.order.externalId))

  return (
    <section className="bg-white dark:bg-gray-900 mx-1 md:mx-10 my-4 py-16 rounded-md">
      <BreadCrumbOrder id={params.id} />
      <div className="px-6 md:px-10">
        <div className="flex flex-row flex-wrap justify-between items-center mt-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold max-w-screen-xl text-center tracking-tight leading-none text-gray-900  dark:text-white">
              Orden: # {tnData.number}
            </h1>
          </div>
        </div>
        <div className="flex flex-row mt-6 pb-4 border-b">
          <span className="text-gray-500">Fecha de compra: </span>
          <span className="text-gray-900 ml-2 dark:text-gray-200">
            {' '}
            {new Date(data.order.fechaCreada).toLocaleDateString()}
          </span>
          <span className="text-gray-300 mx-3"> | </span>
          <StatusInfo estado={data.order.estado} />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex flex-col mt-6 pb-4 border rounded-md w-full lg:w-2/3 p-4">
            <div className="flex flex-row justify-between border-b w-full pb-2 items-center">
              <h3 className="text-lg font-semibold text-dark">Productos</h3>

              <ModalEditProducts data={data.order} orderId={data.order.idEP} />
            </div>
            <div className="my-auto ">
              {data.order.Products.map((product) => {
                return (
                  <div
                    className="flex flex-row justify-between items-center mt-4  w-full pb-2 "
                    key={product.id}
                  >
                    <div className="flex h-full flex-row items-center">
                      <img
                        src={ProductImage[product.producto]}
                        className="w-24 h-24 rounded-lg border border-gray-300 object-fit"
                      />
                      <div className="flex flex-col ml-4 justify-between gap-4 max-w-2/5">
                        <span className="font-bold text-dark dark:text-white">
                          {product.producto}{' '}
                          <span className="text-gray-500 text-sm font-light">
                            {product.variante !== 'Unica' && product.variante}
                          </span>
                        </span>
                        <span className="text-gray-500 text-sm">
                          {product.categoria} | ${' '}
                          {product.precioUnitario.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col ml-4 justify-between gap-4 items-end">
                      <span className="font-bold text-dark text-sm md:text-lg dark:text-white">
                        $ {product.precioTotal.toLocaleString('es-AR')}{' '}
                      </span>

                      <span className="text-gray-500 text-sm md:text-lg">
                        x{product.cantidad}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col mt-6 pb-4 border rounded-md w-full lg:w-1/3 p-4">
            <h3 className="text-lg font-semibold text-dark border-b w-full pb-2">
              Cliente
            </h3>
            <div className="mt-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <svg
                    class="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                    />
                  </svg>
                  <p className="text-gray-600 text-md dark:text-gray-400 font-bold ">
                    {data.order.nombre}
                  </p>
                </div>
                <p className="text-gray-600 text-md dark:text-gray-400">
                  <span className="text-gray-400 dark:text-gray-600 text-sm">
                    {data.order.mail}
                  </span>{' '}
                </p>
              </div>
              <div className="mt-6 flex-col">
                <p className=" text-gray-600 text-md dark:text-gray-400">
                  <span className="text-gray-400 dark:text-gray-600">
                    DNI/CUIT
                  </span>{' '}
                  {data.order.DNI}
                </p>
                <p className=" text-gray-600 text-md dark:text-gray-400">
                  <span className="text-gray-400 dark:text-gray-600">
                    Teléfono:
                  </span>{' '}
                  {data.order.telefono}
                </p>{' '}
              </div>

              <div className="bg-gray-200 rounded-md mt-4 py-2 px-2 flex flex-row">
                <div className="relative">
                  <svg
                    class="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                  </svg>
                </div>
                <div className="px-2 text-sm">{tnData.note}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex flex-col mt-6 pb-4 border rounded-md w-full lg:w-2/3 p-4">
            <div className="flex flex-row justify-between border-b w-full pb-2 items-center">
              <h3 className="text-lg font-semibold text-dark">
                Información de Pago
              </h3>
              <div className="flex flex-row gap-4">
                <ModalTwoPayments
                  payment={data.order.Payments}
                  orderId={data.order.idEP}
                />
                <ModalEditPayment
                  payment={data.order.Payments[0]}
                  orderId={data.order.idEP}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between h-full gap-4 md:gap-10">
              <div className="w-full md:w-1/2 flex flex-col justify-between h-full items-center">
                <div className="flex flex-row justify-between w-full">
                  <p className="text-gray-400 text-sm ">Método de Pago</p>
                  <p className="text-gray-400 text-sm font-bold text-right">
                    {data.order.Payments[0].tipoPago}{' '}
                    {data.order.Payments[1] && data.order.Payments[1].tipoPago}
                    {data.order.Payments[1] &&
                      `/ ${data.order.Payments[1].tipoPago}`}
                  </p>
                </div>

                <div className="mt-4 flex flex-row justify-between w-full items-center">
                  <p className="text-gray-400 text-sm ">Estado del Pago</p>
                  <p
                    className={`text-gray-400 text-sm font-bold rounded px-2 py-1
                    ${
                      data.order.Payments[0].estado === 'paid' &&
                      'bg-green-100 text-green-800 text-sm'
                    }
                     ${
                       (data.order.Payments[0].estado === 'abandonded' ||
                         data.order.Payments[0].estado === 'voided' ||
                         data.order.Payments[0].estado === 'refunded') &&
                       'bg-red-100 text-red-800 text-sm'
                     }
                      ${
                        data.order.Payments[0].estado === 'pending' &&
                        'bg-yellow-100 text-yellow-800 text-sm'
                      }
                     
                    `}
                  >
                    {PaymentStatus[data.order.Payments[0].estado]}
                  </p>
                </div>
                <div className="mt-4 flex flex-row justify-between w-full">
                  <p className="text-gray-400 text-sm ">Fecha de Pago</p>
                  <p className="text-gray-400 text-sm font-bold text-right">
                    {tnData.paid_at
                      ? new Date(tnData.paid_at).toLocaleDateString()
                      : ''}
                  </p>
                </div>
              </div>
              <div className="border-b border-4 sm:border sm:border-r"></div>
              <div className="flex flex-col justify-between w-full md:w-1/2 gap-4">
                <div className="flex flex-row justify-between w-full border-b pb-2">
                  <p className="text-gray-400 text-sm ">Subtotal</p>
                  <p className="text-gray-400 text-sm ">
                    ${' '}
                    {Number(
                      data.order.Products.reduce(
                        (acc, product) => acc + product.precioTotal,
                        0
                      )
                    ).toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex flex-row justify-between w-full border-b pb-2">
                  <p className="text-gray-400 text-sm ">Costo Envío</p>
                  <p className="text-gray-400 text-sm ">
                    ${' '}
                    {Number(data.order.Shipment[0].pagoEnvio).toLocaleString(
                      'es-AR',
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </p>
                </div>
                <div className="border-b  pb-2">
                  <div className="flex flex-row justify-between w-full ">
                    <p className="text-gray-400 text-sm break-words">
                      Descuento Efectivo
                    </p>
                    <p className="text-gray-400 text-sm ">
                      (${' '}
                      {Number(
                        data.order.Discounts.filter(
                          (discount) =>
                            discount.tipoDescuento === 'Metodo de Pago'
                        ).reduce(
                          (acc, discount) => acc + discount.montoDescuento,
                          0
                        )
                      ).toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                      })}
                      )
                    </p>
                  </div>
                  <div className="flex flex-row justify-between w-full ">
                    <p className="text-gray-400 text-sm break-words">
                      Otros Descuentos
                    </p>
                    <p className="text-gray-400 text-sm ">
                      (${' '}
                      {Number(
                        data.order.Discounts.filter(
                          (discount) =>
                            discount.tipoDescuento !== 'Metodo de Pago'
                        ).reduce(
                          (acc, discount) => acc + discount.montoDescuento,
                          0
                        )
                      ).toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                      })}
                      )
                    </p>
                  </div>
                </div>
                <div className="flex flex-row border-b  pb-2 justify-between w-full ">
                  <p className="text-gray-400 font-bold break-words ">Total</p>
                  <p className="text-gray-400 text-sm font-bold">
                    ${' '}
                    {Number(
                      data.order.Products.reduce(
                        (acc, product) => acc + product.precioTotal,
                        0
                      ) +
                        data.order.Shipment[0].pagoEnvio -
                        data.order.Discounts.reduce(
                          (acc, discount) => acc + discount.montoDescuento,
                          0
                        )
                    ).toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="flex flex-row justify-between w-full border-b  pb-2">
                  <p className="text-gray-400 text-sm ">Pagado</p>
                  <p className="text-gray-400 text-sm ">
                    ${' '}
                    {Number(
                      data.order.Payments.filter(
                        (payment) =>
                          payment.estado === 'paid' ||
                          payment.estado === 'Pagado'
                      ).reduce((acc, payment) => acc + payment.montoTotal, 0)
                    ).toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <p className="text-gray-400 text-sm">Restante</p>
                  <p className="text-gray-400 text-sm">
                    ${' '}
                    {Number(
                      data.order.Payments.filter(
                        (payment) =>
                          payment.estado === 'paid' ||
                          payment.estado === 'Pagado'
                      ).reduce((acc, payment) => acc + payment.montoTotal, 0)
                    ).toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6 pb-4 border rounded-md w-full lg:w-1/3 p-4">
            <h3 className="text-lg font-semibold text-dark border-b w-full pb-2">
              Información de Entrega
            </h3>
            <div className="w-full mt-4 flex flex-col justify-between h-full items-center">
              <div className="flex flex-row justify-between w-full">
                <p className="text-gray-400 text-sm ">Método de Envío</p>
                <p className="text-gray-400 text-sm font-bold text-right">
                  {data.order.Shipment[0].tipoEnvio}
                </p>
              </div>
              <div className="mt-4 flex flex-row justify-between w-full items-center">
                <p className="text-gray-400 text-sm ">Estado del Envío</p>
                <p
                  className={`text-sm font-bold rounded px-2 py-1
                    ${
                      tnData.shipping_status === 'paid' &&
                      'bg-green-100 text-green-800 text-sm'
                    }
                     ${
                       (tnData.shipping_status === 'unpacked' ||
                         tnData.shipping_status === 'unfilfilled' ||
                         tnData.shipping_status === 'unshipped') &&
                       'bg-blue-100 text-blue-500 text-sm'
                     }
                      ${
                        tnData.shipping_status === 'fulfilled' ||
                        (tnData.shipping_status === 'shipped' &&
                          'bg-green-100 text-green-800 text-sm')
                      }
                     
                    `}
                >
                  {ShipStatus[tnData.shipping_status]}
                </p>
              </div>
              <div className="mt-4 flex flex-row justify-between w-full">
                <p className="text-gray-400 text-sm ">Fecha de Entrega</p>
                <p className="text-gray-400 text-sm font-bold text-right">
                  {tnData.shipped_at
                    ? new Date(tnData.shipped_at).toLocaleDateString()
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-md mt-4 py-2 px-2 w-full flex flex-col">
          <h3 className="text-lg font-semibold text-dark border-b  w-full pb-2 text-center">
            Acciones
          </h3>
          <div className="mt-6 px-6 flex flex-col sm:flex-row w-full gap-4">
            <div className="flex flex-col justify-between w-full sm:w-1/2">
              <h3 className="text-base font-semibold text-dark border-b  w-full pb-2 text-center">
                Pago
              </h3>
              <div className="mt-2 flex flex-row justify-between items-center h-full">
                {data.order.Payments[0].estado === 'Pagado' ||
                data.order.Payments[0].estado === 'paid' ? (
                  <span
                    className="text-gray-400 text-sm mx-auto font-bold rounded px-2 py-1
                        bg-green-100 text-green-800 text-sm"
                  >
                    Pago Recibido
                  </span>
                ) : (
                  <ReceivedPayment
                    defaultAmount={data.order.Payments[0].montoTotal}
                    paymentId={data.order.Payments[0].id}
                    externalId={data.order.externalId}
                  />
                )}
              </div>
            </div>
            <div className="border-r sm:border-b border-2"></div>
            <div className="flex flex-col justify-between w-full sm:w-1/2">
              <h3 className="text-base font-semibold text-dark border-b  w-full pb-2 text-center">
                Entrega
              </h3>

              <div className="mt-2 flex flex-row justify-between items-center h-full">
                {tnData.shipping_status === 'shipped' ? (
                  <span
                    className="text-gray-400 text-sm mx-auto font-bold rounded px-2 py-1 
                        bg-green-100 text-green-800 text-sm"
                  >
                    Entregada
                  </span>
                ) : (
                  <Shipped externalId={data.order.externalId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

async function getData(id) {
  const res = await fetch(
    `https://serverep-production.up.railway.app/api/ventas/order/${id}`,
    {
      next: {
        cache: 'no-cache',
        tags: ['actualizar'],
      },
    }
  )
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function tnFetch(id) {
  const URL = `https://api.tiendanube.com/v1/1705915/orders/${id}`
  const headers = {
    'Content-Type': 'application/json',
    Authentication: process.env.AUTH_TIENDANUBE,
    'User-Agent': 'En Palabras (enpalabrass@gmail.com)',
  }

  const res = await fetch(URL, {
    method: 'GET',
    headers: headers,
    next: {
      tags: ['actualizar'],
    },
  })

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
