import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext.jsx'

const SITE = 'https://toolkitpk.com'

/**
 * Usage on a tool page:
 *   <Breadcrumb toolEn="BMI Calculator" toolUr="بی ایم آئی کیلکولیٹر" path="/bmi-calculator" />
 */
export default function Breadcrumb({ toolEn, toolUr, path }) {
  const { lang } = useLanguage()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: toolEn, item: `${SITE}${path}` },
    ],
  }

  return (
    <nav className="breadcrumb-premium" aria-label="Breadcrumb">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Link to="/" className="breadcrumb-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5Z" />
        </svg>
        <span className="en-only">Home</span>
        <span className="ur-only ur-text">ہوم</span>
      </Link>
      <span className="breadcrumb-sep">/</span>
      <span className="breadcrumb-current en-only">{toolEn}</span>
      <span className="breadcrumb-current ur-only ur-text">{toolUr}</span>
    </nav>
  )
}