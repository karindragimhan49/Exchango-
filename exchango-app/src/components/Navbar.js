'use client' // Login/Join buttons client-side interact කරන්න පුළුවන් නිසා මේක තියෙන එක හොඳයි

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-blue-600">
            Exchango
          </h1>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
              Login
            </a>
            <a href="#" className="text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Join for Free
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}