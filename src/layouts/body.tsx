import { Route, Routes } from 'react-router-dom'
import { AllMovie } from '../pages/all-movie'

import { Film } from '../pages/film'

/* import { ComponentType, Suspense, lazy } from 'react'
import { MediaType } from '../types' */
import { Home } from '../pages/home'
import { Catalog } from '../pages/catalog'
/* 
interface Props {
  type: MediaType | 'search' | 'list'
}

const LoadableType = (Component: React.FC<Props>) => (props: Props) => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <Component {...props} />
    </Suspense>
  )
}
const Loadable = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <Component {...props} />
    </Suspense>
  )
}
 */
export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movies" element={<Catalog type="movie" />}></Route>
      <Route path="/tv" element={<Catalog type="tv" />}></Route>
      <Route path="/search" element={<Catalog type="search" />}></Route>
      <Route path="/ดูซีรี่ย์ออนไลน์" element={<AllMovie />}></Route>
      {/*   <Route path="/list/:listTitle" element={<Catalog type="list" />}></Route> */}

      <Route path="/movie/:id" element={<Film mediaType="movie" />}></Route>
      <Route path="/tv/:id" element={<Film mediaType="tv" />}></Route>
      {/*  <Route path="/tv/:id/season/:seasonNumber" element={<Season />}></Route> */}
    </Routes>
  )
}

/* const Home = Loadable(lazy(() => import('../pages/home')))
const Catalog = LoadableType(lazy(() => import('../pages/catalog'))) */
