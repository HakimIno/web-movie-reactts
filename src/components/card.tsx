import { useNavigate } from 'react-router-dom'
import { Film } from '../interfaces'
import { Image } from './image'

interface Props {
  imageSrc: string
  title: string
  onClick?: Function
}

export const Card = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : '')}
      className="  rounded-lg mx-0.5 md:mx-3 my-1.5  cursor-pointer hover:scale-105   transition duration-300 ease-in-out   "
    >
      <div className="left-0 right-0 top-0 relative">
        <div
          className="right-0 top-0  bottom-0 left-0 absolute 
        bg-gradient-to-r from-indigo-500 to-pink-500 w-[35px] h-[23px] rounded-bl-sm rounded-tr-xl m-1 text-center "
        >
          <p className=" font-bold ">HD</p>
        </div>
        

        <img
          src="https://www.123-hd.com/wp-content/uploads/2022/12/The-Glory-300x450.png"
          className=" h-[219px] md:h-[279px] w-full rounded-lg "
        ></img>
      </div>
      <p className=" line-clamp-2">{props.title}</p>
    </div>
  )
}
