import { useEffect, useState } from 'react'
import { Card } from '../components/card'
import { Filter } from '../components/filter'
import { Section } from '../components/section'
import { Film } from '../interfaces'
import { AnimatePresence, motion } from 'framer-motion'

export const AllMovie = () => {
  const [inTgeaters, setInTgeaters] = useState<Film[]>([])
  const [filtered, setFiltered] = useState(40)

  const fetch = () => {
    const arrs: Film[] = []

    for (let i = 0; i < 40; i++) {
      arrs.push({
        id: i,
        title: 'The Glory (2022) ',
        mediaType: 'movie',
        description:
          'Kimsnow flex items-start p-1.5 rounded-lg hover:bgKimsnow flex items-start p-1.5 rounded-lg hover:bg',
        posterPath:
          'https://www.123-hd.com/wp-content/uploads/2023/02/Taxi-Driver-Season-2-2023-300x450.jpg',
        coverPath: '',
        genreIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        seasons: [],
      })
    }

    setInTgeaters(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])
  return (
    <Section title="ดูซีรี่ย์ออนไลน์">
      <Filter filtered={filtered} setFiltered={setFiltered} />
      <motion.div
        initial={{ transform: 'scale(0)' }}
        animate={{ transform: 'scale(1)' }}
        exit={{ transform: 'scale(0)' }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 "
      >
        {inTgeaters.slice(0, filtered).map((film, i) => (
          <Card imageSrc="" title={film.title} key={i}></Card>
        ))}
      </motion.div>
    </Section>
  )
}
