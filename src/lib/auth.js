'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export const signUp = async (formData) => {
  const supabase = createClient()

  const origin = headers().get('origin')
  const { email, password, full_name } = formData

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    console.error(error)
    return redirect('/signup?message=Could not authorize')
  }

  return redirect('/signup?message=Check email to continue sign in process')
}

export const signIn = async (formData) => {
  const { email, password } = formData
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return redirect('/login?message=Incorrect email or password')
  }

  revalidatePath('/', 'layout')
  return redirect('/')
}

export const signOut = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

export const handleGoogleLogin = async () => {
  const origin = headers().get('origin')
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}
