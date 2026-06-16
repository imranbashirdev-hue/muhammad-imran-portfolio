'use client';

import { useEffect, useState } from 'react';
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
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const supabase = createClient();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { data, error: supabaseError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setError(supabaseError.message);
        setPosts([]);
      } else {
        setPosts(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // SIMPLE DELETE FUNCTION - Direct approach
  const handleDelete = async (id: string) => {
    if (!confirm('⚠️ Delete this post permanently?')) {
      return;
    }

    setDeleting(id);
    setError('');

    try {
      console.log('🔍 Deleting post ID:', id);

      // Method 1: Try delete
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      console.log('Delete response:', error);

      if (error) {
        console.error('❌ Delete error:', error);
        setError('Error: ' + error.message);
        alert('❌ Error: ' + error.message);
        setDeleting(null);
        return;
      }

      // Success - Remove from UI immediately
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      alert('Post deleted successfully!');
      
    } catch (err) {
      console.error('💥 Catch error:', err);
      setError('Something went wrong');
      alert('❌ Something went wrong. Please try again.');
    }

    setDeleting(null);
  };

  // Simple Toggle Publish
  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ published: !currentStatus })
        .eq('id', id);
      
      if (error) {
        alert('Error: ' + error.message);
      } else {
        // Update local state
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === id ? { ...post, published: !currentStatus } : post
          )
        );
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
        <p className="mt-4 text-slate-500">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="text-red-500 text-lg mb-4"> {error}</div>
        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">No posts yet</p>
          <p className="mt-2">Create your first post!</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-slate-800 hover:text-sky-600 transition"
                      target="_blank"
                    >
                      {post.title || 'Untitled'}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(post.id, post.published)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        post.published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/edit/${post.id}`}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deleting === post.id}
                        className={`px-3 py-1.5 text-sm rounded-lg transition ${
                          deleting === post.id
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }`}
                      >
                        {deleting === post.id ? '⏳' : 'Delete'}
                      </button>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                      >
                        View
                      </Link>
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