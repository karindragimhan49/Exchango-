'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const success = login(email, password);
    if (success) {
      router.replace('/');
    } else {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Welcome Back</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-600">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john.doe@example.com" className="w-full p-3 mt-1 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" className="w-full p-3 mt-1 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
              </div>
              <button type="submit" className="w-full p-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 disabled:bg-slate-400" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm text-center">{error}</div>}
            </form>
            <div className="text-center mt-6">
                <p className="text-sm text-slate-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    </div>
  );
}