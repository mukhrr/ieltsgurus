import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import Editor from '@/components/editor/Editor'

import { getMentorByUsername } from '@/lib/actions/getMentorByUsername'
import { getUserProfile } from '@/lib/actions/getUserProfile'

export default async function Blog({ params }) {
  const profile = await getUserProfile()
  const mentor = await getMentorByUsername(params?.username)

  const isCurrentUserMentor = profile?.id && profile?.username === params?.username

  return (
    <ScrollArea className="min-h-screen">
      <FloatingHeader title="Writing" mentor={mentor} />

      {isCurrentUserMentor && <Editor username={mentor.username} />}
    </ScrollArea>
  )
}
