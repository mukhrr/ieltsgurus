import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'edge'

export async function POST(req) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response('Missing BLOB_READ_WRITE_TOKEN. It seems you forgot to add that to your .env file.', {
      status: 401
    })
  }

  const file = await req.blob()
  const filename = req.headers.get('x-vercel-filename') || 'file.txt'
  const contentType = req.headers.get('content-type') || 'text/plain'
  const fileType = `.${contentType.split('/')[1]}`

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType) ? filename : `${filename}${fileType}`

  try {
    const blob = await put(finalName, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
