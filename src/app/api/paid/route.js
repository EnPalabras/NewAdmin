import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const { paymentId, date, amountReceived, externalId } = await request.json()
  const data = await markOrderAsPaid(paymentId, date, amountReceived)
  await markPaidInTN(externalId, date, amountReceived)
  await markPaidInTN(externalId, date, amountReceived)

  revalidatePath('/retiros/[id]')
  revalidatePath('/retiros')

  return NextResponse.json(data)
}

const markOrderAsPaid = async (paymentId, date, amountReceived) => {
  const body = {
    date,
    amountReceived,
  }

  const headers = {
    'Content-Type': 'application/json',
  }
  const URL = `https://serverep-production.up.railway.app/api/ventas/order/paid/${paymentId}`

  const res = await fetch(URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return data
}

const markPaidInTN = async (externalId, date, amountReceived) => {
  const headers = {
    'Content-Type': 'application/json',
    Authentication: process.env.AUTH_TIENDANUBE,
    'User-Agent': 'En Palabras (enpalabrass@gmail.com)',
  }

  const URL = `https://api.tiendanube.com/v1/1705915/orders/${externalId}/transactions`

  const body = {
    payment_provider_id: '7bb85609-5d0f-4a41-bb45-b12ae22697fd',
    payment_method: {
      type: 'cash',
    },
    first_event: {
      amount: {
        value: `${amountReceived}`,
        currency: 'ARS',
      },
      type: 'sale',
      status: 'success',
      happened_at: date,
    },
  }

  await fetch(URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}
