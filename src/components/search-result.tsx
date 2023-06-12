import { useEffect, useRef, useState } from 'react'
import { Film } from '../interfaces'
import { Image } from './image'
import { search } from '../api/imdb-api'
import { useNavigate } from 'react-router-dom'
import { tmdbImageSrc } from '../utils'
import { useGlobalContext } from './app-container'
import { LazyLoadImage } from 'react-lazy-load-image-component'
interface Props {
  keyword: string
  goToSearchPage: Function
}

export const SearchResult = (props: Props) => {
  const [items, setItems] = useState<Film[]>([])

  const [totalItem, setTotalItem] = useState(0)

  const searchTimeout = useRef<any>('')

  const globalContext = useGlobalContext()

  const navigate = useNavigate()

  const fetch = async () => {
    if (!props.keyword) return

    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      const res = await search(props.keyword)
      setTotalItem(res.totalPages)
      setItems(res.films)
    }, 120)
  }

  useEffect(() => {
    fetch()
  }, [props.keyword])

  return (
    <div className="absolute top-[48px] left-0  right-0 rounded-md overflow-auto bg-[#313030]  max-h-[480px] shadow-lg">
      {items.map((film, i) => (
        <div
          key={i}
          className="flex  p-1.5 rounded-lg hover:bg-[#242424] py-2 cursor-pointer "
        >
          {/*  image */}

          <LazyLoadImage
            src={tmdbImageSrc(film.posterPath)}
            width={150}
           
            className="rounded-md min-w-[150px] h-[200px] object-cover relative"
            effect="blur"
          />
          {/* <img
            src={tmdbImageSrc(film.posterPath)}
            className="h-[205px]  rounded-md object-cover"
          /> */}
          {/*   title and description */}
          <div className="px-3 truncate ">
            <p className="text-base truncate">{film.title}</p>
            <ul className=" flex flex-wrap gap-x-1.5 text-xs opacity-[0.7]">
              {film.genreIds.map((id, i) => (
                <li key={i}>
                  {
                    globalContext.genres[film.mediaType].find(
                      (g) => g.id === id
                    )?.name
                  }{' '}
                  {i !== film.genreIds.length - 1 ? ',' : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {totalItem > 3 ? (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-0.1   w-full hover:text-lime-500 sticky shadow-lg mt-8"
        >
          ดูเพิ่มเติม
        </button>
      ) : (
        ''
      )}
    </div>
  )
}
