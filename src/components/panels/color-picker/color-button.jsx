import { cn } from '@/lib/utils'
import { memo, useCallback } from 'react'

export const ColorButton = memo(({ color, active, onColorChange }) => {
  const wrapperClassName = cn(
    'group flex items-center justify-center rounded px-1.5 py-1.5',
    !active && 'hover:bg-neutral-100',
    active && 'bg-neutral-100'
  )
  const bubbleClassName = cn(
    'h-4 w-4 rounded bg-slate-100 shadow-sm ring-current ring-offset-2',
    !active && `hover:ring-1`,
    active && `ring-1`
  )

  const handleClick = useCallback(() => {
    if (onColorChange) {
      onColorChange(color || '')
    }
  }, [onColorChange, color])

  return (
    <button onClick={handleClick} className={wrapperClassName}>
      <div style={{ backgroundColor: color, color: color }} className={bubbleClassName}></div>
    </button>
  )
})

ColorButton.displayName = 'ColorButton'