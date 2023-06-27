'use client'

import { Button, Modal, Label, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'

const productsList = ['Desconectados', 'Destapados', 'Año Nuevo']

export default function DefaultModal({ orderData }) {
  const [openModal, setOpenModal] = useState()
  const props = { openModal, setOpenModal }

  const [buyerData, setBuyerData] = useState({
    nombre: orderData.nombre,
    DNI: orderData.DNI,
    telefono: orderData.telefono,
    mail: orderData.mail,
  })

  const [productData, setProductData] = useState([...orderData.Products])

  return (
    <>
      <button
        onClick={() => props.setOpenModal('default')}
        className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 shadow-md f font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 "
      >
        Editar
      </button>
      <Modal
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Editar Venta</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="font-semibold text-xl text-gray-900 dark:text-gray-100">
              Comprador
            </p>
            <p className="text-gray-500 text-md">Nombre</p>
            {productData.map((product, index) => (
              <div
                className="flex flex-row justify-between gap-2 w-full"
                key={product.id}
              >
                <div className="w-2/5">
                  <div className="mb-2 block">
                    <Label htmlFor="product" value="Producto" />
                  </div>
                  <Select
                    id="product"
                    required
                    value={product.producto}
                    onChange={(e) => {
                      const newProductData = [...productData]
                      newProductData[index].producto = e.target.value

                      setProductData(newProductData)
                    }}
                  >
                    {productsList.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-1/5">
                  <div className="mb-2 block">
                    <Label htmlFor="cantidad" value="Cantidad" />
                  </div>
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
                <div className="w-2/5">
                  <div className="mb-2 block">
                    <Label htmlFor="precio" value="Precio U." />
                  </div>
                  <TextInput
                    id="precio"
                    type="number"
                    addon="$"
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

                <div className="text-center">
                  <div className="mb-2 block ">
                    <Label htmlFor="delete" value="Eliminar" />
                  </div>
                  <Button
                    onClick={() => {
                      const newProductData = [...productData]
                      newProductData.splice(index, 1)
                      setProductData(newProductData)
                    }}
                    color="failure"
                    className="m-auto"
                  >
                    <svg
                      class="w-4 h-5 text-gray-800 dark:text-white"
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

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {JSON.stringify(productData, null, 2)}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>
            Confirmar
          </Button>
          <Button
            color="gray"
            onClick={() => {
              alert('Cancelar')
              props.setOpenModal(undefined)
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
