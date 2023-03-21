import { useEffect, useState } from 'react'
import { Card } from '../components/card'
import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
import { TrendingHero } from '../components/trendings-hero'
import { Film } from '../interfaces'

export const Home = () => {
  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTgeaters, setInTgeaters] = useState<Film[]>([])

  const fetch = () => {
    const arrs: Film[] = []

    for (let i = 0; i < 11; i++) {
      arrs.push({
        id: i,
        title: 'The Glory (2022) ',
        mediaType: "movie",
        description:
          'Kimsnow flex items-start p-1.5 rounded-lg hover:bgKimsnow flex items-start p-1.5 rounded-lg hover:bg',
        posterPath:
          'https://www.123-hd.com/wp-content/uploads/2023/02/Taxi-Driver-Season-2-2023-300x450.jpg',
        coverPath: '',
        genreIds: [1, 2, 3, 4, 5, 6,7,8,9,10,11],
        seasons: [],
      })
    }

    setTrendings(arrs)
    setInTgeaters(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {/* trendings */}

      <Section className="py-0 ">
        <Slider
          className="slick-hero "
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {trendings.map((film, i) => (
            <TrendingHero film={film} key={i}></TrendingHero>
          ))}
        </Slider>
      </Section>
      {/* inteaters */}
      <Section title="อัพเดตใหม่">
        <Slider isMovieCard={true} >
          {inTgeaters.map((film, i) => (
            <Card  imageSrc='' title={film.title} key={i}></Card>
          ))}
        </Slider>
      </Section>
      
      {/* populars */}
      <Section title="In Teaters">
        <Slider isMovieCard={true} >
          {inTgeaters.map((film, i) => (
            <Card imageSrc='' title={film.title} key={i}></Card>
          ))}
        </Slider>
      </Section>
      {/* top rated tv*/}
      {/* top rated movie*/}
    </>
  )
}
