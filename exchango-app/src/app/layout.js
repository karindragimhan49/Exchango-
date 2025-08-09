import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'


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
      {/* 
        
      */}
      <body className={`${inter.className} text-slate-800`} style={bodyStyle}>
        
        <div className="absolute inset-0 bg-white/ backdrop-blur-sm"></div>
        
        <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
        </div>
      </body>
    </html>
  )
}