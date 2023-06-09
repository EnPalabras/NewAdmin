'use client'
import { Button } from 'flowbite-react'
import { useState } from 'react'

export function ReceivedPayment({ defaultAmount, paymentId, externalId }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [cobro, setCobro] = useState(defaultAmount)
  const [vuelto, setVuelto] = useState(0)
  const [amount, setAmount] = useState(defaultAmount)
  const [loading, setLoading] = useState(false)

  const handleDateChange = (value) => {
    setDate(new Date(value).toISOString().slice(0, 10))
  }
  const handleAmountChange = (value) => {
    setAmount(value)
  }

  const handleCobroChange = (value) => {
    setCobro(value)
    setAmount(value - vuelto)
  }

  const handleVueltoChange = (value) => {
    setVuelto(value)
    setAmount(cobro - value)
  }

  const setAsPaid = async () => {
    setLoading(true)
    const body = {
      externalId,
      paymentId,
      date: new Date(date).toISOString(),
      amountReceived: amount,
    }
    const response = await fetch('/api/paid', {
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

    setLoading(false)

    console.log({ json })
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 justify-evenly items-center w-full">
        <div className="flex flex-col w-full gap-2 max-w-[400px] mx-auto items-center justify-center">
          <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-between">
            <label className="text-gray-700 text-base font-bold mb-2">
              Fecha de Pago
            </label>
            <input
              type="date"
              className="w-full max-w-[200px] border-2 border-gray-300 bg-transparent h-10 px-5 rounded-md  focus:outline-none text-center"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-between">
            <label className="text-gray-700 text-base font-bold mb-2">
              Monto Recibido
            </label>
            <input
              type="number"
              className="max-w-[200px] border-2 border-gray-300 bg-transparent h-10  rounded-md  focus:outline-none text-center"
              value={cobro}
              onChange={(e) => handleCobroChange(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-between">
            <label className="text-gray-700 text-base font-bold mb-2">
              Vuelto
            </label>
            <input
              type="number"
              className="max-w-[200px] border-2 border-gray-300 bg-transparent h-10  rounded-md  focus:outline-none text-center"
              value={vuelto}
              onChange={(e) => handleVueltoChange(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-between">
            <label className="text-gray-700 text-base font-bold mb-2">
              Total Neto
            </label>
            <input
              type="number"
              className="max-w-[200px] border-2 border-gray-300 bg-transparent h-10  rounded-md  focus:outline-none text-center"
              value={amount}
            />
          </div>
        </div>
      </div>

      <div className="my-4 w-full items-center justify-center">
        <Button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold rounded"
          onClick={setAsPaid}
          isProcessing={loading}
        >
          <p className="text-base font-semibold">Marcar Pago Recibido</p>
        </Button>
      </div>
    </div>
  )
}

export function Shipped({ externalId, orderId }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(false)
  const handleDateChange = (value) => {
    setDate(new Date(value).toISOString().slice(0, 10))
  }

  const setAsShipped = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/fulfilled', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        externalId,
        orderId,
        date: new Date(),
      }),
    })

    if (response.ok) {
      console.log('okkkkkk')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="flex flex-col lg:flex-row gap-2 justify-evenly w-full">
        <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
          <label className="text-gray-700 text-base font-bold mb-2">
            Fecha de Entrega
          </label>
          <input
            type="date"
            className="w-full border-2 border-gray-300 bg-transparent h-10 px-5 rounded-md  focus:outline-none text-center"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
      </div>

      <div className="my-4 w-full items-center justify-center">
        <Button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded"
          isProcessing={loading}
          onClick={setAsShipped}
        >
          <p className="text-base font-semibold">Marcar Entregado</p>
        </Button>
      </div>
    </div>
  )
}
