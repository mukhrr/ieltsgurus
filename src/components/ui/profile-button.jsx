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
import { getInitials } from '@/lib/utils'
import { signOut } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { UserRound } from 'lucide-react'

export default function ProfileButton({ user }) {
  const router = useRouter()

  const onClickOption = (option) => {
    switch (option) {
      case 'profile':
        router.push('/settings')
        break
      case 'feedback':
        window.open('https://ieltsgurus.productroad.com/board/features', '_blank')
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full shadow-sm ring-1 ring-gray-950">
          <Avatar className="h-8 w-8 scale-125">
            <AvatarImage src={user?.picture} />
            <AvatarFallback>
              {user?.username || user?.full_name ? (
                getInitials(user?.username || user?.full_name)
              ) : (
                <UserRound className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" sideOffset={4} align="end">
        <DropdownMenuLabel>{user?.username || user?.full_name || 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onClickOption('profile')}>
            Profile
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onClickOption('feedback')}>Feedback</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onClickOption('support')}>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onClickOption('logout')}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
