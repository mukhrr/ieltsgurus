'use client'

import { useAtomValue } from 'jotai'
import { ChevronUpIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Filters from '@/components/filters'
import GurusList from '@/components/gurus/gurus-list'
import GurusSearched from '@/components/gurus/gurus-searched'
import { SearchInput } from '@/components/ui/search-input'

import { mentorsCount } from '@/lib/atoms/mentors-atom'
import { mentorFilters } from '@/lib/atoms/filters-atom'
import { isVisibleScrollTop } from '@/lib/atoms/common-atom'
import { useSearchParams } from 'next/navigation'
import FeedbackButton from '@/components/feedback-button'

export default function Index() {
  const mentorsAmount = useAtomValue(mentorsCount)
  const searchParams = useSearchParams()
  const filters = useAtomValue(mentorFilters)
  const isVisibleScrollTopButton = useAtomValue(isVisibleScrollTop)

  return (
    <div className="m-auto max-w-[1230px]">
      <section>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 flex items-center justify-between" />
          <div className="text-center">
            <h1 className="mb-2 text-5xl font-bold tracking-wide">Discover Top IELTS Instructors</h1>
            <p className="mb-6 text-lg">{mentorsAmount} gurus found and counting</p>
            <SearchInput />
            <div className="mt-6 flex items-center justify-center space-x-4">
              {/*<Button variant="outline">Submit your profile</Button>*/}
              {/*<span>|</span>*/}

              <FeedbackButton>
                <Button variant="outline">Help us to grow - Share your feedback*</Button>
              </FeedbackButton>
            </div>
          </div>
        </div>
      </section>

      <Filters />

      {(searchParams.get('q')?.length > 0 || filters?.length > 0) && <GurusSearched />}

      <GurusList category="TRENDING" />
      <GurusList category="WRITING" />
      <GurusList category="SPEAKING" />
      <GurusList category="LISTENING" />
      <GurusList category="READING" />
      <GurusList category="NINERS" />
      <GurusList category="FEATURED" />

      {isVisibleScrollTopButton && (
        <ChevronUpIcon
          className="fixed bottom-20 right-20 hidden cursor-pointer rounded-full bg-black p-1 text-white md:block"
          width={30}
          height={30}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}
    </div>
  )
}
