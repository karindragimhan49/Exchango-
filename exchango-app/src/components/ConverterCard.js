'use client' 
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

export default function ConverterCard() {
  const { user, saveTransfer } = useAuth(); // Get user and saveTransfer function from context

  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('LKR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API Key is not configured.");
      setLoading(false);
      return;
    }

    const fetchCurrencies = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
        if (!res.ok) throw new Error('Could not fetch currencies.');
        const data = await res.json();
        if (data.result === 'success') {
          setCurrencies(data.supported_codes);
        } else {
          throw new Error(data['error-type'] || 'An unknown error occurred.');
        }
      } catch (err) {
        setError(err.message.replace(/-/g, ' '));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCurrencies();
  }, [apiKey]); 

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
        setError("Please enter a valid amount.");
        return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData['error-type'] || 'Conversion request failed');
      }
      const data = await res.json();
      if (data.result === 'success') {
          setResult(data);
          // If a user is logged in, save the transfer
          if (user) {
            saveTransfer({
              fromCurrency: from,
              toCurrency: to,
              amount: parseFloat(amount),
              convertedAmount: data.conversion_result,
              rate: data.conversion_rate,
            });
          }
      } else {
          throw new Error(data['error-type'] || 'An unknown error occurred during conversion.');
      }
    } catch (err) {
      setError(err.message.replace(/-/g, ' '));
      console.error(err);
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
          {/* ... (From and To dropdowns are here) ... */}
          {/* From Currency Dropdown */}
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-slate-600 mb-2">From</label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 bg-slate-50/80 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading || currencies.length === 0}
            >
              {currencies.length === 0 ? <option>Loading...</option> : currencies.map(([code, name]) => (
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
              disabled={loading || currencies.length === 0}
            >
               {currencies.length === 0 ? <option>Loading...</option> : currencies.map(([code, name]) => (
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

          <button
            type="submit"
            className="w-full mt-4 p-3 bg-blue-600 font-bold text-white rounded-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Converting...' : (user ? 'Convert & Save' : 'Convert')}
          </button>
        </form>

        <div className="mt-6 text-center min-h-[100px]">
            {error && <p className="text-red-600 font-semibold p-3 bg-red-100 rounded-md">{error}</p>}
            {result && (
                <div className="bg-slate-100/70 p-4 rounded-lg">
                    <p className="text-lg text-slate-700">
                        <span className="font-bold">{amount} {from}</span> is equal to
                    </p>
                    <p className="text-3xl font-bold text-blue-700 mt-1">
                        {result.conversion_result.toFixed(2)} {to}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                        Exchange Rate: 1 {from} = {result.conversion_rate} {to}
                    </p>
                </div>
            )}
        </div>
        
        {!user && (
            <p className="text-center text-xs text-slate-500 pt-4 mt-4 border-t border-slate-200">
                Please <Link href="/login" className="font-bold text-blue-600 hover:underline">Log in</Link> to save your transfer history.
            </p>
        )}
      </div>
    </section>
  )
}