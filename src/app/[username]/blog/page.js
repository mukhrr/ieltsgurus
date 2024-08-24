import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import Editor from '@/components/editor/Editor'

import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'
import { getUserProfile } from '@/lib/actions/getUserProfile'

// async function fetchBlogPosts() {
//   const res = await fetch(`${process.env.NEXT_PROJECT_API_URL}/api/blog`, { cache: 'no-store' })
//   if (!res.ok) {
//     throw new Error('Failed to fetch blog posts')
//   }
//   return res.json()
// }

export default async function Blog({ params }) {
  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.username)
  // const sortedPosts = await fetchBlogPosts()
  // console.log(sortedPosts)

  const isCurrentUserMentor = profile?.id && profile?.username === params?.username

  return (
    <ScrollArea className="min-h-screen">
      <FloatingHeader title="Writing" mentor={mentor} />
      {/*<Suspense fallback={<LoadingSpinner />}>*/}
      {/*  <WritingListLayout list={sortedPosts} isMobile />*/}
      {/*</Suspense>*/}
      {isCurrentUserMentor && <Editor username={mentor.username} />}
    </ScrollArea>
  )
}

export async function generateMetadata({ params }) {
  const title = `${params.username}'s blog on ieltstify`
  const description = `Read, enjoy, share ${params.username}'s posts!`

  const siteUrl = '/blog'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
