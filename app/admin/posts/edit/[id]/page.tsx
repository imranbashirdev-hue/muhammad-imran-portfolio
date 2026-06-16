'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import slugify from 'slugify';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface PostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [post, setPost] = useState<PostData | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!params?.id || params.id === '' || params.id === 'undefined') {
      router.push('/admin/posts');
      return;
    }

    const loadPost = async () => {
      try {
        setLoading(true);
        setError('');

        const id = decodeURIComponent(params.id);
        console.log('🔍 Fetching with:', id);

        // Check if it's a UUID or Slug
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        
        let query = supabase.from('posts').select('*');
        
        if (isUUID) {
          query = query.eq('id', id);
        } else {
          query = query.eq('slug', id);
        }

        const { data, error } = await query;

        if (error) {
          console.error('❌ Database error:', error);
          setError('Database error: ' + error.message);
          setLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          setError('Post not found');
          setLoading(false);
          return;
        }

        const postData = data[0];
        setPost({
          id: postData.id,
          title: postData.title || '',
          content: postData.content || '',
          excerpt: postData.excerpt || '',
          featured_image: postData.featured_image || '',
          seo_title: postData.seo_title || '',
          seo_description: postData.seo_description || '',
          published: postData.published || false,
        });

        console.log(' Post loaded:', postData.title);
      } catch (err) {
        console.error('💥 Error:', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params]);

  const handleSubmit = async () => {
    if (!post) return;
    if (!post.title || !post.content) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    const slug = slugify(post.title, { lower: true, strict: true });

    try {
      const { error: updateError } = await supabase
        .from('posts')
        .update({
          title: post.title,
          slug: slug,
          content: post.content,
          excerpt: post.excerpt || post.content.substring(0, 150),
          featured_image: post.featured_image,
          seo_title: post.seo_title || post.title,
          seo_description: post.seo_description || post.excerpt || post.content.substring(0, 160),
          updated_at: new Date().toISOString(),
        })
        .eq('id', post.id);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess('Post updated successfully!');
        setTimeout(() => {
          router.push('/blog');
        }, 1500);
      }
    } catch (err) {
      console.error('💥 Error:', err);
      setError('Something went wrong. Please try again.');
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!post) return;
    if (!confirm('Delete this post?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);

      if (deleteError) {
        setError(deleteError.message);
      } else {
        router.push('/blog');
      }
    } catch (err) {
      console.error('💥 Error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const togglePublish = async () => {
    if (!post) return;

    try {
      const { error: updateError } = await supabase
        .from('posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (!updateError) {
        setPost({ ...post, published: !post.published });
        setSuccess(`Post ${!post.published ? 'published' : 'unpublished'}!`);
      } else {
        setError(updateError.message);
      }
    } catch (err) {
      console.error('💥 Error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
        <p className="mt-4 text-slate-500">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push('/admin/posts')}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        <div className="text-yellow-500 text-lg mb-4">⚠️ No post loaded</div>
        <button
          onClick={() => router.push('/admin/posts')}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
        >
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <div className="flex gap-3">
          <button
            onClick={togglePublish}
            className={`px-4 py-2 rounded-lg ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
          >
            {post.published ? ' Published' : '📝 Draft'}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600">
          {success}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <ImageUpload onUpload={(url) => setPost({ ...post, featured_image: url })} />
          {post.featured_image && (
            <div className="mt-2">
              <Image
                src={post.featured_image}
                alt="Featured"
                width={128}
                height={128}
                className="h-32 w-auto rounded-lg object-cover"
              />
              <button
                onClick={() => setPost({ ...post, featured_image: '' })}
                className="mt-1 text-xs text-red-500 hover:text-red-600"
              >
                Remove image
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            rows={3}
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <ReactQuill
            value={post.content}
            onChange={(value) => setPost({ ...post, content: value })}
            modules={modules}
            className="h-96 mb-12 bg-white"
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SEO Title</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                value={post.seo_title}
                onChange={(e) => setPost({ ...post, seo_title: e.target.value })}
                placeholder="Leave blank to use post title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SEO Description</label>
              <textarea
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                rows={2}
                value={post.seo_description}
                onChange={(e) => setPost({ ...post, seo_description: e.target.value })}
                placeholder="Meta description for search engines"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}