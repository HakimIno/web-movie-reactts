import { useNavigate } from 'react-router-dom'
import { Film } from '../interfaces'
import { Image } from './image'
import { LazyMotion, domAnimation, motion } from 'framer-motion'
import { useState } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface Props {
  imageSrc: string
  title: string
  onClick?: Function
}

export const Card = (props: Props) => {
  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : '')}
     
      className="  rounded-xl mx-0.5 md:mx-1 my-1.5 hover:scale-105  cursor-pointer transition duration-300 ease-in-out    "
    >
      {props.imageSrc && (
        <motion.div
          animate={{ transform: 'scale(1)' }}
          className="left-0 right-0 top-0 relative"
        >
          <div
            className="right-0 top-0  bottom-0 left-0 absolute 
       bg-gradient-to-r from-primary to-[#facc15] w-[35px] h-[20px] md:h-[25px] rounded-br-md rounded-tl-lg m-1 text-center z-20 "
          >
            <p className="text-sm md:text-base ">HD</p>
          </div>

          <div
            className="right-0 top-0  bottom-0 left-0 absolute mx-8
       bg-black opacity-50 w-fit h-[20px] md:h-[25px] rounded-sm  m-1  z-10 px-2"
          >
            <p
              className="text-sm md:text-base line-clamp-1   
        z-20 ml-1 text-center"
            >
              EN
            </p>
          </div>

          {/*   <img
         src={props.imageSrc}
         className=" h-[245px] md:h-[340px] w-full rounded-lg opacity-100 hover:opacity-0 duration-100  "
       /> */}

          <LazyLoadImage
            src={props.imageSrc}
            className=" h-[245px] md:h-[340px] w-[245px] rounded-lg opacity-100 hover:opacity-0 duration-100  "
            alt={props.imageSrc}
            effect="blur"
          />

          <div className="opacity-100 hover:opacity-100 md:opacity-0 duration-300 absolute inset-0 z-10 flex  items-end  text-white px-2 md:px-4 p-2 ">
            <div
              className="
         right-0 top-0  bottom-0 left-0 absolute 
        flex items-end text-center justify-end mb-[3.5rem] mr-0.5 "
            >
              <div className="bg-gradient-to-r  from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90% w-fit px-2 py-0.5 rounded-[0.3rem] z-20">
                <p className="text-sm md:text-base ">EP 1-16 จบ</p>
              </div>
            </div>
            <p className="text-md md:text-lg line-clamp-2 z-20">
              {props.title}
            </p>
            <div className="w-full h-[245px] md:h-[340px] absolute top-0 left-0 z-10 bg-transparent hover:bg-black hover:bg-opacity-40 transition rounded-lg duration-300"></div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
