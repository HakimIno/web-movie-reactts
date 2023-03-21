import { CustomComponentProps } from '../interfaces'
import { mergeClassName } from '../utils'

interface Props extends CustomComponentProps {
  src: string
}

export const Image = (props: Props) => {
  return (
    <div
      className={mergeClassName(
        'bg-primary h-full w-full rounded-lg ',
        props.className
      )}
    >
      <img
        src={props.src}
        className=" w-full h-full object-cover"
      ></img>
    </div>
  )
}
