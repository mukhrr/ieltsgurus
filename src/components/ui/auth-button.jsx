'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ProfileButton from '@/components/ui/profile-button'

export default function AuthButton() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    )
  }

  return user ? (
    <ProfileButton />
  ) : (
    <Link href="/login">
      <Button variant="outline" className="items-center gap-2 md:flex">
        Login <LogInIcon className="h-4 w-4" />
      </Button>
    </Link>
  )
}
