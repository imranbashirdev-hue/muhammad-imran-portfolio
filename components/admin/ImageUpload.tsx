'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Upload, X } from 'lucide-react';

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (data) {
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      onUpload(publicUrl);
    }
    setUploading(false);
  };

  return (
    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-50 border border-sky-200 hover:bg-sky-100 transition">
      <Upload size={16} />
      {uploading ? 'Uploading...' : 'Upload Image'}
      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
    </label>
  );
}