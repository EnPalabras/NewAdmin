import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const body = await request.json()

  const sendPost = await postOrder(body)

  const path = request.nextUrl.searchParams.get('path') || '/'

  revalidatePath(path)
  revalidatePath('/')

  return NextResponse.json(sendPost)
}

const postOrder = async (body) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  // const URL = `https://serverep-production.up.railway.app/api/ventas/local`
  const URL = `http://localhost:8000/api/ventas/local`

  const res = await fetch(URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return data
}
