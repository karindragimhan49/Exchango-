'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { user, loading, getTransferHistory } = useAuth();
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // If not loading and no user, redirect to login
      router.push('/login');
    } else if (user) {
      // If user exists, get their history
      setHistory(getTransferHistory());
    }
  }, [user, loading, router, getTransferHistory]);

  if (loading || !user) {
    // Show a loading state or nothing while redirecting
    return (
        <div className="text-center py-40">
            <p className="text-slate-500">Loading your dashboard...</p>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Transfer History</h1>
      <p className="text-slate-600 mb-8">Here are all the conversions you&apos;ve made, {user.name}.</p>



      <div className="space-y-4">
        {history.length > 0 ? (
          history.slice(0).reverse().map(item => ( // .slice(0).reverse() to show latest first without mutating original
            <div key={item.id} className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {item.amount} {item.fromCurrency} → {item.convertedAmount.toFixed(2)} {item.toCurrency}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-sm font-semibold text-indigo-600">
                    Applied Rate
                  </p>
                  <p className="text-slate-600">
                    1 {item.fromCurrency} = {item.rate.toFixed(4)} {item.toCurrency}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white/70 rounded-lg">
            <p className="text-slate-500 text-lg">You haven&apos;t made any transfers yet.</p>
            <p className="text-slate-400 mt-2">Go back to the <Link href="/" className="text-indigo-600 hover:underline">converter</Link> to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}