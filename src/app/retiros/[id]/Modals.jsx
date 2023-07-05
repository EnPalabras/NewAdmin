'use client'
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'

const productsList = [
  {
    Desconectados: {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 8099,
    },
  },
  {
    Destapados: {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 8099,
    },
  },
  {
    'Año Nuevo': {
      categoria: 'Juegos',
      variante: ['Unica'],
      precio: 4500,
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

export function ModalEditPayment({ payment, orderId }) {
  const [openModal, setOpenModal] = useState()
  const [pago, setPago] = useState({
    tipoPago: payment.tipoPago,
    cuentaDestino: payment.cuentaDestino,
  })
  const [loading, setLoading] = useState(false)
  const props = { openModal, setOpenModal }

  const PaymentTypes = [
    { Efectivo: 'Callipsian Recoleta' },
    { 'Mercado Pago': 'MP Belu' },
    { Transferencia: 'MP Belu' },
  ]

  const submitChange = async () => {
    setLoading(true)
    const body = {
      paymentId: payment.id,
      orderId,
      tipoPago: pago.tipoPago,
      cuentaDestino: pago.cuentaDestino,
    }

    const response = await fetch('/api/payments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      window.location.reload()
    }

    const json = await response.json()
    console.log({ json })
    props.setOpenModal(undefined)
    setLoading(false)
  }

  return (
    <>
      <Button onClick={() => props.setOpenModal('dismissible')} color="gray">
        Modificar
      </Button>
      <Modal
        dismissible
        show={props.openModal === 'dismissible'}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Información de Pago</Modal.Header>
        <Modal.Body>
          <div className="flex flex-row w-full justify-between gap-4 items-center s">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="tipoPago" value="Método de Pago" />
              </div>
              <Select
                id="tipoPago"
                required
                value={pago.tipoPago}
                onChange={(e) => {
                  setPago({
                    ...pago,
                    tipoPago: e.target.value,
                    cuentaDestino: PaymentTypes.find(
                      (paymentType) =>
                        Object.keys(paymentType)[0] === e.target.value
                    )[e.target.value],
                  })
                }}
              >
                {PaymentTypes.map((paymentType) =>
                  Object.keys(paymentType).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))
                )}
              </Select>
            </div>
          </div>

          <div className="mt-10 text-sm text-gray-400 text-justify">
            Cambios en la información de pago pueden afectar los descuentos
            asociados a la venta. Por ejempo, en caso de que se haya aplicado un
            descuento por pago en efectivo y se modifique el método de pago a
            Transferencia, el descuento se eliminará.
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-row justify-between w-full">
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancelar
          </Button>
          <Button onClick={submitChange} isProcessing={loading}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function ModalEditProducts({ data, orderId }) {
  const [openModal, setOpenModal] = useState()
  const props = { openModal, setOpenModal }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [productData, setProductData] = useState([...data.Products])

  const productNames = productsList.map((product) => Object.keys(product)[0])

  const modifyProducts = async () => {
    setLoading(true)
    setError(false)
    const modifiedProducts = productData.map((product) => ({
      ...product,
      precioTotal: product.precioUnitario * product.cantidad,
      categoria: productsList.find(
        (productList) => Object.keys(productList)[0] === product.producto
      )[product.producto].categoria,
      moneda: 'ARS',
    }))

    const productNames = modifiedProducts.map((product) => product.producto)
    const uniqueProductNames = [...new Set(productNames)]
    if (productNames.length !== uniqueProductNames.length) {
      setError(
        'Existen dos productos con el mismo nombre. Por favor dejar sólo uno de ellos.'
      )
      setLoading(false)
      return
    }

    const zeroQuantity = modifiedProducts.find(
      (product) => product.cantidad === 0
    )
    if (zeroQuantity) {
      setError('Existen productos con cantidad 0. Por favor eliminarlos.')
      setLoading(false)
      return
    }

    const zeroPrice = modifiedProducts.find(
      (product) => product.precioUnitario === 0
    )
    if (zeroPrice) {
      setError('Existen productos con precio 0. Por favor eliminarlos.')
      setLoading(false)
      return
    }

    // setProductData(modifiedProducts)
    // return

    const body = {
      idEP: orderId,
      products: modifiedProducts,
      paymentId: data.Payments[0].id,
    }

    const response = await fetch('/api/orders/edit', {
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
    console.log({ json })
    // setError(true)
    props.setOpenModal(undefined)
    setLoading(false)
  }

  const closeModal = () => {
    props.setOpenModal(undefined)
    setProductData([...data.Products])
  }

  return (
    <>
      <Button onClick={() => props.setOpenModal('dismissible')} color="light">
        Editar Productos
      </Button>
      <Modal
        dismissible
        size="4xl"
        show={props.openModal === 'dismissible'}
        onClose={closeModal}
      >
        <Modal.Header>Editar Venta</Modal.Header>
        <Modal.Body>
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
                    <div className="w-full md:max-w-[100px]">
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
                        }}
                      />
                    </div>
                    <div className="md:max-w-[200px] w-full">
                      {index === 0 && (
                        <div className="mb-2 hidden md:block">
                          <Label htmlFor="precio" value="Precio Unitario" />
                        </div>
                      )}

                      <TextInput
                        id="precio"
                        type="number"
                        addon="$"
                        // defaultValue={
                        //   productsList.find(
                        //     (product) =>
                        //       Object.keys(product)[0] ===
                        //       productData[index].producto
                        //   )[productData[index].producto].precio
                        // }
                        value={product.precioUnitario}
                        onBlur={(e) => {
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
                  })
                  setProductData(newProductData)
                }}
                className="w-full max-w-[400px] md:w-auto mx-auto border-radius-2xl "
              >
                {/* <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg> */}
                Agregar Producto
              </Button>
            </div>
            <div className="flex justify-between gap-4 mt-8 items-center">
              <Button color="failure" onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                color="gray"
                onClick={modifyProducts}
                isProcessing={loading}
              >
                Modificar
              </Button>
            </div>
          </div>
          <div>
            {error && (
              <div className="mt-4 mx-auto text-center text-red-500 font-semibold text-sm">
                {error}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
