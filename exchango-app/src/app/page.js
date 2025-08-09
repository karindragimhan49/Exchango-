// src/app/page.js

import Hero from '@/components/Hero'
import ConverterCard from '@/components/ConverterCard'
import Head from 'next/head'

export default function Home() {
  return (
    // Layout එක අයින් කලා, මොකද ඒක RootLayout එකේ තියෙන නිසා
    <> 
      <Head>
        <title>Exchango - Effortless Currency Conversion</title>
        <meta name="description" content="Real-time currency conversion and transfer management." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Hero />
      <ConverterCard />
    </>
  )
}