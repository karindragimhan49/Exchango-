'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import { ArrowsUpDownIcon, StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Select, { components } from 'react-select'
import Image from 'next/image';

// --- Custom Components ---
const Flag = ({ countryCode }) => (
  <Image
    src={`https://flagcdn.com/16x12/${countryCode.slice(0, 2).toLowerCase()}.png`}
    alt={`${countryCode} flag`}
    className="mr-2"
    width={16} 
    height={12} 
  />
);

const Option = (props) => (
  <components.Option {...props}>
    <div className="flex items-center">
      <Flag countryCode={props.value} />
      <span>{props.label}</span>
    </div>
  </components.Option>
)

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <div className="flex items-center truncate">
      <Flag countryCode={props.data.value} />
      <span className="truncate">{children}</span>
    </div>
  </components.SingleValue>
)

export default function ConverterCard() {
  const { user, saveTransfer, favorites, addFavorite, removeFavorite } = useAuth()

  const [currencies, setCurrencies] = useState([])
  const [from, setFrom] = useState({ value: 'USD', label: 'USD - United States Dollar' })
  const [to, setTo] = useState({ value: 'LKR', label: 'LKR - Sri Lankan Rupee' })
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY

  // --- Fetch currency list ---
  useEffect(() => {
    if (!apiKey) {
      setError('API Key is not configured.')
      setLoading(false)
      return
    }
    const fetchCurrencies = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
        if (!res.ok) throw new Error('Could not fetch currencies.')
        const data = await res.json()
        if (data.result === 'success') {
          const formattedCurrencies = data.supported_codes.map(([code, name]) => ({
            value: code,
            label: `${code} - ${name}`
          }))
          setCurrencies(formattedCurrencies)
        } else {
          throw new Error(data['error-type'] || 'An error occurred.')
        }
      } catch (err) {
        setError(err.message.replace(/-/g, ' '))
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCurrencies()
  }, [apiKey])

  // --- Swap currencies ---
  const handleSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  // --- Convert currency ---
  const handleConvert = async (e) => {
    e.preventDefault()
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount.')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from.value}/${to.value}/${amount}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData['error-type'] || 'Conversion request failed')
      }
      const data = await res.json()
      if (data.result === 'success') {
        setResult(data)
        if (user) {
          saveTransfer({
            fromCurrency: from.value,
            toCurrency: to.value,
            amount: parseFloat(amount),
            convertedAmount: data.conversion_result,
            rate: data.conversion_rate,
          })
        }
      } else {
        throw new Error(data['error-type'] || 'An unknown error occurred.')
      }
    } catch (err) {
      setError(err.message.replace(/-/g, ' '))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // --- Favorites ---
  const isFavorite = favorites?.some(
    (fav) => fav.from === from.value && fav.to === to.value
  )

  const handleToggleFavorite = () => {
    const pair = { from: from.value, to: to.value }
    if (isFavorite) {
      removeFavorite(pair)
    } else {
      addFavorite(pair)
    }
  }

  const handleSelectFavorite = (fav) => {
    const fromCurrency = currencies.find(c => c.value === fav.from)
    const toCurrency = currencies.find(c => c.value === fav.to)
    if (fromCurrency) setFrom(fromCurrency)
    if (toCurrency) setTo(toCurrency)
  }

  // --- Styles for react-select ---
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      padding: '0.35rem',
      backgroundColor: 'rgba(248, 250, 252, 0.9)',
      border: '1px solid #cbd5e1',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      minHeight: '50px',
      '&:hover': { borderColor: '#94a3b8' }
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? '#2563eb' : isFocused ? '#dbeafe' : '#fff',
      color: isSelected ? 'white' : '#1e293b',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isSelected ? '#d1d5db' : undefined,
      },
    }),
  }

  return (
    <section id="converter" className="py-20 px-4">
      <div className="max-w-md mx-auto bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        {/* Header + Favorite Button */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800">
            Currency Converter
          </h3>
          {user && (
            <button
              onClick={handleToggleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <StarIconSolid className="h-6 w-6 text-yellow-500" />
              ) : (
                <StarIconOutline className="h-6 w-6 text-slate-400 hover:text-yellow-500" />
              )}
            </button>
          )}
        </div>

        {/* Favorites List */}
        {user && favorites?.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 mb-2">FAVORITES</p>
            <div className="flex flex-wrap gap-2">
              {favorites.map((fav, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectFavorite(fav)}
                  className="flex items-center gap-1.5 px-2 py-1 bg-slate-200/70 hover:bg-slate-300 rounded-full text-sm text-slate-700"
                >
                  <Flag countryCode={fav.from} />
                  <span>→</span>
                  <Flag countryCode={fav.to} />
                  <span>{fav.from}/{fav.to}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Converter Form */}
        <form className="space-y-4" onSubmit={handleConvert}>
          {/* From Currency */}
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-slate-600 mb-2">From</label>
            <Select
              id="from"
              value={from}
              onChange={setFrom}
              options={currencies}
              styles={customSelectStyles}
              isLoading={loading && currencies.length === 0}
              isDisabled={loading || currencies.length === 0}
              components={{ Option, SingleValue }}
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center py-1">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-transform hover:rotate-180 duration-300"
              aria-label="Swap currencies"
            >
              <ArrowsUpDownIcon className="h-5 w-5" />
            </button>
          </div>

          {/* To Currency */}
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-slate-600 mb-2">To</label>
            <Select
              id="to"
              value={to}
              onChange={setTo}
              options={currencies}
              styles={customSelectStyles}
              isLoading={loading && currencies.length === 0}
              isDisabled={loading || currencies.length === 0}
              components={{ Option, SingleValue }}
            />
          </div>

          {/* Amount Input */}
          <div className="pt-2">
            <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 bg-slate-50/80 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full !mt-6 p-3 bg-indigo-600 font-bold text-white rounded-md hover:bg-indigo-800 disabled:bg-slate-400"
            disabled={loading}
          >
            {loading ? 'Converting...' : (user ? 'Convert & Save' : 'Convert')}
          </button>
        </form>

        {/* Results / Errors */}
        <div className="mt-6 text-center min-h-[100px]">
          {error && <p className="text-red-600 font-semibold p-3 bg-red-100/80 rounded-md">{error}</p>}
          {result && (
            <div className="bg-slate-100/70 p-4 rounded-lg">
              <p className="text-lg text-slate-700">
                <span className="font-bold">{amount} {result.base_code}</span> is equal to
              </p>
              <p className="text-3xl font-bold text-indigo-700 mt-1">
                {result.conversion_result.toFixed(2)} {result.target_code}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Exchange Rate: 1 {result.base_code} = {result.conversion_rate} {result.target_code}
              </p>
            </div>
          )}
        </div>

        {/* Login Prompt */}
        {!user && (
          <p className="text-center text-xs text-slate-500 pt-4 mt-4 border-t border-slate-200">
            Please <Link href="/login" className="font-bold text-indigo-600 hover:underline">Log in</Link> to save your transfer history & favorites.
          </p>
        )}
      </div>
    </section>
  )
}
