'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function Register() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { name, email, password, password2 } = inputs

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value })

  const onSubmitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      if (password !== password2) {
        return setError(true)
      }
      const body = { name, email, password }
      const response = await fetch(
        'https://serverep-production.up.railway.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      if (response.status === 201) {
        const result = await signIn('credentials', {
          redirect: true,
          email,
          password,
        })
      } else {
        setError(true)
      }
    } catch (err) {
      console.error(err.message)
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crea tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmitForm}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="En Palabras"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  E-Mail
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ingreso@enpalabras.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirma tu Contraseña
                </label>
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={(e) => onChange(e)}
                  id="password2"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {loading ? (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled
                >
                  Creando Cuenta...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Crear Cuenta
                </button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Si ya tenés una cuenta{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Ingresa
                </Link>
              </p>

              {error && (
                <div
                  class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>

                  <span class="sr-only">Danger</span>
                  <div>
                    <span class="font-medium">
                      Ocurrió un error al crear la cuenta:
                    </span>
                    <ul class="mt-1.5 ml-4 list-disc list-inside">
                      <li>Compruebe que las contraseñas coincidan</li>
                      <li>Confirme si ya tiene una cuenta</li>
                      <li>De aviso si el problema persiste</li>
                    </ul>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
