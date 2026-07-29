import { Helmet } from 'react-helmet-async'

/**
 * SoftwareApplication schema — put on every calculator page.
 * Tells Google "this is a free web tool", improves rich-result eligibility.
 *
 * Usage:
 *   <ToolSchema name="BMI Calculator" url="https://toolkitpk.com/bmi-calculator" />
 */
export function ToolSchema({ name, url, description }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    url,
    description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}

/**
 * FAQ schema — optional, use on pages where you add a short Q&A block
 * under the calculator (recommended for Zakat, Tax, BMI — high-search pages).
 *
 * Usage:
 *   <FaqSchema faqs={[
 *     { q: 'How is Zakat calculated?', a: 'Zakat is 2.5% of...' },
 *     { q: 'What is Nisab?', a: 'Nisab is the minimum...' },
 *   ]} />
 */
export function FaqSchema({ faqs }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}