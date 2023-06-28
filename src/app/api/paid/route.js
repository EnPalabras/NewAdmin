import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const { paymentId, date, amountReceived } = await request.json()

  revalidatePath('/retiros/[id]')
  revalidatePath('/retiros')

  const data = await markOrderAsPaid(paymentId, date, amountReceived)

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
