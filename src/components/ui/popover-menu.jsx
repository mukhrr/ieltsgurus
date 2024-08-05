import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import { icons } from 'lucide-react'
import { forwardRef } from 'react'

import { Surface } from './surface'
import { Toolbar } from './toolbar'

export const Trigger = Popover.Trigger
export const Portal = Popover.Portal

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange
}) => {
  return (
    <Popover.Root onOpenChange={onOpenChange}>
      {customTrigger ? (
        <Trigger asChild>{trigger}</Trigger>
      ) : (
        <Trigger asChild>
          <Toolbar.Button className={triggerClassName} tooltip={!isOpen ? tooltip : ''}>
            {trigger}
          </Toolbar.Button>
        </Trigger>
      )}
      {withPortal ? (
        <Popover.Portal className="z-9999">
          <Popover.Content asChild sideOffset={8}>
            <Surface className="z-[9999] flex max-h-80 min-w-[15rem] flex-col gap-0.5 overflow-auto p-2">
              {children}
            </Surface>
          </Popover.Content>
        </Popover.Portal>
      ) : (
        <Popover.Content asChild sideOffset={8}>
          <Surface className="z-[9999] flex max-h-80 min-w-[15rem] flex-col gap-0.5 overflow-auto p-2">
            {children}
          </Surface>
        </Popover.Content>
      )}
    </Popover.Root>
  )
}

Menu.displayName = 'Menu'

export const Item = ({ label, close = true, icon, iconComponent, disabled, onClick, isActive }) => {
  const className = cn(
    'flex w-full items-center gap-2 rounded bg-transparent p-1.5 text-left text-sm font-medium text-neutral-500',
    !isActive && !disabled,
    'hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200',
    isActive && !disabled && 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
    disabled && 'cursor-not-allowed text-neutral-400 dark:text-neutral-600'
  )

  const IconComponent = icon ? icons[icon] : null
  const IconCustomComponent = iconComponent || null

  const ItemComponent = close ? Popover.Close : 'button'

  return (
    <ItemComponent className={className} onClick={onClick} disabled={disabled}>
      {IconComponent && <IconComponent className="h-4 w-4" />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  )
}

export const CategoryTitle = ({ children }) => {
  return (
    <div className="mb-1.5 mt-4 select-none px-1 text-[0.625rem] font-medium uppercase text-neutral-400 first:mt-1.5 dark:text-neutral-600">
      {children}
    </div>
  )
}

export const Divider =
  forwardRef <
  HTMLHRElement >
  ((props, ref) => {
    return <hr {...props} ref={ref} className="my-1 border-neutral-200 dark:border-neutral-800" />
  })

Divider.displayName = 'Divider'
