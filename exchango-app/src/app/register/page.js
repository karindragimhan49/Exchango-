'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name || !email || !password) {
      setError('All fields are necessary.');
      setLoading(false);
      return;
    }

    const success = register(name, email, password);
    if (success) {
      router.push('/login');
    } else {
      setError('An account with this email already exists.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-600">Full Name</label>
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="John Doe" className="w-full p-3 mt-1 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john.doe@example.com" className="w-full p-3 mt-1 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" className="w-full p-3 mt-1 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <button type="submit" className="w-full p-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 disabled:bg-slate-400" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm text-center">{error}</div>}
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}