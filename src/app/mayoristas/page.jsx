import CardMayorista from '@/components/Cards/Mayoristas'
import Link from 'next/link'
import { use } from 'react'

const fakeData = [
  {
    name: 'Juan Perez',
    CUIT: '20-12345678-9',
    lastBuy: '20/10/2021',
    email: 'agusiglesias82@gmail.com',
    phone: '1131231231',
    city: 'CABA',
    province: 'Buenos Aires',
    country: 'Argentina',
    instagramLink: 'https://www.instagram.com/enpalabrass/',

    webLink: 'https://www.instagram.com/enpalabrass/',
  },
  {
    name: 'Juan Perez',
    CUIT: '20-12345678-9',
    lastBuy: '20/10/2021',
    city: 'CABA',
    email: 'agusiglesias82@gmail.com',
    phone: '1131231231',
    province: 'Buenos Aires',
    instagramLink: 'https://www.instagram.com/enpalabrass/',

    webLink: 'https://www.instagram.com/enpalabrass/',
    country: 'Argentina',
  },
  {
    name: 'Juan Perez',
    lastBuy: '20/10/2021',
    CUIT: '20-12345678-9',
    city: 'CABA',
    province: 'Buenos Aires',
    email: 'agusiglesias82@gmail.com',
    phone: '1131231231',
    country: 'Argentina',
    instagramLink: 'https://www.instagram.com/enpalabrass/',

    webLink: 'https://www.instagram.com/enpalabrass/',
  },
  {
    name: 'Juan Perez',
    lastBuy: '20/10/2021',
    CUIT: '20-12345678-9',
    instagramLink: 'https://www.instagram.com/enpalabrass/',

    webLink: 'https://www.instagram.com/enpalabrass/',
    city: 'CABA',
    email: 'agusiglesias82@gmail.com',
    phone: '1131231231',
    province: 'Buenos Aires',
    country: 'Argentina',
  },
]

export default function MayoristasPage() {
  const data = use(getData())

  console.log(data)

  return (
    <section className="bg-white dark:bg-gray-900 md:ml-64 mt-10 md:mt-4 py-16">
      <div className="px-8">
        <section className="bg-white dark:bg-gray-900">
          <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Revendedores
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
              Consulta la información de los revendedores, links a sus redes,
              datos de contacto y ventas realizadas a cada uno.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Link
                href="/mayoristas/nuevo"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Añadir Nuevo
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gridGap: '1rem',
          }}
        >
          {data.data.map((data, i) => {
            return <CardMayorista key={i} data={data} />
          })}
        </div>
      </div>
    </section>
  )
}

async function getData() {
  const res = await fetch(
    `https://serverep-production.up.railway.app/api/mayoristas`
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
