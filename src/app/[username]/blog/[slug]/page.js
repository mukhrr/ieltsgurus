import SingleBlogPost from './SingleBlogPost'

export default async function BlogSlug({ params }) {
  return <SingleBlogPost id={params.slug} username={params.username} />
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const title = 'test blog title'
  const description = 'test blog description'
  const date = '12.22.2024'

  const siteUrl = `/${params.username}/blog/${slug}`
  const publishedTime = new Date(date).toISOString()
  const modifiedTime = new Date(date).toISOString()

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      ...(date && {
        modifiedTime
      }),
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
