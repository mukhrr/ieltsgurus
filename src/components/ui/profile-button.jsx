import { UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { generateImagePathOnStore, getInitials } from '@/lib/utils'
import { signOut } from '@/lib/auth'

const TriggerButton = (user, image, hasFullName) => (
  <div className="flex cursor-pointer items-center gap-2">
    <Button variant="secondary" size="icon" className="rounded-full shadow-sm ring-1 ring-gray-950">
      <Avatar className="h-8 w-8 scale-125">
        <AvatarImage src={user?.avatar_url || image} />
        <AvatarFallback>
          {user?.username || user?.full_name ? (
            getInitials(user?.full_name || user?.username)
          ) : (
            <UserRound className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>
    </Button>
    {hasFullName && (
      <div className="flex flex-col ">
        <span>{user?.full_name}</span>
        <span className="text-gray-400">@{user?.username}</span>
      </div>
    )}
  </div>
)

export default function ProfileButton({ user, hasFullName, hasAccessToOptions }) {
  const router = useRouter()
  const imagePathOnStore = generateImagePathOnStore(user?.image_path)

  const onClickOption = (option) => {
    switch (option) {
      case 'settings':
        router.push('/settings')
        break
      case 'account':
        router.push('/account')
        break
      case 'support':
        window.open('https://t.me/ieltsgurus_support_bot', '_blank')
        break
      case 'logout':
        signOut()
        break

      default:
        return
    }
  }

  return hasAccessToOptions ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{TriggerButton(user, imagePathOnStore, hasFullName)}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" sideOffset={4} align="start">
        <DropdownMenuLabel>{user?.full_name || 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onClickOption(user?.username ? 'account' : 'settings')}>
            {user?.username ? 'Account' : 'Settings'}
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onSelect={() => onClickOption('support')}>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onClickOption('logout')}>
          <span className="cursor-pointer text-red-500">Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    TriggerButton(user, imagePathOnStore, hasFullName)
  )
}
