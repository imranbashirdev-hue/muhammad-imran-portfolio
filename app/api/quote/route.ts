import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("--- API /api/quote HIT ---");
  
  try {
    // 1. Form se data lein
    const body = await request.json();
    const { name, phone, message } = body;
    console.log("Received Data:", { name, phone, message });

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    // 2. Environment variables check karein
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log("ENV Check -> URL exists:", !!supabaseUrl, "Key exists:", !!supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      console.error("ERROR: Supabase URL or Key is missing in .env.local");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 3. Supabase Client banayein
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Attempting to insert into 'quotes' table...");

    // 4. Data insert karein
    const { data, error } = await supabase
      .from('quotes')
      .insert({ name, phone, message })
      .select();

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json({ error: `Database Error: ${error.message}` }, { status: 500 });
    }
    
    console.log("Supabase Insert SUCCESS:", data);

    // 5. Telegram Notification (Agar token nahi hai toh skip kare)
    try {
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (token && chatId && token !== "apna_token_yahan_paste_karein") {
        console.log("Sending Telegram Notification...");
        const text = `🚀 <b>New Quote Request!</b>\n\n👤 <b>Name:</b> ${name}\n📞 <b>Phone:</b> ${phone}\n💬 <b>Message:</b> ${message || 'N/A'}`;
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' }),
        });
      } else {
        console.log("Telegram Skipped (Token missing or default)");
      }
    } catch (telErr) {
      console.log("Telegram Error (Non-fatal):", telErr);
    }

    console.log("--- API SUCCESS ---");
    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("--- FATAL SERVER ERROR ---", err);
    return NextResponse.json({ error: `Internal Server Error: ${err.message}` }, { status: 500 });
  }
}