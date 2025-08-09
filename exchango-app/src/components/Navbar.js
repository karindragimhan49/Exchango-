'use client'
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Exchango
          </Link>
          <div className="flex items-center gap-6">
            {loading ? (
              <div className="text-sm text-slate-500 animate-pulse">Loading...</div>
            ) : user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                  History
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-bold bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Join for Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}