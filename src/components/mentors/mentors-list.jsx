'use client'

import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'

import { Button } from '@/components/ui/button'
import MentorCard from '@/components/mentor-card/MentorCard'
import Loading from '@/app/(mentors)/loading'

import { fetchMentorsByCategory } from '@/lib/actions/fetchMentorsByCategory'
import { CATEGORIES } from '@/lib/constants'
import { mentorsCount } from '@/lib/atoms/mentors-atom'
import { fetchMentorsCount } from '@/lib/actions/fetchMentorsCount'

const ITEMS_PER_PAGE = 6

export default function MentorsList({ category }) {
  const [isLoading, setIsLoading] = useState(true)
  const [mentors, setMentors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const setMentorCount = useSetAtom(mentorsCount)

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const displayedItems = mentors.slice(0, currentPage * ITEMS_PER_PAGE)
  const hasMoreItems = mentors.length > displayedItems.length
  const hiddenItemsCount = mentors.length - displayedItems.length

  // fetching mentors list and count
  useEffect(() => {
    const getMentors = async () => {
      const data = await fetchMentorsByCategory(category.toLowerCase())

      setMentors(data)
      setIsLoading(false)
    }
    const getMentorsCount = async () => {
      const count = await fetchMentorsCount()

      setMentorCount(count)
    }

    getMentors()
    getMentorsCount()
  }, [category, setMentorCount])

  return (
    <div className="mt-8 flex flex-col gap-6 p-4">
      <h6 className="text-lg font-semibold xl:text-2xl">{CATEGORIES[category]}</h6>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-end gap-4">
          <div className="grid gap-3 md:grid-cols-2  lg:grid-cols-3">
            {displayedItems.map(({ id, full_name, image_path, ielts_score, short_info, description, username }) => (
              <MentorCard
                key={id}
                fullName={full_name}
                image={image_path}
                score={ielts_score}
                shortInfo={short_info}
                description={description}
                username={username}
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
