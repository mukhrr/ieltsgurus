import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function AuthButton() {
  return (
    <Link href="/login">
      <Button variant="outline" className="items-center gap-2 md:flex">
        Login <LogInIcon className="h-4 w-4" />
      </Button>
    </Link>
  )
}
