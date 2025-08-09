import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthProvider } from '../context/AuthContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Exchango',
  description: 'Effortless Currency Conversion and Transfer Management',
}

export default function RootLayout({ children }) {
  const bodyStyle = {
    backgroundImage: "url('/background-image.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  return (
    
    <html lang="en" className="scroll-smooth">  
      <body className={`${inter.className} text-slate-800`} style={bodyStyle}>
        <AuthProvider>
          <div className="absolute inset-0 bg-white/ backdrop-blur-sm"></div>

    
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
         
          <Footer />
        </div>
      </AuthProvider>
        
        

      </body>
    </html>
  )
}