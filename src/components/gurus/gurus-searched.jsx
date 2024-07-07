'use client'

import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useSearchParams } from 'next/navigation'

import GuruCard from '@/components/guru-card/GuruCard'
import Loading from '@/app/loading'

import { searchedMentors } from '@/lib/atoms/mentors-atom'
import { fetchMentorsByFilter } from '@/lib/actions/fetchMentorsByFilter'
import { mentorFilters } from '@/lib/atoms/filters-atom'
import { Button } from '@/components/ui/button'

const LOADING_CARDS_AMOUNT = 3
const ITEMS_PER_PAGE = 9

export default function GurusSearched() {
  const searchParams = useSearchParams()
  const [searched, setSearched] = useAtom(searchedMentors)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const filters = useAtomValue(mentorFilters)

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const displayedItems = searched.slice(0, currentPage * ITEMS_PER_PAGE)
  const hasMoreItems = searched.length > displayedItems.length
  const hiddenItemsCount = searched.length - displayedItems.length

  // fetching mentors by input keyword and filters
  useEffect(() => {
    const getMentors = async () => await fetchMentorsByFilter({ filters, keywords: searchParams.get('q') })

    getMentors()
      .then((data) => setSearched(data))
      .finally(() => setIsLoading(false))
  }, [searchParams, filters, setSearched])

  return (
    <div className="mt-8 flex flex-col gap-6 p-4">
      <h6 className="text-lg font-semibold xl:text-2xl">Search Results: {searched?.length}</h6>
      {isLoading ? (
        <Loading itemsAmount={LOADING_CARDS_AMOUNT} />
      ) : (
        <div className="flex flex-col items-end gap-4">
          <div className="grid gap-3 md:grid-cols-2  lg:grid-cols-3">
            {displayedItems.map(({ id, fullName, image, ielts_score, short_info, description, social_networks }) => (
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
          {hasMoreItems && (
            <Button variant="outline" onClick={handleShowMore}>
              Show More {hiddenItemsCount}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
