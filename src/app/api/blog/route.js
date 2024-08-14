import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase/client'

export async function GET() {
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })

  if (error) return NextResponse.status(500).json({ error: error.message })
  return NextResponse.status(200).json(data)
}

export async function POST(req) {
  const { mentor_username, title, content } = req.body

  const { data, error } = await supabase.from('blog_posts').insert({ mentor_username, title, content }).single()

  if (error) return NextResponse.status(500).json({ error: error.message })
  return NextResponse.status(201).json(data)
}
