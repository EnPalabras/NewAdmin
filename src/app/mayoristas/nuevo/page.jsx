'use client'
import { useState } from 'react'

export default function CargarMayorista() {
  const [inputs, setInputs] = useState({
    nombre: '',
    CUIT: '',
    email: '',
    telefono: '',
    ciudad: '',
    provincia: '',
    pais: '',
    codigoPostal: '',
    instagramLink: '',
    webLink: '',
    comentarios: '',
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  console.log(inputs)

  const {
    nombre,
    CUIT,
    email,
    telefono,
    ciudad,
    provincia,
    pais,
    codigoPostal,
    instagramLink,
    webLink,
    comentarios,
  } = inputs

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value })

  const onSubmitForm = async (e) => {
    e.preventDefault()
    setError(false)
    setLoading(true)
    if (
      nombre === '' ||
      CUIT === '' ||
      email === '' ||
      ciudad === '' ||
      provincia === '' ||
      pais === ''
    ) {
      setError('Por favor complete los campos obligatorios (*)')
      setLoading(false)
      return
    }

    try {
      const body = { ...inputs }
      const response = await fetch(
        'https://serverep-production.up.railway.app/api/mayoristas',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
      if (!response.ok) {
        setError(`Ocurrió un Error: Código ${response.status}`)
        console.log(response)
        return
      }
      const parseRes = await response.json()

      console.log(parseRes)
    } catch (err) {
      setTimeout(() => {
        setError('Ocurrió un error al cargar el revendedor.')
      }, 1000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900 md:ml-64 mt-10 md:mt-4 py-16">
      <div class="py-2 px-4 mx-auto max-w-screen-xl text-center">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Nuevo Revendedor
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Complete los datos del nuevo revendedor incluyendo datos de contacto y
          redes sociales en caso de tener.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={onSubmitForm}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label
                htmlFor="nombre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => onChange(e)}
                id="nombre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Juguetes S.A., En Palabras, etc."
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="CUIT"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CUIT / DNI *
              </label>
              <input
                type="text"
                name="CUIT"
                value={CUIT}
                onChange={(e) => onChange(e)}
                id="CUIT"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="20-12345678-4"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                E-Mail *
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="revendedor@email.com"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="telefono"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                value={telefono}
                onChange={(e) => onChange(e)}
                id="telefono"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="11-1234-5678"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="ciudad"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ciudad / Barrio *
              </label>
              <input
                type="text"
                name="ciudad"
                value={ciudad}
                onChange={(e) => onChange(e)}
                id="ciudad"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Villa María, Paraná, Martínez, etc."
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="provincia"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Provincia *
              </label>
              <input
                type="text"
                name="provincia"
                value={provincia}
                onChange={(e) => onChange(e)}
                id="provincia"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Buenos Aires, Córdoba, etc."
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="pais"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                País *
              </label>
              <input
                type="text"
                name="pais"
                value={pais}
                onChange={(e) => onChange(e)}
                id="pais"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Argentina, Uruguay, etc."
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="codigoPostal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Código Postal
              </label>
              <input
                type="text"
                name="codigoPostal"
                value={codigoPostal}
                onChange={(e) => onChange(e)}
                id="codigoPostal"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="5000, 2000, etc."
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="instagramLink"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Instagram (link)
              </label>
              <input
                type="text"
                name="instagramLink"
                value={instagramLink}
                onChange={(e) => onChange(e)}
                id="instagramLink"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="https://www.instagram.com/enpalabrass/"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="webLink"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Página Web (link)
              </label>
              <input
                type="text"
                name="webLink"
                value={webLink}
                onChange={(e) => onChange(e)}
                id="webLink"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="https://www.enpalabras.com.ar/"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="comentarios"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Comentarios
              </label>
              <textarea
                id="comentarios"
                rows="6"
                value={comentarios}
                onChange={(e) => onChange(e)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Agrega comentarios sobre el revendedor, por ejemplo, canales de venta, etc."
              ></textarea>
            </div>
          </div>

          {loading ? (
            <button
              type="submit"
              className="w-full text-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-medium  text-white bg-primary-700 rounded-lg hover:bg-primary-800"
              disabled
            >
              Cargando...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full text-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-medium  text-white bg-primary-700 rounded-lg hover:bg-primary-800"
            >
              Agregar Revendedor
            </button>
          )}

          {error && (
            <div
              className="flex my-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="sr-only">Danger</span>
              <div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
