import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/static/',
        '/thank-you',
      ],
    },
    sitemap: 'https://muhammad-imran-portfolio-self.vercel.app/sitemap.xml',
    host: 'https://muhammad-imran-portfolio-self.vercel.app',
  }
}