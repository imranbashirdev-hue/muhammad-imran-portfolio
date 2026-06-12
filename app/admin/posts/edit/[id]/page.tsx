'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import slugify from 'slugify';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';

interface PostData { id: string; title: string; content: string; excerpt: string; featured_image: string; seo_title: string; seo_description: string; published: boolean; }

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const modules = { toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['link', 'image', 'video'], ['clean']] };

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<PostData>({ id: '', title: '', content: '', excerpt: '', featured_image: '', seo_title: '', seo_description: '', published: false });
  const supabase = createClient();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from('posts').select('*').eq('id', params.id).single();
      if (data) setFormData({ id: data.id, title: data.title || '', content: data.content || '', excerpt: data.excerpt || '', featured_image: data.featured_image || '', seo_title: data.seo_title || '', seo_description: data.seo_description || '', published: data.published || false });
      setLoading(false);
    };
    fetchPost();
  }, [params.id, supabase]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) { setError('Title and content are required'); return; }
    setSaving(true); setError('');
    const slug = slugify(formData.title, { lower: true, strict: true });
    const { error: updateError } = await supabase.from('posts').update({ title: formData.title, slug, content: formData.content, excerpt: formData.excerpt || formData.content.substring(0, 150), featured_image: formData.featured_image, seo_title: formData.seo_title || formData.title, seo_description: formData.seo_description || formData.excerpt || formData.content.substring(0, 160), updated_at: new Date().toISOString() }).eq('id', formData.id);
    if (updateError) { setError(updateError.message); } else { router.push('/blog'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    const { error: deleteError } = await supabase.from('posts').delete().eq('id', formData.id);
    if (deleteError) { setError(deleteError.message); } else { router.push('/blog'); }
  };

  const togglePublish = async () => {
    const { error: updateError } = await supabase.from('posts').update({ published: !formData.published }).eq('id', formData.id);
    if (!updateError) setFormData({ ...formData, published: !formData.published });
  };

  if (loading) return <div className="max-w-6xl mx-auto py-16 px-4">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <div className="flex gap-3">
          <button onClick={togglePublish} className={`px-4 py-2 rounded-lg ${formData.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{formData.published ? '✅ Published' : '📝 Draft'}</button>
          <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">🗑️ Delete</button>
        </div>
      </div>
      {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600">❌ {error}</div>}
      <div className="space-y-6">
        <div><label className="block text-sm font-medium mb-2">Title *</label><input type="text" className="w-full p-3 rounded-lg border" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /></div>
        <div><label className="block text-sm font-medium mb-2">Featured Image</label><ImageUpload onUpload={(url) => setFormData({ ...formData, featured_image: url })} />{formData.featured_image && <Image src={formData.featured_image} alt="Featured" width={128} height={128} className="mt-2 h-32 w-auto rounded-lg" />}</div>
        <div><label className="block text-sm font-medium mb-2">Excerpt</label><textarea className="w-full p-3 rounded-lg border" rows={3} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} /></div>
        <div><label className="block text-sm font-medium mb-2">Content</label><ReactQuill value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} modules={modules} className="h-96 mb-12" /></div>
        <div className="border-t pt-6"><h2 className="text-xl font-bold mb-4">SEO Settings</h2><div className="space-y-4"><div><label className="block text-sm font-medium mb-2">SEO Title</label><input type="text" className="w-full p-3 rounded-lg border" value={formData.seo_title} onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })} /></div><div><label className="block text-sm font-medium mb-2">SEO Description</label><textarea className="w-full p-3 rounded-lg border" rows={2} value={formData.seo_description} onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })} /></div></div></div>
        <div className="flex gap-4"><button onClick={handleSubmit} disabled={saving} className="px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button><button onClick={() => router.push('/blog')} className="px-6 py-2 rounded-lg border border-gray-300">Cancel</button></div>
      </div>
    </div>
  );
}