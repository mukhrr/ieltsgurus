import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase/client'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const { data, error } = await supabase.from('blog_posts').select('*').eq("mentor_username", username).order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request) {
  const { title, content, mentor_username } = await request.json()

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      mentor_username,
      title,
      content
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ id: data.id }, { status: 201 })
}
