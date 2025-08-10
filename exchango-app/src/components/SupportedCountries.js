'use client'
import Image from 'next/image';


const logos = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'LKR', name: 'Sri Lankan Rupee' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'AED', name: 'UAE Dirham' },
];

export default function SupportedCountries() {

  const extendedLogos = [...logos, ...logos];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold leading-8 text-slate-800">
          Supporting Currencies Worldwide
        </h2>
      
        <div className="mt-10 rounded-2xl bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-lg">
         
          <div
            className="scroller-container w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          >
            <div className="scroller flex min-w-full shrink-0 items-center justify-around gap-x-12 sm:gap-x-16">
              {extendedLogos.map((logo, index) => (
                <div key={index} className="flex-none" title={logo.name}>
                  <Image
                    className="max-h-12 w-auto object-contain transition-transform duration-300 hover:scale-110"
                    src={`https://flagcdn.com/h40/${logo.code.slice(0, 2).toLowerCase()}.png`}
                    alt={`${logo.name} flag`}
                    width={60}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}