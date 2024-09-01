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

const TriggerButton = (mentor, image, hasFullName) => (
  <div className="flex cursor-pointer items-center gap-2">
    <Button variant="secondary" size="icon" className="rounded-full shadow-sm ring-1 ring-gray-950">
      <Avatar className="h-8 w-8 scale-125">
        <AvatarImage src={mentor?.avatar_url || image} />
        <AvatarFallback>
          {mentor?.username || mentor?.full_name ? (
            getInitials(mentor?.full_name || mentor?.username)
          ) : (
            <UserRound className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>
    </Button>
    {hasFullName && (
      <div className="flex flex-col ">
        <span>{mentor?.full_name}</span>
        <span className="text-gray-400">@{mentor?.username}</span>
      </div>
    )}
  </div>
)

export default function ProfileButton({ mentor, hasFullName, user }) {
  const router = useRouter()
  const imagePathOnStore = generateImagePathOnStore(mentor?.image_path)

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
      case 'login':
        router.push('/login')
        break
      case 'logout':
        signOut()
        break

      default:
        return
    }
  }

  return user?.username === mentor.username ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{TriggerButton(mentor, imagePathOnStore, hasFullName)}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" sideOffset={4} align="start">
        <DropdownMenuLabel>{mentor?.full_name || 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onClickOption(mentor?.username ? 'account' : 'settings')}>
            {mentor?.username ? 'Account' : 'Settings'}
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
    TriggerButton(mentor, imagePathOnStore, hasFullName)
  )
}
