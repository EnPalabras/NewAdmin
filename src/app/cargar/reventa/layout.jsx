import Sidebar from '@/components/Sidebar'
import Script from 'next/script'

export default async function Reventa({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <Sidebar />{' '}
      <section className="bg-gray-50 dark:bg-gray-900">
        {/* Include shared UI here e.g. a header or sidebar */}
        {children}
      </section>
      <Script
        strategy="afterInteractive"
        id="flowbite-bundle"
        src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js"
      />
    </>
  )
}
