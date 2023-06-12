interface Props {
  filtered: number

  setFiltered: (newVal: number) => void
}

export const Filter = (props: Props) => {
  return (
    <div className="my-5">
      <button
        onClick={() => props.setFiltered(40)}
        className={` ${
          props.filtered === 40
            ? 'bg-blue-500 border-none'
            : 'bg-transparent text-blue-700 border-blue-500'
        } hover:bg-blue-500  font-semibold hover:text-white py-0.5 px-4 border  hover:border-transparent rounded-lg`}
      >
        All
      </button>
      <button
        onClick={() => props.setFiltered(5)}
        className={` ${
          props.filtered === 5
            ? 'bg-blue-500 border-none'
            : 'bg-transparent text-blue-700 border-blue-500'
        } hover:bg-blue-500  font-semibold hover:text-white py-0.5 px-4 border  hover:border-transparent rounded-lg mx-3`}
      >
        TV
      </button>
      <button
        onClick={() => props.setFiltered(8)}
        className={` ${
          props.filtered === 8
            ? 'bg-blue-500 border-none'
            : 'bg-transparent text-blue-700 border-blue-500'
        } hover:bg-blue-500  font-semibold hover:text-white py-0.5 px-4 border  hover:border-transparent rounded-lg`}
      >
        Movie
      </button>
    </div>
  )
}
