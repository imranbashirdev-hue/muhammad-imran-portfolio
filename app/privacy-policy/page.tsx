export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-600">We collect information you provide directly to us, such as your name, email address, phone number, and business name when you submit forms on our website.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600">We use the information we collect to respond to your inquiries, provide our services, and communicate with you about your projects.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
          <p className="text-gray-600">We implement appropriate technical and organizational measures to protect your personal information.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Contact Us</h2>
          <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at hello@muhammadimran.com</p>
        </section>
      </div>
    </div>
  );
}