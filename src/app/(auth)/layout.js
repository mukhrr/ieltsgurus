import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default async function AuthLayout({ children }) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) redirect('/')

  return (
    <div
      className="container relative h-screen !max-w-none flex-col
        items-center justify-center overflow-hidden md:grid lg:grid-cols-2 lg:px-0"
    >
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image width="24" height="24" src="/assets/logo.png" alt="Logo" className="border-0" />
            <span className="hidden font-bold sm:inline-block">IELTS GURUS</span>
          </Link>
        </div>
        <div className="relative z-20 flex h-screen items-center space-x-2">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;The superiority of the learned man over the devout is like that of the moon, on the night when it
              is full, over the rest of the stars.&rdquo;
            </p>
            <footer className="text-sm italic">Muhammad S.A.W</footer>
          </blockquote>
        </div>
      </div>
      <div className="relative -mt-28 flex h-screen w-full items-center justify-center p-8">{children}</div>
    </div>
  )
}
