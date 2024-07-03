'use client'

import { useAtomValue } from 'jotai'

import { Button } from '@/components/ui/button'
import Categories from '@/components/categories'
import GurusList from '@/components/gurus/gurus-list'
import GurusSearched from '@/components/gurus/gurus-searched'

import { mentorsCount } from '@/lib/atoms/mentors-atom'
import { inputKeyword } from '@/lib/atoms/filters-atom'
import { SearchInput } from '@/components/ui/search-input'

export default function Index() {
  const mentorsAmount = useAtomValue(mentorsCount)
  const inputValue = useAtomValue(inputKeyword)

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
              <Button variant="outline">Help us to grow - Share your feedback*</Button>
            </div>
          </div>
        </div>
      </section>

      <Categories />

      {inputValue?.length > 0 && <GurusSearched />}

      <GurusList category="TRENDING" />
      <GurusList category="WRITING" />
      <GurusList category="SPEAKING" />
      <GurusList category="LISTENING" />
      <GurusList category="READING" />
      <GurusList category="NINERS" />
      <GurusList category="FEATURED" />
    </div>
  )
}
