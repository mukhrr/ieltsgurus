'use client'

import { Suspense, useEffect, useState } from 'react'

import GuruCard from '@/components/guru-card/GuruCard'
import CardLoading from '@/components/guru-card/CardLoading'
import Loading from '@/app/loading'

import { fetchMentorsByCategory } from '@/lib/actions/fetchMentorsByCategory'
import { CATEGORIES } from '@/lib/constants'

export default function GurusList({ category }) {
  const [mentors, setMentors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMentors = async () => {
      const data = await fetchMentorsByCategory(category.toLowerCase())

      // const data = await fetchMentorsByCategory('')
      setMentors(data)
    }

    getMentors()
    setIsLoading(false)
  }, [category])

  return (
    <div className="mt-8 flex flex-col gap-6 p-4">
      <h6 className="text-lg font-semibold xl:text-2xl">{CATEGORIES[category]}</h6>
      {isLoading && !mentors?.length ? (
        <Loading />
      ) : (
        <div className="grid gap-3 md:grid-cols-2  lg:grid-cols-3">
          {mentors.map(({ id, fullName, image, ielts_score, short_info, description, social_networks }) => (
            <Suspense key={id} fallback={<CardLoading />}>
              <GuruCard
                fullName={fullName}
                image={image}
                score={ielts_score}
                shortInfo={short_info}
                description={description}
                socialNetworks={social_networks}
              />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  )
}
