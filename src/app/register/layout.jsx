export default function RegisterLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  )
}
