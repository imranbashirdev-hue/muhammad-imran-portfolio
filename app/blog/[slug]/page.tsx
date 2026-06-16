import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('seo_title, title, excerpt')
    .eq('slug', params.slug)
    .single();

  return {
    title: post?.seo_title || post?.title,
    description: post?.excerpt,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!post || !post.published) notFound();

  const { data: relatedPosts } = await supabase
    .from('posts')
    .select('id, title, slug, created_at')
    .eq('published', true)
    .neq('id', post.id)
    .limit(4);

  const fallbackPosts = [
    { id: 1, title: 'AI in Advertising', slug: 'ai-in-advertising', created_at: '2024-05-20' },
    { id: 2, title: 'Case Study: 100% Traffic Increase', slug: 'case-study-traffic-increase', created_at: '2024-05-15' },
    { id: 3, title: 'ROI Optimization Strategies', slug: 'roi-optimization-strategies', created_at: '2024-05-10' },
    { id: 4, title: 'PPC Campaign Best Practices', slug: 'ppc-best-practices', created_at: '2024-05-05' },
  ];

  const related = relatedPosts && relatedPosts.length > 0 ? relatedPosts : fallbackPosts;

  // Dynamic categories from post or fallback
  const categories = post?.categories || ['PPC', 'SEO', 'Content Marketing', 'Content Monetization', 'Growth'];

  return (
    <article className="min-h-screen bg-gradient-to-b from-white to-sky-50/30 py-16">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        
        {/* FIRST ROW: Left Text + Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
          
          {/* Left: Feature + Title + Meta */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">Feature</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>By {post.author || 'Admin'}</span>
              <span>·</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
              <span>·</span>
              <span>{post.views || 0} comments</span>
            </div>
          </div>

          {/* Right: Featured Image */}
          {post.featured_image && (
            <div className="relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* SECOND ROW: 70% Content + 30% Recent Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left: 70% Content */}
          <div className="lg:col-span-2">
            <div 
              className="prose prose-lg prose-slate max-w-none
                prose-headings:text-slate-800 
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8
                prose-h3:text-xl prose-h3:font-semibold
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-800
                prose-ul:text-slate-600
                prose-li:marker:text-sky-400
                prose-blockquote:border-l-4 prose-blockquote:border-sky-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-500"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Dynamic ROI Tags at Bottom */}
            <div className="mt-10 pt-6 border-t border-sky-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-slate-700">ROI:</span>
                {categories.map((item: string) => (
                  <span key={item} className="px-4 py-2 rounded-full text-sm bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-100 transition cursor-pointer">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 30% Recent Posts Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Recent posts</h2>
              <div className="space-y-4">
                {related.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="block p-4 rounded-xl bg-white border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="text-base font-semibold text-slate-800 hover:text-sky-600 transition line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>0 comments</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Dynamic ROI Tags in Sidebar */}
              <div className="mt-8 p-5 rounded-xl bg-white border border-sky-100">
                <h3 className="text-sm font-bold text-slate-700 mb-3">ROI</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((item: string) => (
                    <span key={item} className="px-3 py-1.5 rounded-full text-xs bg-sky-50 text-sky-600 border border-sky-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </article>
  );
}