'use client'

import { useCallback, useMemo, useRef } from 'react'
import { debounce } from 'lodash'
import { useAtom } from 'jotai'
import { MicroscopeIcon, XIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { inputKeyword } from '@/lib/atoms/filters-atom'

export function SearchInput() {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useAtom(inputKeyword)

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value) => {
        setInputValue(value)
        window.scrollTo({ top: 70, behavior: 'smooth' })
      }, 500),
    [setInputValue]
  )

  const handleChange = useCallback(() => {
    const value = inputRef.current.value
    debouncedChangeHandler(value)
  }, [debouncedChangeHandler])

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      handleChange()
    }
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Search within the top IELTS intructors hub"
        className="w-full min-w-96 py-3 pl-4 pr-10"
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
