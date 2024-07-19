import Footer from '@/components/footer'
import Header from '@/components/header'
import { createClient } from '@/lib/supabase/server'

export default async function Layout({ children }) {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-white animate-in">
      <div className="min-h-screen">
        <Header user={user} />

        {children}

        <Footer />
      </div>
    </main>
  )
}
