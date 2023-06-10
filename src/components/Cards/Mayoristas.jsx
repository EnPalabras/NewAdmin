import Link from 'next/link'

export default function CardMayorista({ data }) {
  const {
    name,
    CUIT,
    city,
    province,
    email,
    phone,
    country,
    lastBuy,
    instagramLink,
    webLink,
  } = data

  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col items-center py-6">
        <h5 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <div className="flex mb-2  justify-around w-full">
          <span class="text-sm text-gray-500 dark:text-gray-400">{email}</span>
        </div>
        <div className="flex  justify-around w-full">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {city}, {province}{' '}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">{CUIT}</span>
        </div>

        <div class="flex my-4 space-x-3 md:mt-6">
          <Link
            href={`/mayoristas/${CUIT}`}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver Info
          </Link>
        </div>

        <div class="text-gray-500 dark:text-gray-400 flex  justify-evenly w-full">
          <Link href={instagramLink} target="_blank">
            <svg
              fill="currentColor"
              width="30"
              height="30"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M62.9 19.2C62.8 16 62.2 13.7 61.5 11.6C60.8 9.5 59.7 7.8 58 6.1C56.3 4.4 54.6 3.4 52.6 2.6C50.6 1.8 48.4 1.3 45 1.2C41.5 1 40.5 1 32 1C23.5 1 22.6 1 19.2 1.1C15.8 1.2 13.7 1.8 11.6 2.5C9.5 3.2 7.8 4.4 6.1 6.1C4.4 7.8 3.3 9.5 2.6 11.6C1.8 13.6 1.3 15.8 1.2 19.2C1.1 22.6 1 23.5 1 32C1 40.5 1 41.4 1.1 44.8C1.2 48.2 1.8 50.3 2.5 52.4C3.2 54.5 4.3 56.2 6 57.9C7.7 59.6 9.5 60.7 11.5 61.4C13.5 62.1 15.7 62.7 19.1 62.8C22.5 63 23.4 63 31.9 63C40.4 63 41.3 63 44.7 62.9C48.1 62.8 50.2 62.2 52.3 61.5C54.4 60.8 56.1 59.7 57.8 58C59.5 56.3 60.6 54.5 61.3 52.5C62 50.5 62.6 48.3 62.7 44.9C62.8 41.7 62.8 40.7 62.8 32.2C62.8 23.7 63 22.6 62.9 19.2ZM57.3 44.5C57.2 47.5 56.6 49.1 56.2 50.3C55.6 51.7 54.9 52.8 53.8 53.8C52.7 54.9 51.7 55.5 50.3 56.2C49.2 56.6 47.6 57.2 44.5 57.3C41.3 57.3 40.3 57.3 32.1 57.3C23.9 57.3 22.8 57.3 19.6 57.2C16.6 57.1 15 56.5 13.8 56.1C12.4 55.5 11.3 54.8 10.3 53.7C9.2 52.6 8.6 51.6 7.9 50.2C7.5 49.1 6.9 47.5 6.8 44.4C6.8 41.3 6.8 40.3 6.8 32C6.8 23.7 6.8 22.7 6.9 19.5C7 16.5 7.6 14.9 8 13.7C8.6 12.3 9.3 11.2 10.3 10.2C11.4 9.1 12.4 8.5 13.8 7.9C14.9 7.5 16.5 6.9 19.6 6.8C22.8 6.7 23.8 6.7 32.1 6.7C40.4 6.7 41.4 6.7 44.6 6.8C47.6 6.9 49.2 7.5 50.4 7.9C51.8 8.5 52.9 9.2 53.9 10.2C55 11.3 55.6 12.3 56.3 13.7C56.7 14.8 57.3 16.4 57.4 19.5C57.5 22.7 57.5 23.7 57.5 32C57.5 40.3 57.4 41.3 57.3 44.5Z" />
              <path d="M32.0016 16.0996C23.1016 16.0996 16.1016 23.2996 16.1016 31.9996C16.1016 40.8996 23.3016 47.8996 32.0016 47.8996C40.7016 47.8996 48.0016 40.8996 48.0016 31.9996C48.0016 23.0996 40.9016 16.0996 32.0016 16.0996ZM32.0016 42.3996C26.2016 42.3996 21.6016 37.6996 21.6016 31.9996C21.6016 26.2996 26.3016 21.5996 32.0016 21.5996C37.8016 21.5996 42.4016 26.1996 42.4016 31.9996C42.4016 37.7996 37.8016 42.3996 32.0016 42.3996Z" />
              <path d="M48.7 19.1002C50.7435 19.1002 52.4 17.4436 52.4 15.4002C52.4 13.3567 50.7435 11.7002 48.7 11.7002C46.6565 11.7002 45 13.3567 45 15.4002C45 17.4436 46.6565 19.1002 48.7 19.1002Z" />
            </svg>
          </Link>
          <Link href={webLink} target="_blank">
            <svg
              fill="currentColor"
              width="30"
              height="30"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path class="st0" d="M32,3.3" />
              <path
                d="M58.4,17.1c-4.1-7.1-11-12.4-19-14.4c-2.6-0.6-5-0.9-7.4-0.9c-2.5,0-5.1,0.3-7.6,1C16.5,4.8,9.7,10,5.7,17.2
	C3.1,21.8,1.8,26.8,1.8,32l0,0.7c0.1,5.5,1.8,10.9,4.7,15.6c4.8,7.6,12.7,12.6,21.5,13.6c1.2,0.2,2.5,0.3,4,0.3
	c1.2,0,2.5-0.1,3.7-0.2c9-1.1,16.9-6.1,21.8-13.7c3-4.6,4.6-10,4.8-15.6V32C62.3,27,60.9,21.8,58.4,17.1z M51.3,30.6
	c-0.3-3.3-1.1-6.5-2.4-9.5h6.4c1.4,3,2.2,6.3,2.4,9.5H51.3z M6.3,30.6c0.2-3.3,1-6.5,2.4-9.5h5.8c-1.3,3-2,6.2-2.3,9.5H6.3z
	 M19.5,21.1h10.2v9.5H16.8C17.1,27.2,18,24,19.5,21.1z M41.2,16.6h-7V8.3C36.5,10.1,38.8,12.9,41.2,16.6z M29.8,8.2v8.4h-7.5
	C24.8,12.8,27.3,10,29.8,8.2z M29.8,35.1v9.5h-10c-1.6-2.9-2.6-6.2-2.9-9.5H29.8z M29.8,49.1V56c-2.5-1.7-5-4.1-7.2-6.9H29.8z
	 M34.3,56v-7h7.6C39.8,51.9,37.2,54.3,34.3,56z M34.3,44.6v-9.5h12.6c-0.2,3.3-1,6.5-2.4,9.5H34.3z M34.3,30.6v-9.5h9.7
	c1.5,2.9,2.5,6.2,2.8,9.5H34.3z M52.6,16.6h-6.1c-2.2-3.7-4.4-6.7-6.6-9C45,9.2,49.5,12.4,52.6,16.6z M23.5,7.7
	c-2.2,2.3-4.4,5.3-6.6,8.8h-5.4C14.5,12.5,18.7,9.4,23.5,7.7z M6.4,35.1h5.9c0.3,3.3,1.1,6.5,2.4,9.5H9.5
	C7.8,41.6,6.8,38.4,6.4,35.1z M12.7,49.1h4.5c1.6,2.6,3.6,5,5.6,7C18.9,54.6,15.4,52.2,12.7,49.1z M41.9,55.8c2-1.9,3.8-4.2,5.2-6.6
	c0,0,0-0.1,0.1-0.1h4.1C48.7,52,45.5,54.3,41.9,55.8z M54.5,44.6h-5.2c1.2-3,1.9-6.2,2-9.5h6.2C57.2,38.4,56.1,41.6,54.5,44.6z"
              />
            </svg>
          </Link>
          <svg
            fill="currentColor"
            width="30"
            height="30"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M62.9 19.2C62.8 16 62.2 13.7 61.5 11.6C60.8 9.5 59.7 7.8 58 6.1C56.3 4.4 54.6 3.4 52.6 2.6C50.6 1.8 48.4 1.3 45 1.2C41.5 1 40.5 1 32 1C23.5 1 22.6 1 19.2 1.1C15.8 1.2 13.7 1.8 11.6 2.5C9.5 3.2 7.8 4.4 6.1 6.1C4.4 7.8 3.3 9.5 2.6 11.6C1.8 13.6 1.3 15.8 1.2 19.2C1.1 22.6 1 23.5 1 32C1 40.5 1 41.4 1.1 44.8C1.2 48.2 1.8 50.3 2.5 52.4C3.2 54.5 4.3 56.2 6 57.9C7.7 59.6 9.5 60.7 11.5 61.4C13.5 62.1 15.7 62.7 19.1 62.8C22.5 63 23.4 63 31.9 63C40.4 63 41.3 63 44.7 62.9C48.1 62.8 50.2 62.2 52.3 61.5C54.4 60.8 56.1 59.7 57.8 58C59.5 56.3 60.6 54.5 61.3 52.5C62 50.5 62.6 48.3 62.7 44.9C62.8 41.7 62.8 40.7 62.8 32.2C62.8 23.7 63 22.6 62.9 19.2ZM57.3 44.5C57.2 47.5 56.6 49.1 56.2 50.3C55.6 51.7 54.9 52.8 53.8 53.8C52.7 54.9 51.7 55.5 50.3 56.2C49.2 56.6 47.6 57.2 44.5 57.3C41.3 57.3 40.3 57.3 32.1 57.3C23.9 57.3 22.8 57.3 19.6 57.2C16.6 57.1 15 56.5 13.8 56.1C12.4 55.5 11.3 54.8 10.3 53.7C9.2 52.6 8.6 51.6 7.9 50.2C7.5 49.1 6.9 47.5 6.8 44.4C6.8 41.3 6.8 40.3 6.8 32C6.8 23.7 6.8 22.7 6.9 19.5C7 16.5 7.6 14.9 8 13.7C8.6 12.3 9.3 11.2 10.3 10.2C11.4 9.1 12.4 8.5 13.8 7.9C14.9 7.5 16.5 6.9 19.6 6.8C22.8 6.7 23.8 6.7 32.1 6.7C40.4 6.7 41.4 6.7 44.6 6.8C47.6 6.9 49.2 7.5 50.4 7.9C51.8 8.5 52.9 9.2 53.9 10.2C55 11.3 55.6 12.3 56.3 13.7C56.7 14.8 57.3 16.4 57.4 19.5C57.5 22.7 57.5 23.7 57.5 32C57.5 40.3 57.4 41.3 57.3 44.5Z" />
            <path d="M32.0016 16.0996C23.1016 16.0996 16.1016 23.2996 16.1016 31.9996C16.1016 40.8996 23.3016 47.8996 32.0016 47.8996C40.7016 47.8996 48.0016 40.8996 48.0016 31.9996C48.0016 23.0996 40.9016 16.0996 32.0016 16.0996ZM32.0016 42.3996C26.2016 42.3996 21.6016 37.6996 21.6016 31.9996C21.6016 26.2996 26.3016 21.5996 32.0016 21.5996C37.8016 21.5996 42.4016 26.1996 42.4016 31.9996C42.4016 37.7996 37.8016 42.3996 32.0016 42.3996Z" />
            <path d="M48.7 19.1002C50.7435 19.1002 52.4 17.4436 52.4 15.4002C52.4 13.3567 50.7435 11.7002 48.7 11.7002C46.6565 11.7002 45 13.3567 45 15.4002C45 17.4436 46.6565 19.1002 48.7 19.1002Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}