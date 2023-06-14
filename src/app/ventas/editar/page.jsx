'use client'

import SalesTable from '@/components/SalesTable'
import { useState } from 'react'

export default function Page() {
  const [selectedPage, setSelectedPage] = useState('Reventa')

  return (
    <section className="bg-white dark:bg-gray-900  md:ml-64 mt-10 md:mt-4 py-16">
      <div className="text-sm font-medium mx-auto text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 ">
        <h1 className="mb-4 text-4xl font-extrabold max-w-screen-xl text-center tracking-tight leading-none text-gray-900  dark:text-white">
          Editar Ventas
        </h1>
        <p className="text-lg font-normal text-gray-500  text-center  lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Aquí podrás editar la información de ventas ya cargadas. Busca la
          venta que deseas editar y haz click en el botón "Editar".
        </p>
        <div className="mt-4">
          {' '}
          <SalesTable />
        </div>
      </div>
    </section>
  )
}
