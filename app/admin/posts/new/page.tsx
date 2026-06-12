'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import slugify from 'slugify';
import ImageUpload from '@/components/admin/ImageUpload';

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

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [postId, setPostId] = useState('');
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');
    
    const slug = slugify(title, { lower: true, strict: true });
    
    try {
      const { data, error: insertError } = await supabase.from('posts').insert([{
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 150),
        featured_image: featuredImage,
        seo_title: seoTitle || title,
        seo_description: seoDescription || excerpt || content.substring(0, 160),
        published: true,
        created_at: new Date().toISOString(),
      }]).select();

      if (insertError) {
        console.error('Supabase error:', insertError);
        setError(insertError.message);
      } else {
        setSuccess('Post published successfully!');
        setPostId(data[0].id);
        
        // Clear form
        setTitle('');
        setContent('');
        setExcerpt('');
        setFeaturedImage('');
        setSeoTitle('');
        setSeoDescription('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong');
    }
    
    setSaving(false);
  };

  const handleEdit = () => {
    router.push(`/admin/posts/edit/${postId}`);
  };

  const handleView = () => {
    router.push(`/blog/${slugify(title, { lower: true, strict: true })}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <div className="flex gap-3">
          <a href="/blog" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            📋 View Blog
          </a>
          <a href="/admin/posts" className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            📝 All Posts
          </a>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600">
          ❌ {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>✅ {success}</div>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
              >
                ✏️ Edit Post
              </button>
              <button
                onClick={handleView}
                className="px-3 py-1 rounded bg-green-500 text-white text-sm hover:bg-green-600"
              >
                👁️ View Post
              </button>
              <button
                onClick={() => {
                  setSuccess('');
                  setPostId('');
                }}
                className="px-3 py-1 rounded bg-gray-300 text-gray-700 text-sm hover:bg-gray-400"
              >
                + Create New
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <ImageUpload onUpload={setFeaturedImage} />
          {featuredImage && (
            <div className="mt-2 relative inline-block">
              <img src={featuredImage} className="h-32 rounded-lg" />
              <button
                onClick={() => setFeaturedImage('')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt (Optional)</label>
          <textarea
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description of your post (will auto-generate from content if empty)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-96 mb-12 bg-white"
            placeholder="Write your post content here..."
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">SEO Settings (Optional)</h2>
          <p className="text-sm text-gray-500 mb-4">Leave blank to auto-generate from title and excerpt</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SEO Title</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Leave blank to use post title"
              />
              <p className="text-xs text-gray-400 mt-1">Recommended: 50-60 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SEO Description</label>
              <textarea
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description for search engines"
              />
              <p className="text-xs text-gray-400 mt-1">Recommended: 150-160 characters</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? 'Publishing...' : '📝 Publish Post'}
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