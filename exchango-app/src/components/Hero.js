// src/components/Hero.js

import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function Hero() {
  return (
   
    <section className="text-center py-20 sm:py-32 px-4">
      <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900">
          Your Gateway to
      </h2>
      <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mt-2">
        Global Transactions
      </h2>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
        Seamlessly convert currencies and manage your international transfers with real-time rates and unmatched simplicity.
      </p>
      <div className="mt-8">
        <a
          href="#converter"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md font-bold hover:bg-indigo-800"
        >
          Try Now
          <ChevronDownIcon className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}