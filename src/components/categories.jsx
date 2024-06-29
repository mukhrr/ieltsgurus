'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FILTERS } from '@/lib/constants'

export default function Categories() {
  const [selectedCategories, setSelectedCategories] = useState(new Set())

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (newSelected.has(category)) {
        newSelected.delete(category)
      } else {
        newSelected.add(category)
      }

      return newSelected
    })
  }

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {FILTERS.map((filter) => (
        <Button
          key={filter}
          variant={selectedCategories.has(filter) ? 'secondary' : 'outline'}
          onClick={() => toggleCategory(filter)}
          className="px-4 py-2 text-sm"
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}
