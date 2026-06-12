'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const supabase = createClient();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setDeleting(id);
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      alert('Error deleting post: ' + error.message);
    } else {
      alert('Post deleted successfully!');
      fetchPosts();
    }
    setDeleting(null);
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <Link href="/admin/posts/new" className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600">
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No posts yet. Create your first post!</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr><th className="px-4 py-3 text-left text-sm font-medium">Title</th><th className="px-4 py-3 text-left text-sm font-medium">Status</th><th className="px-4 py-3 text-left text-sm font-medium">Date</th><th className="px-4 py-3 text-left text-sm font-medium">Actions</th></tr></thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/posts/edit/${post.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
                      <button onClick={() => handleDelete(post.id)} disabled={deleting === post.id} className="text-red-600 hover:underline text-sm disabled:opacity-50">
                        {deleting === post.id ? 'Deleting...' : 'Delete'}
                      </button>
                      <Link href={`/blog/${post.slug}`} className="text-green-600 hover:underline text-sm" target="_blank">View</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}