'use client'

import { Button, Label, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'

const productsList = [
  {
    Desconectados: {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 8999,
    },
  },
  {
    Destapados: {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 8999,
    },
  },
  {
    'Año Nuevo': {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 4495,
    },
  },
  {
    'Buzo Un Sueño': {
      categoria: 'Merch',
      variante: ['Talle 1', 'Talle 2', 'Talle 3'],
      precio: 27000,
    },
  },
  {
    'Buzo Tu Señal': {
      categoria: 'Merch',
      variante: ['Talle 1', 'Talle 2', 'Talle 3'],
      precio: 27000,
    },
  },
  {
    'Remera Atenta': {
      categoria: 'Merch',
      variante: ['Talle 1', 'Talle 2', 'Talle 3'],
      precio: 10500,
    },
  },
  {
    'Remera Club': {
      categoria: 'Merch',
      variante: ['Talle 1', 'Talle 2', 'Talle 3'],
      precio: 10500,
    },
  },
  {
    'Remera Preguntame': {
      categoria: 'Merch',
      variante: ['Talle 1', 'Talle 2', 'Talle 3'],
      precio: 10500,
    },
  },
  {
    'Tote Bag': {
      categoria: 'Merch',
      variante: ['Unica'],
      precio: 3799,
    },
  },
]

export default function ChangeProducts() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [orderInfo, setOrderInfo] = useState({
    nombre: '',
    email: '',
    DNI: '',
    telefono: '',
    montoTotal: 0,
    tipoEnvio: 'Calipsian Recoleta',
    fechaEnvio: new Date().toISOString().slice(0, 10),
  })

  const [productData, setProductData] = useState([
    {
      producto: 'Desconectados',
      variante: 'Unica',
      categoria: 'Juegos',
      cantidad: 1,
      precioUnitario: productsList.find(
        (product) => Object.keys(product)[0] === 'Desconectados'
      )['Desconectados'].precio,
      moneda: 'ARS',
    },
  ])

  const [payments, setPayments] = useState([
    {
      tipoPago: 'Efectivo',
      cuentaDestino: 'Calipsian Recoleta',
      montoNeto: productData.reduce(
        (acc, product) => acc + product.precioUnitario * product.cantidad,
        0
      ),
      vuelto: 0,
      montoRecibido: productData.reduce(
        (acc, product) => acc + product.precioUnitario * product.cantidad,
        0
      ),
      moneda: 'ARS',
      fechaPago: new Date().toISOString().slice(0, 10),
    },
  ])

  const productNames = productsList.map((product) => Object.keys(product)[0])

  const submitSale = async () => {
    setLoading(true)

    const body = {
      nombre: orderInfo.nombre,
      idEP: `LO-${Date.now()}`,
      email: orderInfo.email,
      DNI: orderInfo.DNI,
      telefono: orderInfo.telefono,
      montoTotal: productData.reduce(
        (acc, product) => acc + product.precioUnitario * product.cantidad,
        0
      ),
      Products: productData.map((product) => ({
        producto: product.producto,
        variante: product.variante,
        // get the categoria based on productsList
        categoria: productsList.filter(
          (productList) => Object.keys(productList)[0] === product.producto
        )[0][product.producto].categoria,

        cantidad: product.cantidad,
        precioUnitario: product.precioUnitario,
        precioTotal: product.precioUnitario * product.cantidad,
        moneda: product.moneda,
      })),
      Payments: payments.map((payment) => ({
        tipoPago: payment.tipoPago,
        cuentaDestino: payment.cuentaDestino,
        fechaPago: new Date(payment.fechaPago).toISOString(),
        fechaLiquidacion: new Date(payment.fechaPago).toISOString(),
        montoTotal: productData.reduce(
          (acc, product) => acc + product.precioUnitario * product.cantidad,
          0
        ),
        montoRecibido: payment.montoRecibido,
        cuotas: 1,
        moneda: payment.moneda,
      })),
      Shipments: [
        {
          estado: 'Entregado',
          tipoEnvio: orderInfo.tipoEnvio,
          nombreEnvio: orderInfo.tipoEnvio,
          fechaEnvio: new Date(orderInfo.fechaEnvio).toISOString(),
          costoEnvio: 0,
          pagoEnvio: 0,
          stockDesde: 'Calipsian Recoleta',
          fechaEntrega: new Date(orderInfo.fechaEnvio).toISOString(),
          ciudad: 'Recoleta',
          provincia: 'Capital Federal',
          pais: 'Argentina',
        },
      ],
    }

    setLoading(false)

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      window.location.reload()
    }

    const json = await response.json()
    // setError(true)
    setLoading(false)
  }

  return (
    <div className="relative bg-white shadow-md sm:rounded-lg my-10 mx-2 py-4 px-2 sm:mx-auto sm:w-4/5 md:w-3/4">
      <div className="text-lg border-b w-full">
        <h1 className="text-center font-bold text-2xl">Agregar Venta</h1>
      </div>
      <div className="mt-4">
        <div className="flex flex-col lg:flex-row gap-2 justify-evenly w-full">
          <div className="flex flex-col w-full px-10 w-full items-center justify-center">
            <div className="flex flex-row justify-between gap-2 w-full">
              <div className="flex-col w-full">
                <label className="text-gray-700 text-base mb-2 ">Nombre</label>
                <input
                  type="text"
                  className="w-full border-1 mt-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md  "
                  value={orderInfo.nombre}
                  onChange={(e) =>
                    setOrderInfo({ ...orderInfo, nombre: e.target.value })
                  }
                />
              </div>
              <div className="flex-col w-full">
                <label className="text-gray-700 text-base mb-2">Email</label>
                <input
                  type="text"
                  className="w-full border-1 mt-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md  "
                  value={orderInfo.email}
                  onChange={(e) =>
                    setOrderInfo({ ...orderInfo, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-row justify-between gap-2 mt-2 w-full">
              <div className="flex-col w-full">
                <label className="text-gray-700 text-base mb-2">DNI</label>
                <input
                  type="text"
                  className="w-full border-1 mt-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md  "
                  value={orderInfo.DNI}
                  onChange={(e) =>
                    setOrderInfo({ ...orderInfo, DNI: e.target.value })
                  }
                />
              </div>
              <div className="flex-col w-full">
                <label className="text-gray-700 text-base mb-2">Telefono</label>
                <input
                  type="text"
                  className="w-full border-1 mt-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md  "
                  value={orderInfo.telefono}
                  onChange={(e) =>
                    setOrderInfo({ ...orderInfo, telefono: e.target.value })
                  }
                />
              </div>
            </div>

            <label className="text-gray-700 text-base mt-6 mb-4">
              Productos
            </label>
            <div className="text-center w-full">
              <div className="mb-4 flex flex-col gap-4">
                {productData.map((product, index) => (
                  <div
                    className="flex flex-col md:flex-row items-center justify-between gap-2 w-full"
                    key={product.id}
                  >
                    <div className="w-full max-w-[400px]">
                      {index === 0 && (
                        <div className="mb-2 hidden md:block">
                          <Label htmlFor="product" value="Producto" />
                        </div>
                      )}

                      <Select
                        id="product"
                        required
                        value={product.producto}
                        onChange={(e) => {
                          const newProductData = [...productData]
                          newProductData[index].producto = e.target.value

                          if (
                            e.target.value === 'Desconectados' ||
                            e.target.value === 'Destapados' ||
                            e.target.value === 'Año Nuevo'
                          ) {
                            newProductData[index].variante = 'Unica'
                          }
                          newProductData[index].precioUnitario =
                            productsList.find(
                              (product) =>
                                Object.keys(product)[0] ===
                                productData[index].producto
                            )[productData[index].producto].precio
                          setProductData(newProductData)
                        }}
                      >
                        {productNames.map((product) => (
                          <option key={product} value={product}>
                            {product}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="w-full max-w-[400px]">
                      {index === 0 && (
                        <div className="hidden mb-2 hidden md:block">
                          <Label htmlFor="variante" value="Variante" />
                        </div>
                      )}

                      <Select
                        id="variante"
                        required
                        value={product.variante}
                        onChange={(e) => {
                          const newProductData = [...productData]
                          newProductData[index].variante = e.target.value
                          setProductData(newProductData)
                          setPayments([
                            {
                              ...payments[0],
                              montoNeto: newProductData.reduce(
                                (acc, product) =>
                                  acc +
                                  product.precioUnitario * product.cantidad,
                                0
                              ),
                              montoRecibido: newProductData.reduce(
                                (acc, product) =>
                                  acc +
                                  product.precioUnitario * product.cantidad,
                                0
                              ),
                            },
                          ])
                        }}
                      >
                        {productsList
                          .filter(
                            (product) =>
                              Object.keys(product)[0] ===
                              productData[index].producto
                          )
                          .map((product) =>
                            product[productData[index].producto].variante.map(
                              (variante) => (
                                <option key={variante} value={variante}>
                                  {variante}
                                </option>
                              )
                            )
                          )}
                      </Select>
                    </div>
                    <div className="flex flex-row justify-between gap-2 w-full mb-2 md:mb-0 max-w-[400px] md:max-w-[500px]">
                      <div className="w-full md:max-w-[150px]">
                        {index === 0 && (
                          <div className="mb-2 hidden md:block ">
                            <Label htmlFor="cantidad" value="Cantidad" />
                          </div>
                        )}
                        <TextInput
                          id="cantidad"
                          type="number"
                          value={product.cantidad}
                          onChange={(e) => {
                            const newProductData = [...productData]
                            newProductData[index].cantidad = e.target.value
                            if (newProductData[index].cantidad < 1) {
                              newProductData[index].cantidad = 1
                              return
                            }

                            newProductData[index].precioTotal =
                              e.target.value * product.precioUnitario
                            setProductData(newProductData)
                            setPayments([
                              {
                                ...payments[0],
                                montoNeto: newProductData.reduce(
                                  (acc, product) =>
                                    acc +
                                    product.precioUnitario * product.cantidad,
                                  0
                                ),
                                montoRecibido: newProductData.reduce(
                                  (acc, product) =>
                                    acc +
                                    product.precioUnitario * product.cantidad,
                                  0
                                ),
                              },
                            ])
                          }}
                        />
                      </div>
                      <div className="md:max-w-[250px] w-full">
                        {index === 0 && (
                          <div className="mb-2 hidden md:block">
                            <Label htmlFor="precio" value="Precio" />
                          </div>
                        )}

                        <TextInput
                          id="precio"
                          type="number"
                          addon="$"
                          value={product.precioUnitario}
                          onChange={(e) => {
                            const newProductData = [...productData]
                            newProductData[index].precioUnitario =
                              e.target.value
                            newProductData[index].precioTotal =
                              e.target.value * product.cantidad
                            setProductData(newProductData)
                            setPayments([
                              {
                                ...payments[0],
                                montoNeto: newProductData.reduce(
                                  (acc, product) =>
                                    acc +
                                    product.precioUnitario * product.cantidad,
                                  0
                                ),
                                montoRecibido: newProductData.reduce(
                                  (acc, product) =>
                                    acc +
                                    product.precioUnitario * product.cantidad,
                                  0
                                ),
                              },
                            ])
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-center w-full max-w-[400px] md:w-auto ">
                      {index === 0 && (
                        <div className="mb-2 hidden md:block">
                          <Label htmlFor="variante" value="Eliminar" />
                        </div>
                      )}
                      <Button
                        onClick={() => {
                          const newProductData = [...productData]
                          newProductData.splice(index, 1)
                          setProductData(newProductData)

                          if (newProductData.length === 0) {
                            closeModal()
                          }
                        }}
                        color="failure"
                        className="w-full md:w-auto"
                      >
                        <svg
                          className="w-4 h-5 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 18 20"
                        >
                          <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Button
                  onClick={() => {
                    const newProductData = [...productData]
                    newProductData.push({
                      producto: 'Desconectados',
                      variante: 'Unica',
                      cantidad: 1,
                      precioUnitario: 0,
                      precioTotal: 0,
                      moneda: 'ARS',
                    })
                    setProductData(newProductData)
                  }}
                  className="w-full max-w-[400px] md:w-auto mx-auto border-radius-2xl "
                >
                  Agregar Producto
                </Button>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-8 w-full justify-between">
              <div className="flex flex-col w-full">
                <div>
                  <div className="flex flex-row justify-between gap-2 w-full">
                    <div className="flex-col w-full text-center">
                      <Label
                        htmlFor="tipoPago"
                        value="Tipo de Pago"
                        className="text-center"
                      />
                      <Select
                        id="tipoPago"
                        className="mt-2"
                        required
                        value={payments[0].tipoPago}
                        onChange={(e) => {
                          const newPayments = [...payments]
                          newPayments[0].tipoPago = e.target.value
                          newPayments[0].cuentaDestino =
                            e.target.value === 'Efectivo'
                              ? 'Calipsian Recoleta'
                              : 'Mercado Pago'

                          setPayments(newPayments)
                        }}
                      >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Mercado Pago">Mercado Pago</option>
                        <option value="Transferencia">Transferencia</option>
                      </Select>
                    </div>
                    <div className="flex-col w-full text-center">
                      <Label
                        htmlFor="fechaPago"
                        value="Fecha Pago"
                        className="text-center"
                      />
                      <input
                        type="date"
                        className="w-full border-1 mt-2 py-1 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-center"
                        value={payments[0].fechaPago}
                        onChange={(e) => {
                          const newPayments = [...payments]
                          newPayments[0].fechaPago = e.target.value
                          setPayments(newPayments)
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-2 w-full mt-4">
                    <div className="flex flex-row justify-between gap-2 w-full">
                      <div className="flex-col w-full text-center">
                        <Label
                          htmlFor="montoRecibido"
                          value="Monto Recibido"
                          className="text-center"
                        />

                        <TextInput
                          id="montoRecibido"
                          type="number"
                          className="mt-2"
                          addon="$"
                          value={payments[0].montoRecibido}
                          onChange={(e) => {
                            const newPayments = [...payments]
                            newPayments[0].montoRecibido = e.target.value
                            newPayments[0].montoNeto =
                              newPayments[0].montoRecibido -
                              newPayments[0].vuelto
                            setPayments(newPayments)
                          }}
                        />
                      </div>
                      <div className="flex-col w-full text-center">
                        <Label
                          htmlFor="vuelto"
                          value="Vuelto"
                          className="text-center"
                        />

                        <TextInput
                          id="vuelto"
                          type="number"
                          className="mt-2"
                          addon="$"
                          value={payments[0].vuelto}
                          onChange={(e) => {
                            const newPayments = [...payments]
                            newPayments[0].vuelto = e.target.value
                            newPayments[0].montoNeto =
                              newPayments[0].montoRecibido - e.target.value
                            setPayments(newPayments)
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-col w-full text-center">
                      <Label
                        htmlFor="montoNeto"
                        value="Neto"
                        className="text-center"
                      />

                      <TextInput
                        id="montoNeto"
                        type="number"
                        className="mt-2"
                        addon="$"
                        value={payments[0].montoNeto}
                        onChange={(e) => {
                          const newPayments = [...payments]
                          newPayments[0].montoNeto = e.target.value
                          setPayments(newPayments)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full items-center">
                <div className="flex flex-col w-2/3">
                  <Label
                    htmlFor="tipoEnvio"
                    value="Tipo de Entrega"
                    className="text-center"
                  />
                  <Select
                    id="tipoEnvio"
                    className="mt-2"
                    required
                    value={orderInfo.tipoEnvio}
                    onChange={(e) => {
                      setOrderInfo({ ...orderInfo, tipoEnvio: e.target.value })
                    }}
                  >
                    <option value="Calipsian Recoleta">
                      Calipsian Recoleta
                    </option>
                  </Select>
                </div>
                <div className="flex-col w-2/3 mt-4 text-center">
                  <Label
                    htmlFor="fechaEnvio"
                    value="Fecha Envio"
                    className="text-center"
                  />
                  <input
                    type="date"
                    className="w-full border-1 mt-2 py-1 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-center"
                    value={orderInfo.fechaEnvio}
                    onChange={(e) => {
                      setOrderInfo({ ...orderInfo, fechaEnvio: e.target.value })
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full mt-4">
              <button
                isProcessing={loading}
                onClick={submitSale}
                className="w-full mt-4 mx-auto border-radius-2xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Cargar Venta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
