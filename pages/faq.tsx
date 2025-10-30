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
      title: 'Orders & Payment',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order directly through our website. Simply browse our collections, add items to your cart, and proceed to checkout. We accept all major credit cards, PayPal, and bank transfers.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 2 hours of placing it. After that, your order enters our fulfillment process. Please contact us immediately at orders@gaaka.de if you need to make changes.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'For orders over €200, we offer installment payment options through Klarna. This option will be available at checkout if your order qualifies.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      faqs: [
        {
          question: 'What are your shipping costs?',
          answer: 'Shipping within Germany is free for orders over €75. For orders under €75, shipping costs €8.90. International shipping rates vary by destination and are calculated at checkout.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Within Germany: 2-4 business days. EU countries: 5-8 business days. Other international destinations: 10-15 business days. You will receive tracking information once your order ships.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by destination. International orders may be subject to customs duties and taxes.'
        }
      ]
    },
    {
      title: 'Products & Care',
      faqs: [
        {
          question: 'How are the baskets made?',
          answer: 'Our baskets are handwoven by skilled Kenyan artisans using traditional techniques passed down through generations. They use natural materials like sweet grass, palm leaves, and natural dyes.'
        },
        {
          question: 'How do I care for my basket?',
          answer: 'Clean with a dry or slightly damp cloth. Avoid soaking in water. For deeper cleaning, use a soft brush to remove dust. Store in a dry place away from direct sunlight to preserve colors.'
        },
        {
          question: 'Are your products sustainable?',
          answer: 'Yes! Our baskets are made from sustainably harvested natural materials. The traditional production methods create no waste, and our packaging uses recycled materials whenever possible.'
        }
      ]
    },
    {
      title: 'Returns & Exchanges',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy. Items must be in original condition with tags attached. Return shipping costs are covered by us if the item is defective, otherwise the customer covers return shipping.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Contact us at hello@gaaka.de with your order number and reason for return. We will provide you with a return authorization number and instructions.'
        },
        {
          question: 'Can I exchange an item?',
          answer: 'Yes, we accept exchanges for different sizes or colors within 30 days of purchase, subject to availability. The item must be in original condition.'
        }
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
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Find quick answers to common questions about our products, shipping, and services. Can't find what you're looking for? Feel free to contact us directly.
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
                Still have questions?
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Our customer service team is here to help. Reach out to us and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Contact Us
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