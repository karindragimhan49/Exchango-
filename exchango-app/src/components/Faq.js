'use client'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'


const faqs = [
  {
    question: "How are the exchange rates determined?",
    answer:
      "Our exchange rates are sourced in real-time from the ExchangeRate-API, providing up-to-the-minute accuracy for all currency conversions. We ensure you always get the latest available market rates.",
  },
  {
    question: "Is it free to use Exchango?",
    answer:
      "Yes! Exchango is completely free for converting currencies and tracking your transfer history. There are no hidden fees or charges for using the core features of the application.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Absolutely. We prioritize your privacy. All your data, including your user information and transfer history, is stored securely in your browser&apos;s Local Storage. No data is sent to or stored on our servers, giving you full control.",
  },
  {
    question: "How is my transfer history saved?",
    answer:
      "When you are logged in and perform a conversion, the details of that transaction are automatically saved to your browser&apos;s Local Storage. This history is linked to your account and is only accessible when you are logged in on the same browser.",
  },
]

export default function Faq() {
  return (
    <div className="w-full px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-slate-600 mb-8">
          Have questions? We&apos;ve got answers.
        </p>

        {/* This div will draw lines between the questions */}
        <div className="divide-y divide-slate-200/70 rounded-lg border border-slate-200/70">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question}>
              {({ open }) => (
                <div className="p-2">
                  <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-lg font-semibold text-slate-900 hover:bg-slate-100/70 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75 transition-colors">
                    <span className="flex-1 pr-4">{faq.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-slate-500 transition-transform duration-300`}
                    />
                  </Disclosure.Button>
                  
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-base leading-7 text-slate-600">
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  )
}