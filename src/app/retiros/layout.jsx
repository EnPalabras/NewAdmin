export default async function Cargar({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <section className="h-full bg-gradient-to-b from-white via-blue-300 to-blue-800">
        {children}
      </section>
    </>
  )
}
