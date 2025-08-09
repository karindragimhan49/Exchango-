import Hero from '../components/Hero'
import ConverterCard from '../components/ConverterCard'

import Head from 'next/head'

export default function Home() {
  return (
    <> 
      <Head>
        <title>Exchango - Effortless Currency Conversion</title>
      </Head>
      
      <Hero />
      <ConverterCard />
    </>
  )
}