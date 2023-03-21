import { useNavigate } from 'react-router-dom'
import { Film } from '../interfaces'
import { Image } from './image'

interface Props {
  film: Film
}

export const TrendingHero = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/${props.film.mediaType}/${props.film.id}`)}
      className=" h-[180px] lg:h-[300px] relative flex items-center rounded-lg cursor-pointer"
    >
      <div className=" absolute w-full left-0 top-0 right-0 bottom-0">
        <div className="overlay-slick-hero"></div>
        <Image src="https://wrhsstampede.com/wp-content/uploads/2019/01/bird-box-900x507.jpg"></Image>
      </div>
      /* text */
      <div className=" hidden flex-col  gap-3 items-start relative z-10 px-[55px] max-w-[50%] lg:flex">
        <p className="text-xl  line-clamp-2">{props.film.title}</p>
        <p className="text-sm line-clamp-3">{props.film.description}</p>
        <button className="px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            s
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
          <span>Play</span>
        </button>
      </div>
    </div>
  )
}
