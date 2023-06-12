import { BrowserRouter } from 'react-router-dom'

import { Body } from '../layouts/body'
import { Footer } from '../layouts/footer'
import { Header } from '../layouts/header'
import HeaderNavbar from '../layouts/navbar'
import { MediaType } from '../types'
import { Genre } from '../interfaces'
import { createContext, useContext, useEffect, useState } from 'react'
import { Loading } from './loading'
import { getGenres } from '../api/imdb-api'

type Genres = {
  [key in MediaType]: Genre[]
}

const GlobalContext = createContext<{
  genres: Genres
}>({
  genres: {
    movie: [],
    tv: [],
  },
})

export const useGlobalContext = () => useContext(GlobalContext)

export const AppContainer = () => {
  const [genres, setGenres] = useState<Genres>({
    movie: [],
    tv: [],
  })

  const fetchGenres = async () => {
    const movie = await getGenres('movie')
    const tv = await getGenres('tv')

    setGenres({
      movie,
      tv,
    })
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  if (!genres.movie.length || !genres.tv.length) {
    return (
      <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          genres,
        }}
      >
        {/* Header */}
        <HeaderNavbar />
        {/* Body */}
        <Body />
        {/* Footer */}
        <Footer />
      </GlobalContext.Provider>
    </BrowserRouter>
  )
}
