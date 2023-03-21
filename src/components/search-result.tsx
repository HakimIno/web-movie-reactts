import { useEffect, useState } from 'react'
import { Film } from '../interfaces'
import { Image } from './image'

interface Props {
  keyword: string
  goToSearchPage: Function
}

export const SearchResult = (props: Props) => {
  const [items, setItems] = useState<Film[]>([])

  const [totalItems, setTotalItems] = useState(4)

  const fetch = () => {
    const arrs: Film[] = []

    for (let i = 0; i < 10; i++) {
      arrs.push({
        id: 1,
        title: 'Kimsnow flex items-start p-1.5 rounded-lg hover:bg',
        mediaType: "tv",
        description: '',
        posterPath:
          'https://www.123-hd.com/wp-content/uploads/2023/02/Taxi-Driver-Season-2-2023-300x450.jpg',
        coverPath: '',
        genreIds: [1, 2, 3, 4, 5, 6],
        seasons: [],
      })
    }

    setItems(arrs)
  }

  useEffect(() => {
    fetch()
  }, [props.keyword])

  return (
    <div className="absolute top-[48px] left-0  right-0 rounded-md overflow-auto bg-[#313030] shadow-xl max-h-[480px] shadow-lg">
      {items.map((film, i) => (
        <div
          key={i}
          className="flex items-start p-1.5 rounded-lg hover:bg-[#242424] cursor-pointer"
        >
          {/*  image */}
 
          <img src={film.posterPath} className="h-[135px] rounded-md" />
          {/*   title and description */}
          <div className="mx-3 truncate ">
            <p className="text-base truncate">{film.title}</p>
            <ul className=" flex flex-wrap gap-x-1.5 text-xs opacity-[0.7]">
              {film.genreIds.map((id, i) => (
                <li key={i} className="">
                  item {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {totalItems > 3 ? (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-0.1   w-full hover:text-lime-500 sticky shadow-lg"
        >
          ดูเพิ่มเติม
        </button>
      ) : (
        ''
      )}
    </div>
  )
}
