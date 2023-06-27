'use client'

import { Table, Pagination } from 'flowbite-react'
import { useState } from 'react'
import LocalSales from './components'

export default function Page() {
  const [selectedPage, setSelectedPage] = useState('Reventa')

  return (
    <div className="h-full flex mt-10 flex-col w-full">
      <LocalSales />
    </div>
  )
}
