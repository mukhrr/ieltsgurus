import supabase from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  const { id } = params
  const { content } = await request.json()

  const { data, error } = await supabase.from('blog_posts').update({ content }).eq('id', id).select()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (data.length === 0) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request, { params }) {
  const { id } = params

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 })
}

export async function GET(request, { params }) {
  const { id } = params

  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  return NextResponse.json(data)
}
