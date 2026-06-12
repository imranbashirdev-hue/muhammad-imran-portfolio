'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth');
    if (isAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Password from environment variable
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'imran123';
    
    if (password === correctPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      setAuthenticated(true);
      setError('');
    } else {
      setError('Wrong password!');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-2 border rounded-lg mb-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}