import { useEffect, useRef, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { Container } from '../components/container'
import { SearchResult } from '../components/search-result'
import { mergeClassName } from '../utils'

const MENU_ClASS = `
    p-1.5
    hover:bg-primary
    rounded-md
    font-bold
`
const MENU_ClASS_ACTIVE = `
    bg-primary
    
`

export const Header = () => {
  const location = useLocation()
  const [params, _] = useSearchParams()
  const navigate = useNavigate()

  const [pathname, setPathname] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const pathnameRef = useRef('')
  const defaultKeyword = useRef('')

  const [keyword, setKeyword] = useState('')
  const [isSearchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  //
  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword
      navigate(`/search?q=${keyword}`)
      setSearchFocus(false)
      searchRef.current?.blur()
    }
  }

  const initKeyword = () => {
    if (pathnameRef.current === '/search') {
      setKeyword(defaultKeyword.current)
    } else {
      setKeyword('')
    }
  }
  const onWindowClick = () => {
    setSearchFocus(false)
    initKeyword()
  }
  const getMenuClass = (path: string) => {
    if (path === pathname) {
      return mergeClassName(MENU_ClASS, MENU_ClASS_ACTIVE)
    }
    return mergeClassName(MENU_ClASS, '')
  }

  useEffect(() => {
    setPathname(location.pathname)
    pathnameRef.current = location.pathname
    defaultKeyword.current = params.get('q') || ''
    initKeyword()
  }, [location.pathname])

  useEffect(() => {
    window.addEventListener('click', onWindowClick)

    return () => {
      window.removeEventListener('click', onWindowClick)
    }
  }, [])

  const dropdownRef = useRef(null)

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <nav className="shadow-none lg:shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 ">
              <h1 className=" text-2xl font-semibold">
                <Link to={'/'}>
                  <div className="flex gab-1 cursor-pointer">
                    <span className="font-Keepon text-[20px] md:text-[26px] text-[#8bc34a] font-medium">
                    Video<span className="text-yellow-400 ">HD</span>
                    </span>
                  </div>
                </Link>
              </h1>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to={'/movie'}
                  className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  หนัง
                </Link>
                <Link
                  to={'/tv'}
                  className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  ซีรีย์
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="block h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className=" items-center relative  hidden lg:flex">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-[20rem]">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onClick={(e) => {
                  e.stopPropagation()
                  setSearchFocus(true)
                }}
                onKeyDown={(e) => (e.key === 'Enter' ? goToSearchPage() : '')}
                onInput={(e) => setKeyword(e.currentTarget.value)}
                value={keyword}
                type="text"
                id="simple-search"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg w-full pl-10 p-1.5  dark:bg-[#242424] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              className="p-1.5 mx-3  text-sm font-medium text-white bg-lime-400 rounded-lg border border-lime-400 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-500 dark:hover:bg-lime-500 dark:focus:ring-lime-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

           <div className="z-30">
           {isSearchFocus ? (
              <SearchResult
                keyword={keyword}
                goToSearchPage={goToSearchPage}
              ></SearchResult>
            ) : (
              ''
            )}
           </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div
          className={`lg:hidden shadow-2xl transition duration-200 ease-in-out transform ${
            isOpen ? 'scale-y-100' : 'scale-y-0'
          } origin-top static`}
          id="mobile-menu"
        >
          <div className="px-2 pb-3 space-y-1 sm:px-3 space-x-3 overflow-x-scroll  ">
            <Link
              to={'/movie'}
              className="text-white px-3 py-2 rounded-md text-sm font-medium w-full"
            >
              หนัง
            </Link>
            <Link
              to={'/tv'}
              className=" text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              ซีรีย์
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={`lg:hidden shadow-2xl transition duration-200 ease-in transform ${
            isOpen ? 'scale-y-100' : 'scale-y-0'
          }  `}
          id="mobile-menu"
        ></div>
      )}
    </nav>
  )
}
