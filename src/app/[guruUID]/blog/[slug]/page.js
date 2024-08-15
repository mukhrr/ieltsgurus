import { getWritingSeo } from '@/lib/contentful'
import SingleBlogPost from './SingleBlogPost'

export default async function BlogSlug({ params }) {
  return <SingleBlogPost id={params.slug} username={params.guruUID} />
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const seoData = await getWritingSeo(slug)
  if (!seoData) return null

  const {
    date,
    seo: { title, description },
    sys: { firstPublishedAt, publishedAt: updatedAt }
  } = seoData

  const siteUrl = `/${params.guruUID}/blog/${slug}`
  const postDate = date || firstPublishedAt
  const publishedTime = new Date(postDate).toISOString()
  const modifiedTime = new Date(updatedAt).toISOString()

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      ...(updatedAt && {
        modifiedTime
      }),
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
