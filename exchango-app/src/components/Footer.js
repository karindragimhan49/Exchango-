export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Exchango. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
          Designed with ❤️ for a better financial world.
        </p>
      </div>
    </footer>
  )
}