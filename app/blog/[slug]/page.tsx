import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <Link href="/blog" className="text-sky-600 hover:underline mb-8 inline-block">← Back</Link>
      
      {post.featured_image && (
        <img src={post.featured_image} className="w-full rounded-2xl mb-8" />
      )}
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
      
      <div className="text-gray-500 text-sm mb-8">
        {new Date(post.created_at).toLocaleDateString()} · {post.views} views
      </div>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}