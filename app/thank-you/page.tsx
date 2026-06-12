'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, MessageCircle, Mail, Home } from 'lucide-react';

export default function ThankYou() {
  const phoneNumber = '+923414960064';
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4 py-8">
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Thank You! 🎉
        </h1>
        
        {/* Message */}
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          Your request has been received successfully.
        </p>
        
        {/* Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <p className="text-gray-600 mb-3">
            I'll review your information and get back to you within <strong className="text-sky-600">24 hours</strong> via WhatsApp or email.
          </p>
          
          {/* WhatsApp Link Button */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition mt-3"
          >
            <MessageCircle size={18} />
            Message on WhatsApp
          </a>
          
          <p className="text-gray-500 text-sm mt-4">
            📞 {phoneNumber}
          </p>
        </div>
        
        {/* Action Buttons - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:opacity-90 transition text-sm sm:text-base"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight size={16} />
          </Link>
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition text-sm sm:text-base"
          >
            Read Our Blog
          </Link>
        </div>
      </div>
    </div>
  );
}