import Footer from '@/components/footer'
import Header from '@/components/header'

import { getUserProfile } from '@/lib/actions/getUserProfile'

export default async function Layout({ children }) {
  const profile = await getUserProfile()

  return (
    <main className="min-h-screen bg-white animate-in">
      <div className="min-h-screen">
        <Header user={profile} />

        {children}

        <Footer />
      </div>
    </main>
  )
}
