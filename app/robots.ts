import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://elevate26.hrevolve.org')
    : 'http://localhost:3000'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}