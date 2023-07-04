import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function PUT(request) {
  const { paymentId, orderId, tipoPago, cuentaDestino } = await request.json()

  const path = request.nextUrl.searchParams.get('path') || '/'

  console.log('path', path)

  const data = await editPaymentFromOrder(
    paymentId,
    orderId,
    tipoPago,
    cuentaDestino
  )

  revalidatePath(path)

  return NextResponse.json(data)
}

const editPaymentFromOrder = async (
  paymentId,
  orderId,
  tipoPago,
  cuentaDestino
) => {
  const body = {
    tipoPago,
    cuentaDestino,
    orderId,
  }
  const headers = {
    'Content-Type': 'application/json',
  }
  const URL = `https://serverep-production.up.railway.app/api/ventas/${paymentId}/editar-pago`

  const res = await fetch(URL, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return data
}
