'use client'

import { useAtom } from 'jotai'

import { Button } from '@/components/ui/button'

import { FILTERS } from '@/lib/constants'
import { mentorFilters } from '@/lib/atoms/filters-atom'
import { convertFilterToColumnName } from '@/lib/utils'

export default function Filters() {
  const [selectedCategories, setSelectedCategories] = useAtom(mentorFilters)

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {FILTERS.map((filter) => {
        const lowerCasedFilter = convertFilterToColumnName(filter)
        const isSelected = selectedCategories.includes(lowerCasedFilter)

        return (
          <Button
            key={convertFilterToColumnName(filter)}
            variant={isSelected ? 'secondary' : 'outline'}
            onClick={() => toggleCategory(lowerCasedFilter)}
            className={`px-4 py-2 text-sm ${isSelected ? 'border border-black ' : ''}`}
          >
            {filter}
          </Button>
        )
      })}
    </div>
  )
}
