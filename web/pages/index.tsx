import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Trip from '../components/Trip'
import { TripInterface } from '../interface'

interface Props {
  data: TripInterface[]
}

const Home: NextPage<Props> = ({ data }: Props) => {
  const router = useRouter()

  const [trips, setTrips] = React.useState(data)
  const [keyword, setKeyword] = React.useState(router.query.keyword)
  const [loading, setLoading] = React.useState(false)

  const fetchKeyword = async (value: string) => {
    setKeyword(value)
    setLoading(true)
    const { data } = await axios.get('http://localhost:8000/api/trips', {
      params: {
        keyword: value,
      },
    })
    setTrips(data)
    setLoading(false)

    router.push(
      {
        pathname: '/',
        query: { keyword: value },
      },
      undefined,
      {}
    )
  }
  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value)
  }
  const submitHabdler = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    await fetchKeyword(keyword as string)
  }
  console.log(trips)
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-20">
      <Head>
        <title>Wongnai Trips</title>
      </Head>
      <h1 className="mb-10 text-6xl tracking-wider text-blue-400">
        เที่ยวไหนดี
      </h1>
      <form className="w-10/12" onSubmit={submitHabdler}>
        <input
          name="keyword"
          type="text"
          className="w-full border-b-2 bg-transparent py-2 text-center focus:border-sky-500 focus:outline-none"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onChange={onChangeHandler}
          value={keyword}
        />
      </form>
      {trips.map((value) => (
        <Trip key={value.eid} {...value} onClickTag={fetchKeyword} />
      ))}
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { keyword } = context.query
  const { data } = await axios.get('http://localhost:8000/api/trips', {
    params: {
      keyword,
    },
  })
  return {
    props: { data },
  }
}
