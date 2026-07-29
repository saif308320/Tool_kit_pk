import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getRelatedTools } from '../toolsData.js'

/**
 * Usage on a tool page (after FAQ, near the end):
 *   <RelatedCalculators currentHref="/bmi-calculator" />
 */
export default function RelatedCalculators({ currentHref }) {
  const { lang } = useLanguage()
  const related = getRelatedTools(currentHref, 3)

  if (related.length === 0) return null

  return (
    <section className="related-premium">
      <h2 className="en-only">Related Calculators</h2>
      <h2 className="ur-only ur-text">متعلقہ کیلکولیٹرز</h2>

      <div className="related-grid">
        {related.map((t) => (
          <Link to={t.href} className={`related-card ${t.glow}`} key={t.href}>
            <img src={t.icon} alt="" className="related-card-icon" loading="lazy" />
            <span className="en-only">{t.en}</span>
            <span className="ur-only ur-text">{t.ur}</span>
            <svg className="related-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  )
}