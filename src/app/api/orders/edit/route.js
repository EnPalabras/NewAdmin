import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request) {
  const { products, idEP, paymentId } = await request.json()

  const path = request.nextUrl.searchParams.get('path') || '/'

  console.log('path', path)

  const data = await editProductsFromOrder(idEP, products, paymentId)

  revalidatePath(path)

  return NextResponse.json(data)
}

const editProductsFromOrder = async (idEP, products, paymentId) => {
  const body = {
    products,
    paymentId,
  }
  const headers = {
    'Content-Type': 'application/json',
  }
  const URL = `https://serverep-production.up.railway.app/api/ventas/${idEP}/editar-productos`

  const res = await fetch(URL, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return data
}
