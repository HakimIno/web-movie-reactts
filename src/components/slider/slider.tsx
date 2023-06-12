import './slider.css'

import Slick, { Settings } from 'react-slick'
import { ReactNode, useState } from 'react'

interface Props extends Omit<Settings, 'children'> {
  isMovieCard?: boolean
  children?: (onSwipe: boolean) => ReactNode
}

export const Slider = (props: Props) => {
  let settings: Omit<Settings, 'children'> = {
    ...props,
  }

  if (props.isMovieCard) {
    settings = {
      ...settings,
      slidesToShow: 5,
      slidesToScroll: 4,
      infinite: true,
     
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            swipe: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
            swipe: true,
          },
        },
      ],
    }
  }
  const [onSwipe, setOnSwipe] = useState(false)
  return (
    <Slick
      autoplay={false}
      {...settings}
      autoplaySpeed={5000}
      onSwipe={() => setOnSwipe(true)}
      afterChange={() => setOnSwipe(false)}
    >
       {props.children ? props.children(onSwipe) : ''}
    </Slick>
  )
}
