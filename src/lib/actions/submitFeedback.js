'use server'

import { cookies } from 'next/headers'

import supabase from '@/lib/supabase/client'

import { FEEDBACK_SUBMISSION_COUNT_COOKIE_NAME, MAX_FEEDBACK_SUBMISSIONS_PER_DAY } from '@/lib/constants'

export async function submitFeedback(formData) {
  const cookieStore = cookies()
  // Fake promise to simulate submitting the form
  await new Promise((resolve) => setTimeout(resolve, 600))

  const formSubmissionCountCookie = cookieStore.get(FEEDBACK_SUBMISSION_COUNT_COOKIE_NAME)
  if (formSubmissionCountCookie?.value >= MAX_FEEDBACK_SUBMISSIONS_PER_DAY) {
    throw new Error('You have reached the maximum number of submissions for today.')
  }

  try {
    const { data, error } = await supabase.from('feedbacks').insert({
      ideas: formData.thoughts,
      email: formData.email || null,
      created_at: new Date().toISOString()
    })

    if (error) {
      console.error(error)
      new Error('Failed to submit feedback')
    }

    cookieStore.set(
      formSubmissionCountCookie?.name ?? FEEDBACK_SUBMISSION_COUNT_COOKIE_NAME,
      Number(formSubmissionCountCookie?.value ?? 0) + 1,
      {
        maxAge: 60 * 60 * 24 // 24 hours
      }
    )

    return data
  } catch (error) {
    console.info(error)
    throw new Error('Failed to submit feedback')
  }
}
