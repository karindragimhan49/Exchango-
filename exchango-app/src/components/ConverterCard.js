export default function ConverterCard() {
  return (
   
    <section id="converter" className="py-20 bg-slate-100/50 px-4 animate-fade-in-up [animation-delay:300ms]">
      <div className="max-w-md mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">
          Currency Converter
        </h3>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-slate-600 mb-2">From Country</label>
            <select id="from" className="w-full p-3 bg-slate-50 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Sri Lanka (LKR)</option>
              <option>United States (USD)</option>
            </select>
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-slate-600 mb-2">To Country</label>
            <select id="to" className="w-full p-3 bg-slate-50 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>India (INR)</option>
              <option>United Kingdom (GBP)</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-2">Amount</label>
            <input type="number" id="amount" defaultValue="32" className="w-full p-3 bg-slate-50 text-slate-900 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <button type="submit" className="w-full mt-4 p-3 bg-blue-600 font-bold text-white rounded-md hover:bg-blue-700 transition-colors">
            Convert
          </button>
          <p className="text-center text-xs text-slate-500 pt-4">
            You can convert amounts but need to log in to transfer funds or check the transaction history.
          </p>
        </form>
      </div>
    </section>
  )
}