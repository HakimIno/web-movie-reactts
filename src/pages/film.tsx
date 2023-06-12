import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../components/card'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { Cast, Film as FilmInterface, Trailer } from '../interfaces'
import { MediaType } from '../types'
import Hls from 'hls.js'
import ReactHlsPlayer from 'react-hls-player'
import PlayerComponent from '../components/player/player'
import { VideoPlayer } from '../components/player/playerVime'
import { Option, Select } from '@material-tailwind/react'
import { Loading } from '../components/loading'
import { useGlobalContext } from '../components/app-container'
import { getDetail } from '../api/imdb-api'
import { tmdbImageSrc } from '../utils'

interface Props {
  mediaType: MediaType
}

interface VideoPlayer extends HTMLVideoElement {
  player?: any
}

export const Film = (props: Props) => {
  const { id } = useParams<any>()

  const [selectedEP, setSelectedEP] = useState('')
  const [activeEp, setActiveEp] = useState(1)

  function setEP(index: any) {
    if (index === 1) {
      setSelectedEP(
        'https://main.77player.xyz/newplaylist/8b328553725293af302d0d76/8b328553725293af302d0d76.m3u8'
      )
    }
    if (index === 2) {
      setSelectedEP(
        'https://main.77player.xyz/newplaylist/3eefd4f026499c9d3c6906d2/3eefd4f026499c9d3c6906d2.m3u8'
      )
    }

    setActiveEp(index)
  }

  const [film, setFilm] = useState<FilmInterface | null | undefined>(null)
  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])

  const globalContext = useGlobalContext()

  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string))

    if (film) {
      setFilm(film)
      /*  setCasts(await getCasts(film.mediaType, film.id)) */
      /* setTrailers(await getTrailers(film.mediaType, film.id)) */
      /* setRecommendations(await getRecommendations(film.mediaType, film.id)) */
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  if (film === null) {
    // redirect to 404 page
    return <></>
  } else if (film === undefined) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading></Loading>
      </div>
    )
  }
  return (
    <>
      <div className=" h-[300px]  left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src={tmdbImageSrc(film.coverPath)} />
      </div>
      {/*  poster and text */}
      <Section className="-mt-[200px] block items-start relative z-10 md:flex">
        <img
          src={tmdbImageSrc(film.posterPath)}
          className="w-[300px] h-[402px] rounded-lg mx-auto md:mx-0"
        ></img>

        <div className="p-0 md:p-6">
          <p className=" text-2xl line-clamp-1 py-3">{film.title}</p>
          <p className=" text-lg line-clamp-2 md:line-clamp-3 ">
            {film.description}
          </p>
          <div className="flex items-center">
            <p className="text-lg">8.1 / 10</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#facc15"
              className="w-5 h-5 mb-1 mx-1"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
            IMDb votes
          </div>
          <div className="flex">
            <p className="mr-2">Genres: </p>
            <ul className="flex flex-wrap gap-1 ">
              {film.genreIds.map((id, i) => (
                <li key={id} className=" text-sm">
                  {
                    globalContext.genres[film.mediaType]?.find(
                      (g) => g.id === id
                    )?.name
                  }
                </li>
              ))}
            </ul>
          </div>
          <p className="mr-2">Trailer: </p>
        </div>
      </Section>
      {/* cast */}
      <Section>
        {/* <PlayerComponent /> */}
        <VideoPlayer srcVideo={selectedEP} />
        <div className="flex py-2">
          <p className=" text-xl py-2 font-Keepon text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-yellow-600">
            Episodes
          </p>
          <img src="/HakimINO-removebg-preview.png" className="h-[1.8rem]" />
        </div>
        <div className=" hidden lg:block">
          <ul className="flex flex-wrap gap-4 ">
            {film.genreIds.map((genre, i) => (
              <li
                className={`w-[70px] py-0.5 lg:py-1    hover:bg-[#f0efef] ${
                  i + 1 === activeEp ? 'bg-[#14b8a6]' : 'bg-[#333333]'
                } rounded-md text-sm hover:text-black cursor-pointer text-center`}
                key={i}
                onClick={() => setEP(i + 1)}
              >
                EP {i + 1}
              </li>
            ))}
          </ul>
        </div>
        <div
          id="slider"
          className="w-full flex lg:hidden h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-none"
        >
          <ul className="flex flex-nowrap  gap-4">
            {film.genreIds.map((genre, i) => (
              <li
                className={`w-[70px] py-1 hover:bg-[#f0efef] ${
                  i + 1 === activeEp ? 'bg-[#14b8a6]' : 'bg-[#333333]'
                } rounded-md text-sm hover:text-black cursor-pointer text-center`}
                key={i}
                onClick={() => setEP(i + 1)}
              >
                EP {i + 1}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
