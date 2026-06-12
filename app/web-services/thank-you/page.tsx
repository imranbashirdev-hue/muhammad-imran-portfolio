'use client';

import Link from 'next/link';
import { CheckCircle, MessageCircle, Home } from 'lucide-react';

export default function WPServicesThankYou() {
  const phoneNumber = '+923414960064';
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4 py-8">
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Thank You! 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Your WordPress development request has been received.
        </p>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <p className="text-gray-600 mb-4">
            I&apos;ll review your requirements and get back to you within <strong className="text-sky-600">24 hours</strong>.
          </p>
          
          {/* WhatsApp Button */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition w-full sm:w-auto"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>
        
        {/* Back to Services Button */}
        <Link 
          href="/web-services" 
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <Home size={18} />
          Back to Services
        </Link>
      </div>
    </div>
  );
}