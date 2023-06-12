import { Button } from '@material-tailwind/react'

interface Props {
  text: string
}

export const ButtonAll = (props: Props) => {
  return (
    <button className="flex items-center gap-1 py-1.5 text-[#14b8a6] font-Sukhumvit text-md ">
      {props.text}ทั้งหมด
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  )
}
