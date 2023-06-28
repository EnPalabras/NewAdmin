'use client'
import { useState } from 'react'

export function ReceivedPayment({ defaultAmount, paymentId }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [amount, setAmount] = useState(defaultAmount)

  const handleDateChange = (value) => {
    setDate(new Date(value).toISOString().slice(0, 10))
  }
  const handleAmountChange = (value) => {
    setAmount(value)
  }

  const setAsPaid = async () => {
    const body = {
      paymentId,
      date: new Date(date).toISOString(),
      amountReceived: amount,
    }
    console.log({ body })
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

    console.log({ json })
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row gap-2 justify-evenly w-full">
        <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Fecha de Pago
          </label>
          <input
            type="date"
            className="w-full border-2 border-gray-300 bg-transparent h-10 px-5 rounded-md  focus:outline-none text-center"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2  items-center justify-center">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Monto Recibido
          </label>

          <input
            type="number"
            className="w-full border-2 border-gray-300 bg-transparent h-10 px-5 rounded-md  focus:outline-none text-center"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
        </div>
      </div>

      <div className="my-4 w-full items-center justify-center">
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={setAsPaid}
        >
          Marcar Pago Recibido
        </button>
      </div>
    </div>
  )
}

export function Shipped({ externalId }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const handleDateChange = (value) => {
    setDate(new Date(value).toISOString().slice(0, 10))
  }

  const setAsShipped = async () => {
    const response = await fetch('/api/fulfilled', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ externalId }),
    })

    if (response.ok) {
      console.log('response ok')
    }

    console.log({ response })
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row gap-2 justify-evenly w-full">
        <div className="flex flex-col w-full lg:w-1/2 items-center justify-center">
          <label className="text-gray-700 text-sm font-bold mb-2">
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
        <form onSubmit={setAsShipped}>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Marcar Entregado
          </button>
        </form>
      </div>
    </div>
  )
}
