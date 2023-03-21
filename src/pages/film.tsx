import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../components/card'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { Cast, Trailer } from '../interfaces'
import { MediaType } from '../types'

interface Props {
  mediaType: MediaType
}

export const Film = (props: Props) => {
  const { params } = useParams()

  const [film, setFilm] = useState({
    id: 0,
    title: 'The Glory (2022)',
    mediaType: 'movie',
    description:
      'Genres: ซีรี่ย์พากย์ไทย, ซีรี่ย์ซับไทย, ซีรี่ย์ใหม่ 2022, ซีรี่ย์เกาหลี, หนัง Netflix, Drama ชีวิต, ดูซีรี่ย์ออนไลน์, Thriller ระทึกขวัญ, ตอนแรก, พากย์ไทย, ซับไทย',
    posterPath:
      'https://www.123-hd.com/wp-content/uploads/2022/12/The-Glory-300x450.png',
    coverPath: '',
    genreIds: [1, 2, 3, 4, , 5, 6, 7, 8, 9, 10, 11],
    seasons: [],
  })
  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])

  const fetch = () => {
    const arrs: any[] = []

    for (let i = 0; i < 20; i++) {
      arrs.push({})
      setCasts(arrs)
      setTrailers(arrs)
    }
  }

  useEffect(() => {
    fetch()
  }, [])
  return (
    <>
      <div className=" h-[300px]  left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src="https://sls-prod.api-onscene.com/partner_files/trueidintrend/271567/cover_image/%E0%B8%A3%E0%B8%B5%E0%B8%A7%E0%B8%B4%E0%B8%A7%20The%20Glory.JPG" />
      </div>
      {/*  poster and text */}
      <Section className="-mt-[200px] md:-mt-[150px] block items-start relative z-10 md:flex">
        <img
          src={film.posterPath}
          className="w-[230px] m-w-[200px] h-[300px] rounded-lg mx-auto md:mx-0"
        ></img>

        <div className="p-3 ">
          <p className=" text-xl line-clamp-1 ">{film.title}</p>
          <p className=" text-xl line-clamp-2 md:line-clamp-3 ">
            {film.description}
          </p>
          <p className=" text-xl py-2 ">ตอน</p>
          <ul className="flex flex-wrap gap-3">
            {film.genreIds.map((genre, i) => (
              <li
                className="w-[50px] py-1 bg-[#333333] hover:bg-[#f0efef] rounded-md text-sm hover:text-black cursor-pointer text-center"
                key={i}
              >
                EP {i}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      {/* cast */}

      <Section title="Casts">
        <div className=" overflow-x-auto">
          <div className="flex items-center gap-3">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 w-[200px] mb-6" key={i}>
                <Card key={i} title="Kimsnow Test" imageSrc="" />
              </div>
            ))}
          </div>
        </div>
      </Section>
     
    </>
  )
}
