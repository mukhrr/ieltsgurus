import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { SubmitButton } from '@/components/ui/submit-button'

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata?.name || user.user_metadata?.username || user.email}!
      <form action={signOut}>
        <SubmitButton formAction={signOut}>Logout</SubmitButton>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link href="/login" className={cn(buttonVariants({ variant: 'outline' }))}>
        Login
      </Link>
      <Link href="/signup" className={cn(buttonVariants({ variant: 'default' }))}>
        Signup
      </Link>
    </div>
  )
}
