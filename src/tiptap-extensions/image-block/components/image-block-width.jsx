import { memo, useCallback, useEffect, useState } from 'react'

export const ImageBlockWidth = memo(({ onChange, value }) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleChange = useCallback(
    (e) => {
      onChange(parseInt(e.target.value))
    },
    [onChange]
  )

  return (
    <div className="flex items-center gap-2">
      <input
        className="h-2 appearance-none rounded border-0 bg-neutral-200 fill-neutral-300"
        type="range"
        min="25"
        max="100"
        step="25"
        onChange={handleChange}
        value={currentValue}
      />
      <span className="select-none text-xs font-semibold text-neutral-500">{value}%</span>
    </div>
  )
})

ImageBlockWidth.displayName = 'ImageBlockWidth'