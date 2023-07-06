const metadata = {
  title: 'En Palabras - Nueva Venta',
  description: 'Administrador de En Palabras',
}

export default async function Cargar({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <section className="h-full py-2 min-h-screen bg-gradient-to-b from-blue-800 via-blue-300 to-blue-100">
        {children}
      </section>
    </>
  )
}
