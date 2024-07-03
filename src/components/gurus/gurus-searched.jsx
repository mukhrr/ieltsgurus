'use client'

import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'

import GuruCard from '@/components/guru-card/GuruCard'
import Loading from '@/app/loading'

import { searchedMentors } from '@/lib/atoms/mentors-atom'
import { fetchMentorsByFilter } from '@/lib/actions/fetchMentorsByFilter'
import { inputKeyword, mentorFilters } from '@/lib/atoms/filters-atom'

const LOADING_CARDS_AMOUNT = 3

export default function GurusSearched() {
  const [searched, setSearched] = useAtom(searchedMentors)
  const [isLoading, setIsLoading] = useState(true)
  const keywords = useAtomValue(inputKeyword)
  const filters = useAtomValue(mentorFilters)

  // fetching mentors by input keyword and filters
  useEffect(() => {
    const getMentors = async () => await fetchMentorsByFilter({ filters, keywords })

    getMentors()
      .then((data) => setSearched(data))
      .finally(() => setIsLoading(false))
  }, [keywords, filters, setSearched])

  return (
    <div className="mt-8 flex flex-col gap-6 p-4">
      <h6 className="text-lg font-semibold xl:text-2xl">Search Results: {searched?.length}</h6>
      {isLoading ? (
        <Loading itemsAmount={LOADING_CARDS_AMOUNT} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2  lg:grid-cols-3">
          {searched.map(({ id, fullName, image, ielts_score, short_info, description, social_networks }) => (
            <GuruCard
              key={id}
              fullName={fullName}
              image={image}
              score={ielts_score}
              shortInfo={short_info}
              description={description}
              socialNetworks={social_networks}
            />
          ))}
        </div>
      )}
    </div>
  )
}
