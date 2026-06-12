export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600">By accessing this website, you agree to be bound by these Terms & Conditions.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">2. Services</h2>
          <p className="text-gray-600">We provide digital marketing, web development, and advertising services. All services are subject to separate agreements.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Intellectual Property</h2>
          <p className="text-gray-600">All content on this website is the property of Muhammad Imran and protected by copyright laws.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Contact</h2>
          <p className="text-gray-600">For questions about these Terms, contact us at hello@muhammadimran.com</p>
        </section>
      </div>
    </div>
  );
}