import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


export default async function BlogPage() {
  const supabase = createClient();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return <div className="text-center py-20 text-red-500">Error loading posts</div>;
  }

  const allPosts = posts || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50/30">
      
      {/* Banner with Background Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1432889821006-3e8cf1b8e610?w=1200&h=600&fit=crop"
          alt="Blog Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Our <span className="text-sky-300">Blog</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Insights, strategies, and updates on digital marketing, SEO, and growth.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/*  Grid Only - No Featured Post */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  {post.featured_image ? (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center">
                      <span className="text-4xl">📄</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                    {post.excerpt || 'Read more about this topic...'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span>{post.views || 0} views</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Demo Blogs when no posts in database
            <>
              {[
                { id: 1, title: 'AI in Advertising', slug: 'ai-in-advertising', excerpt: 'How AI is revolutionizing digital advertising.', created_at: '2024-05-20' },
                { id: 2, title: 'Case Study: 100% Traffic Increase', slug: 'case-study-traffic-increase', excerpt: 'How we helped a client achieve 100% traffic growth.', created_at: '2024-05-15' },
                { id: 3, title: 'ROI Optimization Strategies', slug: 'roi-optimization-strategies', excerpt: 'Maximize your return on investment with these strategies.', created_at: '2024-05-10' },
                { id: 4, title: 'PPC Campaign Best Practices', slug: 'ppc-best-practices', excerpt: 'Learn the best practices for PPC campaigns.', created_at: '2024-05-05' },
                { id: 5, title: 'SEO Trends for 2024', slug: 'seo-trends-2024', excerpt: 'Stay ahead with these SEO trends for 2024.', created_at: '2024-04-28' },
                { id: 6, title: 'Content Marketing Strategy', slug: 'content-marketing-strategy', excerpt: 'Build a content marketing strategy that works.', created_at: '2024-04-20' },
              ].map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center">
                    <span className="text-5xl">📄</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>0 views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Show message if no posts */}
        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}