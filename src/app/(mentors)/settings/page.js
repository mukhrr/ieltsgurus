import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import UserProfileForm from '@/app/(mentors)/settings/user-profile-form'

import { getUserProfile } from '@/lib/actions/getUserProfile'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const profile = await getUserProfile()

  // if (profile?.username) redirect('/account')
  if (!profile?.id) redirect('/login')

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center justify-start pl-0')}
              prefetch={false}
            >
              <ArrowLeft /> Back
            </Link>
            <Link href="/settings" className="font-semibold text-primary" prefetch={false}>
              Profile
            </Link>
            <Link href="#" prefetch={false} className="flex items-center gap-2">
              Integrations <Badge variant="outline">Coming soon</Badge>
            </Link>
            <Link href="#" prefetch={false} className="flex items-center gap-2">
              Billing <Badge variant="outline">Coming soon</Badge>
            </Link>
          </nav>

          <div className="grid gap-6">
            <UserProfileForm user={profile} />
            {/*<ChangePasswordForm user={user} />*/}
          </div>
        </div>
      </main>
    </div>
  )
}
