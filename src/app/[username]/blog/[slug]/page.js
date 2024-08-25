import SingleBlogPost from './SingleBlogPost'

async function fetchPost(postId) {
  const res = await fetch(`${process.env.NEXT_PROJECT_API_URL}/api/blog/${postId}`, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }
  const post = await res.json()

  return { post }
}

export default async function BlogSlug({ params }) {
  return <SingleBlogPost id={params.slug} username={params.username} />
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const { post } = await fetchPost(slug)
  const { content, title, created_at, updated_at } = post
  const description = JSON.parse(content)
  const publishedTime = new Date(created_at).toISOString()
  const modifiedTime = new Date(updated_at).toISOString()
  const siteUrl = `/${params.username}/blog/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      ...(updated_at && {
        modifiedTime
      }),
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
