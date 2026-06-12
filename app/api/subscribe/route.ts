import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Supabase client initialize karein
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Data Supabase ke "leads" table mein save karein
    const { error } = await supabase
      .from('leads')
      .insert({ email });

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Failed to save email' }, { status: 500 });
    }

    // 2. Telegram par notification bhejein
    const text = `🎁 <b>New Checklist Download!</b>\n\n📧 <b>Email:</b> ${email}`;
    await sendTelegramNotification(text);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}