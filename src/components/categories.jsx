'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { categories } from '@/lib/mock-data/categories'

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'solid' : 'outline'}
          onClick={() => setSelectedCategory(category)}
          className="px-4 py-2 text-sm"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
