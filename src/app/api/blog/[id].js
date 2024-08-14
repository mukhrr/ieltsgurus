import supabase from '@/lib/supabase/client'
import { authenticateMentor } from '@/lib/posts/auth-middleware'

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query

  switch (method) {
    case 'GET':
      return handleGet(req, res, id)
    case 'PUT':
      return handlePut(req, res, id)
    case 'DELETE':
      return handleDelete(req, res, id)
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

async function handleGet(req, res, id) {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()

  if (error) return res.status(500).json({ error: error.message })
  if (!data) return res.status(404).json({ error: 'Post not found' })
  return res.status(200).json(data)
}

async function handlePut(req, res, id) {
  const authResult = await authenticateMentor(req, res, id)
  if ('error' in authResult) return

  const { title, content } = req.body

  const { data, error } = await supabase.from('blog_posts').update({ title, content }).eq('id', id).single()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}

async function handleDelete(req, res, id) {
  const authResult = await authenticateMentor(req, res, id)
  if ('error' in authResult) return

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(204).end()
}
