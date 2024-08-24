import supabase from '../supabase/client' // Adjust this import path if necessary

export async function authenticateMentor(req, res, postId) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const { data: mentor } = await supabase.from('mentors').select('username').eq('user_id', user.id).single()

  if (!mentor) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const { data: post } = await supabase.from('blog_posts').select('mentor_username').eq('id', postId).single()

  if (!post || post.mentor_username !== mentor.username) {
    return res.status(403).json({ error: 'Not authorized to modify this post' })
  }

  return { mentor, post }
}
