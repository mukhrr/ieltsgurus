'use client'

import GuruCard from '@/components/guru-card/GuruCard'

import { CATEGORIES } from '@/lib/constants'
import { useEffect, useState } from 'react'
import { fetchMentorsByCategory } from '@/lib/actions/fetchMentorsByCategory'

export default function GurusList({ category }) {
  const [mentors, setMentors] = useState([])

  useEffect(() => {
    const getMentors = async () => {
      const data = await fetchMentorsByCategory(category.toLowerCase())
      setMentors(data)
    }

    getMentors()
  }, [category])

  return (
    mentors?.length > 0 && (
      <div className="mt-8 flex flex-col gap-6 p-4">
        <h6 className="text-lg font-semibold xl:text-2xl">{CATEGORIES[category]}</h6>
        <div className="grid gap-3 md:grid-cols-2  lg:grid-cols-3">
          {mentors.map(({ id, fullName, image, ielts_score, short_info, description }) => (
            <GuruCard
              key={id}
              fullName={fullName}
              image={image}
              score={ielts_score}
              shortInfo={short_info}
              description={description}
            />
          ))}
        </div>
      </div>
    )
  )
}
