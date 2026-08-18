import Head from 'next/head'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function FAQ() {
  const { t } = useLanguage()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqCategories = [
    {
      title: t('faqCategoryOrders'),
      faqs: [
        { question: t('faqQ1'), answer: t('faqA1') },
        { question: t('faqQ2'), answer: t('faqA2') },
        { question: t('faqQ3'), answer: t('faqA3') },
      ]
    },
    {
      title: t('faqCategoryShipping'),
      faqs: [
        { question: t('faqQ4'), answer: t('faqA4') },
        { question: t('faqQ5'), answer: t('faqA5') },
        { question: t('faqQ6'), answer: t('faqA6') },
      ]
    },
    {
      title: t('faqCategoryProducts'),
      faqs: [
        { question: t('faqQ7'), answer: t('faqA7') },
        { question: t('faqQ8'), answer: t('faqA8') },
        { question: t('faqQ9'), answer: t('faqA9') },
      ]
    },
    {
      title: t('faqCategoryReturns'),
      faqs: [
        { question: t('faqQ10'), answer: t('faqA10') },
        { question: t('faqQ11'), answer: t('faqA11') },
        { question: t('faqQ12'), answer: t('faqA12') },
      ]
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <>
      <Head>
        <title>{t('faq')} - GAAKA</title>
        <meta name="description" content="Find answers to frequently asked questions about GAAKA products, shipping, returns, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        <link rel="canonical" href="https://gaaka.com/faq" />
      </Head>

      <Header />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-amber-50/50 py-16 border-b border-amber-100/80">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                {t('frequentlyAskedQuestions')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('faqHeroDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  {category.title}
                </h2>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex
                    const isOpen = openFAQ === globalIndex
                    
                    return (
                      <div
                        key={faqIndex}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span className="text-lg font-medium text-gray-900">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-4 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Contact CTA */}
            <div className="bg-primary-50 rounded-2xl p-8 text-center mt-16">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                {t('faqStillHaveQuestions')}
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('faqContactDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  {t('contactUs')}
                </a>
                <a
                  href="mailto:hello@gaaka.de"
                  className="btn-outline inline-flex items-center justify-center"
                >
                  Email: hello@gaaka.de
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}