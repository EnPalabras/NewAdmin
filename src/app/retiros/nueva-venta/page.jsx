'use client'

import { Button } from 'flowbite-react'
import { useState } from 'react'

const productsList = [
  {
    Desconectados: {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 7830,
    },
  },
  {
    Destapados: {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 7830,
    },
  },
  {
    'Año Nuevo': {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 3950,
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

export default function page() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [orderInfo, setOrderInfo] = useState({
    nombre: '',
    email: '',
    DNI: '',
    telefono: '',
    montoTotal: 0,
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

  const productNames = productsList.map((product) => Object.keys(product)[0])

  const submitSale = async () => {
    setLoading(true)

    const body = {}

    return

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
    props.setOpenModal(undefined)
    setLoading(false)
  }

  return (
    <div className="relative bg-white shadow-md sm:rounded-lg my-10 mx-2 py-4 px-2 sm:mx-auto sm:w-4/5 md:w-3/4">
      <div className="text-lg border-b w-full">
        <h1 className="text-center font-bold text-2xl">Agregar Venta</h1>
      </div>
      <div className="mt-4">
        <div className="flex flex-col lg:flex-row gap-2 justify-evenly w-full">
          <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
            <div className="flex flex-row justify-between gap-2 w-full">
              <div className="flex-col w-full">
                <label className="text-gray-700 text-base mb-2 ">Nombre</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md   text-center"
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
                  className="w-full border-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md   text-center"
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
                  className="w-full border-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md   text-center"
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
                  className="w-full border-2 border-gray-300 bg-gray-100 h-10 px-5 rounded-md   text-center"
                  value={orderInfo.telefono}
                  onChange={(e) =>
                    setOrderInfo({ ...orderInfo, telefono: e.target.value })
                  }
                />
              </div>
            </div>

            <label className="text-gray-700 text-base my-2">Productos</label>
            {productData.map((product, index) => (
              <div
                className="flex flex-col md:flex-row items-center justify-between gap-2 w-full"
                key={index}
              >
                <div className="w-full max-w-[400px]">
                  <select
                    id="product"
                    required
                    className="bg-gray-100 rounded-md border-2 border-gray-300 h-10 px-5 text-center w-full"
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
                      newProductData[index].precioUnitario = productsList.find(
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
                  </select>
                </div>
                <div className="w-full max-w-[400px]">
                  <select
                    id="variante"
                    required
                    className="bg-gray-100 rounded-md border-2 border-gray-300 h-10 px-5 text-center w-full"
                    value={product.variante}
                    onChange={(e) => {
                      const newProductData = [...productData]
                      newProductData[index].variante = e.target.value
                      setProductData(newProductData)
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
                  </select>
                </div>
                <div className="w-full max-w-[400px]">
                  <div className="w-full md:max-w-[100px]">
                    <input
                      id="cantidad"
                      type="number"
                      className="bg-gray-100 rounded-md border-2 border-gray-300 h-10 px-5 text-center w-full"
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
                      }}
                    />
                  </div>
                  <div className="md:max-w-[200px] w-full">
                    {index === 0 && (
                      <div className="mb-2">
                        <label htmlFor="precio" value="Precio Unitario" />
                      </div>
                    )}

                    <input
                      id="precio"
                      type="number"
                      className="bg-gray-100 rounded-md border-2 border-gray-300 h-10 px-5 text-center w-full"
                      value={product.precioUnitario}
                      onChange={(e) => {
                        const newProductData = [...productData]
                        newProductData[index].precioUnitario = e.target.value
                        newProductData[index].precioTotal =
                          e.target.value * product.cantidad
                        setProductData(newProductData)
                      }}
                    />
                  </div>
                </div>

                <div className="text-center w-full max-w-[400px] md:w-auto ">
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
        </div>
      </div>
    </div>
  )
}
