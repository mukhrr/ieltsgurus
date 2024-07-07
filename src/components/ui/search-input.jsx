'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'
import { MicroscopeIcon, XIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

export function SearchInput() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState('')

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value) => {
        setInputValue(value)
        const params = new URLSearchParams(window.location.search)
        if (value) {
          params.set('q', value)
        } else {
          params.delete('q')
        }
        router.replace(`${window.location.pathname}?${params.toString()}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500),
    [router]
  )

  const handleChange = useCallback(() => {
    const value = inputRef.current.value
    debouncedChangeHandler(value)
  }, [debouncedChangeHandler])

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      debouncedChangeHandler(null)
    }
  }

  // Read the query parameter from the URL and set the input value
  useEffect(() => {
    const queryValue = searchParams.get('q') || ''
    setInputValue(queryValue)

    if (inputRef.current) {
      inputRef.current.value = queryValue
    }
  }, [searchParams])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Search within the top IELTS intructors hub"
        className={`w-full py-3 pl-4 pr-10 md:min-w-96 ${searchParams.get('q')?.length ? 'border border-gray-950' : ''}`}
        onChange={handleChange}
      />
      {inputValue?.length > 0 ? (
        <XIcon
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer"
          onClick={clearInput}
        />
      ) : (
        <MicroscopeIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
      )}
    </div>
  )
}
