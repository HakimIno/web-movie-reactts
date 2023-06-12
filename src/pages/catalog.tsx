import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/card'
import { Section } from '../components/section'
import { Film } from '../interfaces'
import { MediaType } from '../types'

interface Props {
  type: MediaType | 'search' | 'list'
}

export const Catalog = (props: Props) => {
  let title = ''

  const [films, setFilms] = useState<Film[]>([])
  const [params, _] = useSearchParams()

  switch (props.type) {
    case 'movie':
      title = 'Movies'
      break
    case 'tv':
      title = 'TV'
      break
    case 'search':
      title = `Search results for: ${params.get('q')}`
      break
    default:
      break
  }
  const fetch = () => {
    const arrs: any[] = []

    for (let i = 0; i < 20; i++) {
      arrs.push({
        title: 'The Glory (2023) s2 ',
      })
    }

    setFilms(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])
  return (
    <>
      <div className="">
        <div className=""></div>
      </div>
      <Section className=" flex items-center relative z-10 ">
        <p className="text-xl text-transparent font-Keepon bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
          {title}
        </p>
      </Section>

      <Section>
        <div className=" grid lg:grid-cols-5 sm:grid-cols-4 relative z-[11]">
          {films.map((film, i) => (
            <div className="">
              <Card imageSrc="" title={film.title} key={i}></Card>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}


