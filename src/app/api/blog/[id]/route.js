import supabase from '@/lib/supabase/client'
// import { authenticateMentor } from '@/lib/posts/auth-middleware'
import { NextResponse } from 'next/server'

// async function handlePut(req, res, id) {
//   const authResult = await authenticateMentor(req, res, id)
//   if ('error' in authResult) return
//
//   const { title, content } = req.body
//
//   const { data, error } = await supabase.from('blog_posts').update({ title, content }).eq('id', id).single()
//
//   if (error) return res.status(500).json({ error: error.message })
//   return res.status(200).json(data)
// }
//
// async function handleDelete(req, res, id) {
//   const authResult = await authenticateMentor(req, res, id)
//   if ('error' in authResult) return
//
//   const { error } = await supabase.from('blog_posts').delete().eq('id', id)
//
//   if (error) return res.status(500).json({ error: error.message })
//   return res.status(204).end()
// }

export async function GET(request, { params }) {
  const { id } = params

  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  return NextResponse.json(data)
}
