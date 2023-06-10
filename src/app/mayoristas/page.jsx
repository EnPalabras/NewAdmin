import CardMayorista from '@/components/Cards/Mayoristas'
import React from 'react'

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

export default function page() {
  return (
    <section className="bg-white dark:bg-gray-900 md:ml-64 mt-10 md:mt-4 py-16">
      <div className="px-8">
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gridGap: '1rem',
          }}
        >
          {fakeData.map((data, i) => {
            return <CardMayorista key={i} data={data} />
          })}
        </div>
      </div>
    </section>
  )
}
