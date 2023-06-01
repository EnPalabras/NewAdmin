'use client'
import Avatar from './Sidebar/Avatar'
import Apps from './Sidebar/Apps'
import Notifications from './Sidebar/Notifications'
import Aside from './Sidebar/Aside'
import { useEffect, useState, useRef } from 'react'

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const ref = useRef()

  const checkSize = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(false)
    }
  }

  const onClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      window.innerWidth <= 768
    ) {
      setIsSidebarOpen(false)
    }
  }
  useEffect(() => {
    const onResize = () => checkSize()

    window.addEventListener('resize', onResize)

    window.addEventListener('click', onClickOutside)
  }, [])

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    notifications: false,
    apps: false,
    user: false,
  })

  const toggleDropdown = (dropdown) => {
    setIsSidebarOpen(false)
    setIsDropdownOpen({
      notifications: false,
      apps: false,
      user: false,
    })
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }))
  }

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900" ref={ref}>
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen)
                  setIsDropdownOpen({
                    notifications: false,
                    apps: false,
                    user: false,
                  })
                }}
                className="p-2 mr-2 text-gray-100 rounded-lg cursor-pointer md:hidden hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border-none focus:border-none focus:outline-none bg-transparent text-gray-900 hover:bg-gray-300 bg-none"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <a
                href="https://flowbite.com"
                className="flex items-center justify-between mr-4"
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/logo.svg"
                  className="mr-3 h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbit
                </span>
              </a>
            </div>
            <div className="flex items-center lg:order-2">
              <Notifications
                isDropdownOpen={isDropdownOpen.notifications}
                setIsDropdownOpen={() => toggleDropdown('notifications')}
              />
              <Apps
                isDropdownOpen={isDropdownOpen.apps}
                setIsDropdownOpen={() => toggleDropdown('apps')}
              />
              <Avatar
                isDropdownOpen={isDropdownOpen.user}
                setIsDropdownOpen={() => toggleDropdown('user')}
              />
            </div>
          </div>
        </nav>

        <Aside showSidebar={isSidebarOpen} />

        {children}
      </div>
    </>
  )
}

export default Sidebar
