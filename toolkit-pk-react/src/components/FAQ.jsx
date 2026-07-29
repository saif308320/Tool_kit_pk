import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { FaqSchema } from './SchemaMarkup.jsx'

/**
 * Premium FAQ accordion — animated open/close, styled to match the
 * site's teal/gold theme, bilingual (EN/UR), and auto-injects FAQPage
 * JSON-LD schema for Google rich results.
 *
 * Usage (inside a tool page, after your calculator + explainer content):
 *
 *   <FAQ items={[
 *     { qEn: 'What is Zakat?', aEn: 'Zakat is...', qUr: 'زکوٰۃ کیا ہے؟', aUr: '...' },
 *     { qEn: 'What is Nisab?', aEn: '...', qUr: '...', aUr: '...' },
 *   ]} />
 */
export default function FAQ({ items }) {
  const { lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState(0)

  if (!items || items.length === 0) return null

  const schemaFaqs = items.map((it) => ({
    q: lang === 'ur' ? it.qUr : it.qEn,
    a: lang === 'ur' ? it.aUr : it.aEn,
  }))

  return (
    <section className="faq-premium">
      <FaqSchema faqs={schemaFaqs} />

      <div className="faq-head">
        <span className="faq-kicker en-only">FAQs</span>
        <span className="faq-kicker ur-only ur-text">سوالات</span>
        <h2 className="en-only">Frequently Asked Questions</h2>
        <h2 className="ur-only ur-text">اکثر پوچھے جانے والے سوالات</h2>
      </div>

      <div className="faq-list">
        {items.map((it, i) => {
          const isOpen = openIndex === i
          return (
            <div className={`faq-item${isOpen ? ' faq-item-open' : ''}`} key={i}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="en-only">{it.qEn}</span>
                <span className="ur-only ur-text">{it.qUr}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div className="faq-answer" id={`faq-answer-${i}`} role="region">
                <div className="faq-answer-inner">
                  <p className="en-only">{it.aEn}</p>
                  <p className="ur-only ur-text">{it.aUr}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}