import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-center py-20 text-red-500">Error loading posts</div>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">No posts yet</h1>
        <p className="text-gray-500 mb-8">Check back soon for updates!</p>
        <a href="/admin/posts/new" className="px-4 py-2 bg-sky-500 text-white rounded-lg">Create First Post</a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Blog</h1>
      <p className="text-gray-500 mb-12">Insights on digital growth and marketing</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="relative group">
            <Link href={`/blog/${post.slug}`} className="block">
              {post.featured_image && (
                <Image src={post.featured_image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover rounded-xl mb-3 group-hover:opacity-90 transition" />
              )}
              <h2 className="text-xl font-semibold group-hover:text-sky-600 transition">{post.title}</h2>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
              <div className="text-xs text-gray-400 mt-2">{new Date(post.created_at).toLocaleDateString()}</div>
            </Link>
            {process.env.NODE_ENV === 'development' && (
              <Link href={`/admin/posts/edit/${post.id}`}>
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-md text-xs hover:bg-gray-100 transition z-10">✏️ Edit</button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}