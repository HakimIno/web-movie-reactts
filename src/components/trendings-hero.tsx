import { useNavigate } from 'react-router-dom'
import { Film } from '../interfaces'
import { Image } from './image'
import { tmdbImageSrc } from '../utils'

interface Props {
  film: Film
  onClick: () => void
}

export const TrendingHero = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => props.onClick()}
      className=" h-[180px] lg:h-[300px] relative flex items-center rounded-lg cursor-pointer"
    >
      <div className=" absolute w-full left-0 top-0 right-0 bottom-0 opacity-50">
       
        <Image src={tmdbImageSrc(props.film.coverPath)}></Image>
      </div>
      
      <div className=" hidden flex-col gap-3 items-start relative z-10 px-[55px] w-[70%] lg:flex">
        <p className="text-xl  line-clamp-2">{props.film.title}</p>
        <p className="text-sm line-clamp-3">{props.film.description}</p>
        <button className="px-3 py-1.5 flex items-center gap-3  bg-gradient-to-l hover:bg-gradient-to-r from-primary via-[#a3e635] to-[#facc15] rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clip-rule="evenodd"
            />
          </svg>

          <span>Play</span>
        </button>
      </div>
    </div>
  )
}
