import Footer from '@/components/footer'
import Header from '@/components/header'

export default function Layout({ children }) {
  return (
    <main className="min-h-screen bg-white animate-in">
      <div className="min-h-screen">
        <Header />

        {children}

        <Footer />
      </div>
    </main>
  )
}
