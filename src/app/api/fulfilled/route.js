import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const { externalId, orderId, date } = await request.json()

  const path = request.nextUrl.searchParams.get('path') || '/'
  console.log('path', path)

  const data = await deliverOrder(externalId)
  const delivered = await markOrderAsDelivered(orderId, date)

  revalidatePath('/retiros/[id]')
  revalidatePath('/retiros')
  revalidatePath(`/retiros/${orderId}`)

  revalidatePath(path)

  return NextResponse.json(data)
}

const markOrderAsDelivered = async (orderId, date) => {
  const body = {
    date,
  }

  const headers = {
    'Content-Type': 'application/json',
  }
  const URL = `https://serverep-production.up.railway.app/api/ventas/order/delivered/${orderId}`
  const res = await fetch(URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  const data = await res.json()
}

const deliverOrder = async (externalId) => {
  const headers = {
    'Content-Type': 'application/json',
    Authentication: process.env.AUTH_TIENDANUBE,
    'User-Agent': 'En Palabras (enpalabrass@gmail.com)',
  }
  const URL_FULFILLED = `https://api.tiendanube.com/v1/1705915/orders/${externalId}/fulfill`

  const res = await fetch(URL_FULFILLED, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      shipping_tracking_number: 'NO_TRACK_NUMBER',
      shipping_tracking_url: `https://www.enpalabras.com.ar/`,
      notify_customer: false,
    }),
  })

  const data = await res.json()

  return data
}
