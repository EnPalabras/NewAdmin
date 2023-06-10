'use client'

import OrderReventa from '@/components/Forms/AddReventa'
import { useState } from 'react'

export default function Page() {
  const [selectedPage, setSelectedPage] = useState('Reventa')

  const selections = ['Reventa', 'Regalo', 'Personal']

  return (
    <section className="bg-white dark:bg-gray-900 md:ml-64 mt-10 lg:mt-4 lg:py-16">
      <div class="text-sm font-medium mx-auto text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 ">
        <h1 class="mb-4 text-4xl font-extrabold  text-center tracking-tight leading-none text-gray-900  dark:text-white">
          Cargar Venta
        </h1>
        <p class="text-lg font-normal text-gray-500  text-center  lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Selecciona el tipo de venta que deseas cargar
        </p>

        <ul class="flex flex-wrap -mb-px justify-center">
          {selections.map((selection, index) => (
            <li class="mr-2" key={index}>
              <div
                className={
                  selectedPage === selection
                    ? 'inline-block p-4 cursor-pointer text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                    : 'inline-block p-4 cursor-pointer border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }
                onClick={() => setSelectedPage(selection)}
              >
                {selection}
              </div>
            </li>
          ))}
        </ul>
        {selectedPage === 'Reventa' && <OrderReventa />}
        {selectedPage === 'Regalo' && <OrderReventa />}
      </div>
    </section>
  )
}
