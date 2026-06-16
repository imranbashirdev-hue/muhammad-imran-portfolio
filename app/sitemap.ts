import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://muhammad-imran-portfolio-self.vercel.app'
  
  // Static pages
  const pages = [
    { path: '', priority: 1.0, changefreq: 'daily', lastmod: new Date() },
    { path: '/blog', priority: 0.9, changefreq: 'daily', lastmod: new Date() },
    { path: '/web-services', priority: 0.8, changefreq: 'weekly', lastmod: new Date() },
    { path: '/web-services', priority: 0.8, changefreq: 'weekly', lastmod: new Date() },
    { path: '/contact', priority: 0.7, changefreq: 'monthly', lastmod: new Date() },
    { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly', lastmod: new Date() },
    { path: '/terms-and-conditions', priority: 0.3, changefreq: 'yearly', lastmod: new Date() },
  ]

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastmod,
    changeFrequency: page.changefreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: page.priority,
  }))
}