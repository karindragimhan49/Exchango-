'use client' // This must be a client component to use hooks

import { useState, useEffect } from 'react'

export default function ConverterCard() {
  // State variables for our form and results
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('LKR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Fetch currencies when the component loads
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/currencies');
        if (!res.ok) throw new Error('Could not fetch currencies');
        const data = await res.json();
        setCurrencies(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrencies();
  }, []); // Empty array means this runs only once

  // 2. Handle the conversion when the form is submitted
  const handleConvert = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, amount }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Conversion request failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="converter" className="py-20 px-4">
      <div className="max-w-md mx-auto bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">
          Currency Converter
        </h3>
        <form className="space-y-6" onSubmit={handleConvert}>
          {/* From Currency Dropdown */}
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-slate-600 mb-2">From</label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 bg-slate-50/80 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading}
            >
              {currencies.map(([code, name]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          {/* To Currency Dropdown */}
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-slate-600 mb-2">To</label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 bg-slate-50/80 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading}
            >
              {currencies.map(([code, name]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 bg-slate-50/80 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading}
              required
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-blue-600 font-bold text-white rounded-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </form>

        {/* --- Results & Errors --- */}
        <div className="mt-6 text-center">
            {error && <p className="text-red-600 font-semibold">{error}</p>}
            {result && (
                <div className="bg-slate-100/70 p-4 rounded-lg">
                    <p className="text-lg text-slate-700">
                        <span className="font-bold">{amount} {from}</span> is equal to
                    </p>
                    <p className="text-3xl font-bold text-blue-700 mt-1">
                        {result.result.toFixed(2)} {to}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                        Exchange Rate: 1 {from} = {result.rate} {to}
                    </p>
                </div>
            )}
        </div>
        
        <p className="text-center text-xs text-slate-500 pt-4 mt-4 border-t border-slate-200">
          You can convert amounts but need to log in to transfer funds or check the transaction history.
        </p>
      </div>
    </section>
  )
}