import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonAll } from '../components/button-all'
import { Card } from '../components/card'
import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
import { TrendingHero } from '../components/trendings-hero'
import { Film } from '../interfaces'
import {
  getInTheaters,
  getPopulars,
  getTopRated,
  getTrendings,
} from '../api/imdb-api'
import { isFilm, mergeFilms, tmdbImageSrc } from '../utils'

export const Home = () => {
  const navigate = useNavigate()
  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTgeaters, setInTgeaters] = useState<Film[]>([])
  const [populars, setInPopulars] = useState<Film[]>([])
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([])
  const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])

  const fetchTopRatedMovie = async () => {
    setTopRatedMovie(await (await getTopRated('movie')).films)
  }

  const fetchTopRatedTv = async () => {
    setTopRatedTv(await (await getTopRated('tv')).films)
  }
  const fetchPopulars = async () => {
    const movies = await getPopulars('movie')
    const tvs = await getPopulars('tv')

    setInPopulars(mergeFilms(movies, tvs, 20))
  }

  const fetchInTheaters = async () => {
    setInTgeaters(await getInTheaters())
  }

  const fetchTrending = async () => {
    const movies = await getTrendings('movie')
    const tvs = await getTrendings('tv')

    setTrendings(mergeFilms(movies, tvs))
  }

  const goToDetailPage = (film: Film) => {
    navigate(`/${film.mediaType}/${film.id}`)
  }

  useEffect(() => {
    fetchTopRatedMovie()
    fetchTopRatedTv()
    fetchPopulars()
    fetchTrending()
    fetchInTheaters()
  }, [])

  return (
    <>
      {/* trendings */}

      <Section>
        <Slider
          className="slick-hero "
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          infinite={true}
          arrows={false}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ''
                }
                film={film}
                key={i}
              ></TrendingHero>
            ))
          }
        </Slider>
      </Section>
      {/* inteaters */}
      <Section title="อัพเดตใหม่">
        <Slider isMovieCard={true}>
          {(onSwipe) =>
            inTgeaters.map((film, i) => (
              <Card
                imageSrc={tmdbImageSrc(film.posterPath)}
                title={film.title}
                key={i}
                onClick={() => (!onSwipe ? goToDetailPage(film) : '')}
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* populars */}
      <Section title="ซีรี่ย์จีน">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {populars.slice(0, 10).map((film, i) => (
            <Card
              imageSrc={tmdbImageSrc(film.posterPath)}
              title={film.title}
              key={i}
              onClick={() => (goToDetailPage(film))}
            ></Card>
          ))}
        </div>
        {populars.length > 10 && (
          <div className="flex justify-between w-full py-3">
            <div className=""></div>
            <ButtonAll text="ซีรี่ย์จีน" />
          </div>
        )}
      </Section>

      <Section title="ซีรี่ย์ฝรั่ง">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {inTgeaters.slice(0, 10).map((film, i) => (
            <Card
              imageSrc={tmdbImageSrc(film.posterPath)}
              title={film.title}
              key={i}
              onClick={() => (goToDetailPage(film))}
            ></Card>
          ))}
        </div>
        {topRatedTv.length > 10 && (
          <div className="flex justify-between w-full py-3 ">
            <div className=""></div>
            <ButtonAll text="ซีรี่ย์ฝรั่ง" />
          </div>
        )}
      </Section>
      <Section title="ซีรี่ย์ญี่ปุ่น">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {topRatedMovie.slice(0, 10).map((film, i) => (
            <Card
              imageSrc={tmdbImageSrc(film.posterPath)}
              title={film.title}
              key={i}
              onClick={() => (goToDetailPage(film))}
            ></Card>
          ))}
        </div>
        {topRatedMovie.length > 10 && (
          <div className="flex justify-between w-full py-3 ">
            <div className=""></div>
            <ButtonAll text="ซีรี่ย์ญี่ปุ่น" />
          </div>
        )}
      </Section>
      {/* top rated tv*/}
      {/* top rated movie*/}
    </>
  )
}
