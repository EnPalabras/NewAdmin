'use client'
import Avatar from './Sidebar/Avatar'
import Apps from './Sidebar/Apps'
import Notifications from './Sidebar/Notifications'
import Aside from './Sidebar/Aside'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const ref = useRef()

  const [theme, setTheme] = useState('light')

  const checkSize = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(false)
    }
  }

  const toggleTheme = () => {
    setIsDropdownOpen({
      notifications: false,
      apps: false,
      user: false,
    })
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      }
    }

    setTheme(localStorage.getItem('color-theme'))
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
    setTheme(localStorage.getItem('color-theme'))
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
    if (isDropdownOpen[dropdown]) {
      setIsDropdownOpen({
        notifications: false,
        apps: false,
        user: false,
      })
      return
    }
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
              <Link href="/" className="flex items-center justify-between mr-4">
                <img
                  src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/705/915/themes/common/logo-406989337-1661261292-f275c90c94f38041bb3595811ed7d4b31661261293-320-0.png?0"
                  className="h-8 md:h-12"
                  alt="En Palabras"
                />
              </Link>
            </div>
            <div className="flex items-center lg:order-2">
              <button
                id="theme-toggle"
                onClick={() => toggleTheme()}
                type="button"
                className="p-2 mr-1 text-gray-500 rounded-lg  hover:text-gray-900  hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 border-none"
              >
                {theme === 'light' ? (
                  <svg
                    id="theme-toggle-dark-icon"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                ) : (
                  <svg
                    id="theme-toggle-light-icon"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>

              {/* <Notifications
                isDropdownOpen={isDropdownOpen.notifications}
                setIsDropdownOpen={() => toggleDropdown('notifications')}
              /> */}
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
