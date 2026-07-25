import { Link } from 'react-router-dom'

const TOOL_LINKS = [
  { href: '/zakat-calculator', label: 'Zakat Calculator' },
  { href: '/currency-converter', label: 'Currency Converter' },
  { href: '/loan-calculator', label: 'Loan Calculator' },
  { href: '/salary-tax-calculator', label: 'Salary Tax Calculator' },
  { href: '/bmi-calculator', label: 'BMI Calculator' },
]
const MORE_LINKS = [
  { href: '/age-calculator', label: 'Age Calculator' },
  { href: '/percentage-calculator', label: 'Percentage Calculator' },
  { href: '/unit-converter', label: 'Unit Converter' },
  { href: '/discount-calculator', label: 'Discount Calculator' },
  { href: '/gpa-calculator', label: 'GPA Calculator' },
]
const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
]

export default function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-top-line" />
      <div className="footer-premium-inner">
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo-row">
            <img src="/image/Toolkit_pk.png" alt="ToolKitPK" className="footer-logo-icon" />
            <span className="footer-logo-text">ToolKitPK</span>
          </Link>
          <p className="footer-tagline">
            Free, fast, and accurate online calculators built for Pakistan — Zakat, loans, tax, currency, and more, with no sign-up required.
          </p>
          <span className="footer-made-badge">🇵🇰 Made for Pakistan</span>
        </div>

        <div className="footer-link-col">
          <div className="footer-col-title">Tools</div>
          {TOOL_LINKS.map((l) => (
            <Link key={l.href} to={l.href}>{l.label}</Link>
          ))}
        </div>

        <div className="footer-link-col">
          <div className="footer-col-title">More Tools</div>
          {MORE_LINKS.map((l) => (
            <Link key={l.href} to={l.href}>{l.label}</Link>
          ))}
        </div>

        <div className="footer-link-col">
          <div className="footer-col-title">Company</div>
          {COMPANY_LINKS.map((l) => (
            <Link key={l.href} to={l.href}>{l.label}</Link>
          ))}
        </div>
      </div>

      <div className="footer-bottom footer-bottom-premium">© 2026 ToolKitPK. All rights reserved.</div>
    </footer>
  )
}