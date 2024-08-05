import { forwardRef } from 'react'

import { Surface } from './Surface'
import { Button } from './Button'
import { Tooltip } from './Tooltip'

import { cn } from '@/lib/utils'

const ToolbarWrapper = forwardRef(
  ({ shouldShowContent = true, children, isVertical = false, className, ...rest }, ref) => {
    const toolbarClassName = cn(
      'inline-flex h-full gap-0.5 leading-none text-black',
      isVertical ? 'flex-col p-2' : 'flex-row items-center p-1',
      className
    )

    return (
      shouldShowContent && (
        <Surface className={toolbarClassName} {...rest} ref={ref}>
          {children}
        </Surface>
      )
    )
  }
)

ToolbarWrapper.displayName = 'Toolbar'

const ToolbarDivider = forwardRef(({ horizontal, className, ...rest }, ref) => {
  const dividerClassName = cn(
    'bg-neutral-200 dark:bg-neutral-800',
    horizontal
      ? 'my-1 h-[1px] w-full min-w-[1.5rem] first:mt-0 last:mt-0'
      : 'mx-1 h-full min-h-[1.5rem] w-[1px] first:ml-0 last:mr-0',
    className
  )

  return <div className={dividerClassName} ref={ref} {...rest} />
})

ToolbarDivider.displayName = 'Toolbar.Divider'

const ToolbarButton = forwardRef(
  (
    { children, buttonSize = 'icon', variant = 'ghost', className, tooltip, tooltipShortcut, activeClassname, ...rest },
    ref
  ) => {
    const buttonClass = cn('w-auto min-w-[2rem] gap-1 px-2', className)

    const content = (
      <Button
        activeClassname={activeClassname}
        className={buttonClass}
        variant={variant}
        buttonSize={buttonSize}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    )

    if (tooltip) {
      return (
        <Tooltip title={tooltip} shortcut={tooltipShortcut}>
          {content}
        </Tooltip>
      )
    }

    return content
  }
)

ToolbarButton.displayName = 'ToolbarButton'

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton
}
