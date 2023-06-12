import React, { useEffect, useRef, useState } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-tailwind/react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { SearchResult } from '../components/search-result'
import { MenuToggle } from '../components/menutoggle'
import { stagger, useAnimate } from 'framer-motion'

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate([
      [
        'path.top',
        { d: isOpen ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5' },
        { at: '<' },
      ],
      ['path.middle', { opacity: isOpen ? 0 : 1 }, { at: '<' }],
      [
        'path.bottom',
        { d: isOpen ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346' },
        { at: '<' },
      ],
    ])
  }, [isOpen])

  return scope
}

export default function HeaderNavbar() {
  const [openNav, setOpenNav] = React.useState(false)

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

  const scope = useMenuAnimation(openNav)

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

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
      <h1>
        <Link to={'/'} className="flex items-center text-sm">
          หน้าแรก
        </Link>
      </h1>
      <h1>
        <Link to={'/movies'} className="flex items-center text-sm">
          ดูหนัง-netflix
        </Link>
      </h1>
      <h1>
        <Link to={'/tv'} className="flex items-center text-sm">
          ซีรี่ย์ใหม่-2023
        </Link>
      </h1>
    </ul>
  )

  return (
    <>
      <Navbar className="sticky inset-0 z-20 h-max max-w-full mx-auto  border-none  py-2 px-4 lg:px-8 lg:py-4 bg-[#242424] ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-gray-100 ">
            <div className="flex items-center">
              <Typography
                as="a"
                href="/"
                className="mr-4 cursor-pointer py-1.5 font-medium"
              >
                <h1 className=" text-2xl font-semibold">
                  <Link to={'/'}>
                    <div className="flex gab-1 cursor-pointer ">
                      <img
                        src="/HakimINO-removebg-preview.png"
                        className="h-[2rem] z-0"
                      />
                      <span className="font-Keepon mt-1  font-medium text-transparent  bg-clip-text bg-gradient-to-r from-primary to-[#facc15]">
                        Chill
                        <span className="text-transparent  bg-clip-text bg-gradient-to-r from-[#facc15] to-primary ">
                          <span className="">&#127909;</span>HD
                        </span>
                      </span>
                    </div>
                  </Link>
                </h1>
              </Typography>
              <div className="mr-4 hidden lg:block">{navList}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className=" items-center relative  hidden lg:flex">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-[25rem]">
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
                    onKeyDown={(e) =>
                      e.key === 'Enter' ? goToSearchPage() : ''
                    }
                    onInput={(e) => setKeyword(e.currentTarget.value)}
                    value={keyword}
                    type="text"
                    id="simple-search"
                    className="  text-gray-300  text-sm rounded-lg w-full pl-10 p-1.5  dark:bg-[#242424] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "
                    placeholder="Search"
                    autoComplete="off"
                  />
                </div>

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

              <div
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent border-none focus:bg-transparent active:bg-transparent lg:hidden "
                ref={scope}
              >
                <MenuToggle toggle={() => setOpenNav(!openNav)} />
              </div>
            </div>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
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
              autoComplete="off"
              type="text"
              id="simple-search"
              className="  text-gray-300  text-sm rounded-lg w-full pl-10 p-1.5  dark:bg-[#242424] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "
              placeholder="Search"
            />
          </div>
        </MobileNav>
      </Navbar>
    </>
  )
}
