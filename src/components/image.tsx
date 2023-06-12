import { CustomComponentProps } from '../interfaces'
import { mergeClassName } from '../utils'
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props extends CustomComponentProps {
  src: string
}

export const Image = (props: Props) => {
  return (
    <div
      className={mergeClassName(
        'h-full w-full bg-[#242424] rounded-lg',
        props.className
      )}
    >
      <img
        src={props.src}
        className=" w-full h-full  rounded-lg object-cover"
      ></img>
    </div>
  )
}
