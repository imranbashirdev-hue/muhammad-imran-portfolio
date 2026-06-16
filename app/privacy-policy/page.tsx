

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Banner - Light Blue */}
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-sm text-slate-500 mt-2">Expert team committed to helping businesses scale with data-driven strategies.</p>
        </div>
      </div>

      {/* White Content Area - Same width as footer */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            {/* Introduction */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                This privacy policy explains how we collect, process, and protect your personal information when you use our website. 
                By using our website, you consent to the practices described in this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Information We Collect</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800">Personal Information</h3>
                  <p className="text-gray-600">Name, email address, phone number, business name, and any other information you provide through our forms.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Usage Data</h3>
                  <p className="text-gray-600">IP address, browser type, pages visited, time spent, and other analytical data collected via cookies.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Communication Data</h3>
                  <p className="text-gray-600">Messages, inquiries, and feedback you submit through our contact forms.</p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">How We Use Your Information</h2>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>To respond to your inquiries and provide requested services</li>
                <li>To improve our website, services, and user experience</li>
                <li>To send marketing communications (with your consent)</li>
                <li>To analyze website traffic and optimize performance</li>
                <li>To detect and prevent fraudulent activities</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">What Are Cookies?</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Cookies are small text files that are placed on your device when you visit a website. They are commonly used to improve 
                the user experience and provide website owners with useful information about how visitors interact with their site.
              </p>
              <h3 className="font-semibold text-gray-800 mt-3 mb-2">Types of Cookies We Use</h3>
              <ul className="space-y-1 text-gray-600 list-disc pl-5">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized 
                access, alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption protocols.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-3">We use the following third-party services:</p>
              <ul className="space-y-1 text-gray-600 list-disc pl-5">
                <li><strong>Supabase:</strong> Database and authentication services</li>
                <li><strong>Vercel:</strong> Website hosting and deployment</li>
                <li><strong>Google Analytics:</strong> Website traffic analysis</li>
                <li><strong>Google Tag Manager:</strong> Marketing tag management</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-3">You have the right to:</p>
              <ul className="space-y-1 text-gray-600 list-disc pl-5">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-1 text-gray-600">
                <p>📧 Email: hello@muhammadimran.com</p>
                <p>📞 Phone: +92 341 49 60064</p>
                <p>💬 WhatsApp: +92 341 49 60064</p>
              </div>
            </div>

            {/* Updates to Policy */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. 
                We encourage you to review this policy periodically.
              </p>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
}