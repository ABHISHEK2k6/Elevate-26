import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://elevate26.hrevolve.org')
    : 'http://localhost:3000'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}