import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { HelpCircle, Package, Truck, Sparkles, RefreshCw, Mail, MessageCircle } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'
import { Accordion, AccordionItem } from '../src/components/ui/Accordion'
import { Tabs } from '../src/components/ui/Tabs'

export default function FAQ() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const faqCategories = [
    {
      id: 'orders',
      title: t('faqCategoryOrders'),
      icon: <Package className="w-4 h-4" />,
      faqs: [
        { id: 'q1', question: t('faqQ1'), answer: t('faqA1'), badge: 'Orders' },
        { id: 'q2', question: t('faqQ2'), answer: t('faqA2'), badge: 'Modify' },
        { id: 'q3', question: t('faqQ3'), answer: t('faqA3'), badge: 'Klarna' },
      ]
    },
    {
      id: 'shipping',
      title: t('faqCategoryShipping'),
      icon: <Truck className="w-4 h-4" />,
      faqs: [
        { id: 'q4', question: t('faqQ4'), answer: t('faqA4'), badge: 'Rates' },
        { id: 'q5', question: t('faqQ5'), answer: t('faqA5'), badge: 'Delivery' },
        { id: 'q6', question: t('faqQ6'), answer: t('faqA6'), badge: 'Worldwide' },
      ]
    },
    {
      id: 'products',
      title: t('faqCategoryProducts'),
      icon: <Sparkles className="w-4 h-4" />,
      faqs: [
        { id: 'q7', question: t('faqQ7'), answer: t('faqA7'), badge: 'Craft' },
        { id: 'q8', question: t('faqQ8'), answer: t('faqA8'), badge: 'Care' },
        { id: 'q9', question: t('faqQ9'), answer: t('faqA9'), badge: 'Eco' },
      ]
    },
    {
      id: 'returns',
      title: t('faqCategoryReturns'),
      icon: <RefreshCw className="w-4 h-4" />,
      faqs: [
        { id: 'q10', question: t('faqQ10'), answer: t('faqA10'), badge: '30-Day' },
        { id: 'q11', question: t('faqQ11'), answer: t('faqA11'), badge: 'Process' },
        { id: 'q12', question: t('faqQ12'), answer: t('faqA12'), badge: 'Exchange' },
      ]
    }
  ]

  const tabItems = [
    { id: 'all', label: 'All Questions', badge: 12 },
    ...faqCategories.map(cat => ({
      id: cat.id,
      label: cat.title,
      icon: cat.icon,
      badge: cat.faqs.length
    }))
  ]

  const displayedCategories = selectedCategory === 'all'
    ? faqCategories
    : faqCategories.filter(cat => cat.id === selectedCategory)

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
      
      <main id="main-content" className="min-h-screen bg-[#faf8f5]">
        {/* Hero Section */}
        <section className="bg-amber-50/70 py-16 sm:py-20 border-b border-amber-100/80">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-primary-800 text-xs font-bold mb-4 border border-amber-200">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Customer Help Center</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
                {t('frequentlyAskedQuestions')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {t('faqHeroDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content with Category Filter */}
        <section className="py-16">
          <div className="container-custom max-w-4xl mx-auto">
            {/* Category Filter Tabs */}
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <Tabs
                items={tabItems}
                activeId={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>

            {/* Questions by Category */}
            <div className="space-y-12">
              {displayedCategories.map((category) => (
                <div key={category.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-primary-700 flex items-center justify-center border border-amber-200/60 shadow-sm">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 font-serif">
                        {category.title}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {category.faqs.length} helpful topics
                      </p>
                    </div>
                  </div>
                  
                  <Accordion>
                    {category.faqs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        id={`faq-${faq.id}`}
                        title={faq.question}
                        badge={faq.badge}
                      >
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Contact CTA Card */}
            <div className="bg-gradient-to-br from-primary-900 to-amber-900 text-white rounded-3xl p-8 sm:p-12 text-center mt-16 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {t('faqStillHaveQuestions')}
                </h3>
                <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
                  {t('faqContactDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-4">
                  <Link href="/contact">
                    <a className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('contactUs')}</span>
                    </a>
                  </Link>
                  <a
                    href="mailto:hello@gaaka.de"
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>hello@gaaka.de</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}