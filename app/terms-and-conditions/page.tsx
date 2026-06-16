

export default function TermsConditions() {
  return (
    <>
      {/* Hero Banner - Light Blue */}
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Terms & Conditions</h1>
          <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-sm text-slate-500 mt-2">Please read these terms carefully before using our services.</p>
        </div>
      </div>

      {/* White Content Area - Same width as footer */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            {/* Acceptance of Terms */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using this website, you agree to be bound by these Terms & Conditions. If you disagree with any part 
                of these terms, you may not access the website or use our services.
              </p>
            </div>

            {/* Services Description */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">2. Services We Provide</h2>
              <p className="text-gray-600 leading-relaxed mb-3">We offer the following digital marketing and development services:</p>
              <ul className="space-y-1 text-gray-600 list-disc pl-5">
                <li>Google Ads Management</li>
                <li>Meta Ads (Facebook/Instagram) Management</li>
                <li>SEO Services (Search Engine Optimization)</li>
                <li>WordPress Development</li>
                <li>Website Design</li>
                <li>E-commerce Development</li>
                <li>GA4 & GTM Setup</li>
                <li>Conversion Rate Optimization (CRO)</li>
              </ul>
            </div>

            {/* User Responsibilities */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">3. User Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed mb-3">By using our website, you agree to:</p>
              <ul className="space-y-1 text-gray-600 list-disc pl-5">
                <li>Provide accurate and complete information when using our forms</li>
                <li>Not misuse or attempt to disrupt our website functionality</li>
                <li>Not use our website for any illegal or unauthorized purpose</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not interfere with other users' access to our website</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">4. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of Muhammad Imran 
                and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative 
                works without explicit written permission.
              </p>
            </div>

            {/* Payment Terms */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">5. Payment Terms</h2>
              <ul className="space-y-1 text-gray-600 list-disc pl-5">
                <li>50% advance payment required before project initiation</li>
                <li>Remaining 50% due upon project completion</li>
                <li>Monthly retainer plans available for ongoing services</li>
                <li>All prices are in AED (UAE Dirham) unless specified otherwise</li>
                <li>Late payments may incur additional fees</li>
              </ul>
            </div>

            {/* Refund Policy */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">6. Refund Policy</h2>
              <ul className="space-y-1 text-gray-600 list-disc pl-5">
                <li>No refunds for services already rendered</li>
                <li>Ad spend budgets are non-refundable once spent</li>
                <li>Website development refunds evaluated on case-by-case basis</li>
                <li>Monthly retainer services can be cancelled with 30 days notice</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, Muhammad Imran shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses, resulting from your use of or inability to use our services.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">8. Third-Party Links</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website may contain links to third-party websites. We have no control over and assume no responsibility for the 
                content, privacy policies, or practices of any third-party sites.
              </p>
            </div>

            {/* Termination */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">9. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach these Terms & Conditions.
              </p>
            </div>

            {/* Governing Law */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">10. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the United Arab Emirates, without regard to 
                its conflict of law provisions.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">11. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at 
                least 30 days notice prior to any new terms taking effect.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">12. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-1 text-gray-600">
                <p>📧 Email: hello@muhammadimran.com</p>
                <p>📞 Phone: +92 341 49 60064</p>
                <p>💬 WhatsApp: +92 341 49 60064</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}