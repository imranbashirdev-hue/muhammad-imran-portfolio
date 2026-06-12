'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import slugify from 'slugify';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['link', 'image', 'video'], ['clean']],
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
    if (!title || !content) { setError('Title and content are required'); return; }
    setSaving(true);
    setError('');
    const slug = slugify(title, { lower: true, strict: true });
    const { data, error: insertError } = await supabase.from('posts').insert([{
      title, slug, content, excerpt: excerpt || content.substring(0, 150), featured_image: featuredImage,
      seo_title: seoTitle || title, seo_description: seoDescription || excerpt || content.substring(0, 160),
      published: true, created_at: new Date().toISOString(),
    }]).select();
    if (insertError) { setError(insertError.message); } else { setSuccess('Post published!'); setPostId(data[0].id); setTitle(''); setContent(''); setExcerpt(''); setFeaturedImage(''); setSeoTitle(''); setSeoDescription(''); }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8"><h1 className="text-3xl font-bold">Create New Post</h1><div className="flex gap-3"><a href="/blog" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">📋 View Blog</a><a href="/admin/posts" className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">📝 All Posts</a></div></div>
      {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600">❌ {error}</div>}
      {success && <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-600"><div className="flex items-center justify-between flex-wrap gap-3"><div>✅ {success}</div><div className="flex gap-2"><button onClick={() => router.push(`/admin/posts/edit/${postId}`)} className="px-3 py-1 rounded bg-blue-500 text-white text-sm">✏️ Edit</button><button onClick={() => router.push(`/blog/${slugify(title, { lower: true, strict: true })}`)} className="px-3 py-1 rounded bg-green-500 text-white text-sm">👁️ View</button><button onClick={() => { setSuccess(''); setPostId(''); }} className="px-3 py-1 rounded bg-gray-300 text-gray-700 text-sm">+ Create New</button></div></div></div>}
      <div className="space-y-6">
        <div><label className="block text-sm font-medium mb-2">Title *</label><input type="text" className="w-full p-3 rounded-lg border" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" /></div>
        <div><label className="block text-sm font-medium mb-2">Featured Image</label><ImageUpload onUpload={setFeaturedImage} />{featuredImage && <div className="mt-2 relative inline-block"><Image src={featuredImage} alt="Featured" width={128} height={128} className="h-32 w-auto rounded-lg" /><button onClick={() => setFeaturedImage('')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">×</button></div>}</div>
        <div><label className="block text-sm font-medium mb-2">Excerpt</label><textarea className="w-full p-3 rounded-lg border" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description" /></div>
        <div><label className="block text-sm font-medium mb-2">Content *</label><ReactQuill value={content} onChange={setContent} modules={modules} className="h-96 mb-12 bg-white" /></div>
        <div className="border-t pt-6"><h2 className="text-xl font-bold mb-4">SEO Settings</h2><div className="space-y-4"><div><label className="block text-sm font-medium mb-2">SEO Title</label><input type="text" className="w-full p-3 rounded-lg border" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Leave blank to use post title" /></div><div><label className="block text-sm font-medium mb-2">SEO Description</label><textarea className="w-full p-3 rounded-lg border" rows={2} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Meta description" /></div></div></div>
        <div className="flex gap-4"><button onClick={handleSubmit} disabled={saving} className="px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white disabled:opacity-50">{saving ? 'Publishing...' : '📝 Publish Post'}</button><button onClick={() => router.push('/blog')} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Cancel</button></div>
      </div>
    </div>
  );
}