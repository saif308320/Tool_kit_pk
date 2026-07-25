import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

/* Same 3D icon set as Home.jsx — keeps drawer icons consistent with home cards */
const ICON_BASE = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets'
const ICONS = {
  house: `${ICON_BASE}/House/3D/house_3d.png`,
  zakat: `${ICON_BASE}/Money%20bag/3D/money_bag_3d.png`,
  currency: `${ICON_BASE}/Currency%20exchange/3D/currency_exchange_3d.png`,
  loan: `${ICON_BASE}/Bank/3D/bank_3d.png`,
  tax: `${ICON_BASE}/Receipt/3D/receipt_3d.png`,
  bmi: `${ICON_BASE}/Balance%20scale/3D/balance_scale_3d.png`,
  age: `${ICON_BASE}/Hourglass%20not%20done/3D/hourglass_not_done_3d.png`,
  percentage: `${ICON_BASE}/Bar%20chart/3D/bar_chart_3d.png`,
  unit: `${ICON_BASE}/Straight%20ruler/3D/straight_ruler_3d.png`,
  discount: `${ICON_BASE}/Label/3D/label_3d.png`,
  gpa: `${ICON_BASE}/Graduation%20cap/3D/graduation_cap_3d.png`,
  info: `${ICON_BASE}/Information/3D/information_3d.png`,
  envelope: `${ICON_BASE}/Envelope/3D/envelope_3d.png`,
  locked: `${ICON_BASE}/Locked/3D/locked_3d.png`,
  page: `${ICON_BASE}/Page%20facing%20up/3D/page_facing_up_3d.png`,
}

const TOOLS = [
  { href: '/zakat-calculator', icon: ICONS.zakat, en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر' },
  { href: '/currency-converter', icon: ICONS.currency, en: 'Currency Converter', ur: 'کرنسی کنورٹر' },
  { href: '/loan-calculator', icon: ICONS.loan, en: 'Loan / EMI Calculator', ur: 'قرض / قسط کیلکولیٹر' },
  { href: '/salary-tax-calculator', icon: ICONS.tax, en: 'Salary Tax Calculator', ur: 'تنخواہ ٹیکس کیلکولیٹر' },
  { href: '/bmi-calculator', icon: ICONS.bmi, en: 'BMI Calculator', ur: 'بی ایم آئی کیلکولیٹر' },
  { href: '/age-calculator', icon: ICONS.age, en: 'Age Calculator', ur: 'عمر کیلکولیٹر' },
  { href: '/percentage-calculator', icon: ICONS.percentage, en: 'Percentage Calculator', ur: 'فیصد کیلکولیٹر' },
  { href: '/unit-converter', icon: ICONS.unit, en: 'Unit Converter', ur: 'یونٹ کنورٹر' },
  { href: '/discount-calculator', icon: ICONS.discount, en: 'Discount Calculator', ur: 'ڈسکاؤنٹ کیلکولیٹر' },
  { href: '/gpa-calculator', icon: ICONS.gpa, en: 'GPA Calculator', ur: 'جی پی اے کیلکولیٹر' },
]

export default function Drawer({ open, onClose }) {
  const { lang, setLang } = useLanguage()

  // Bug fix: agar screen mobile se desktop width pe resize ho jaye
  // to drawer khud band ho jaye, desktop pe atka na rahe.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 780 && open) {
        onClose()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open, onClose])

  return (
    <>
      <div className={'drawer-overlay' + (open ? ' open' : '')} onClick={onClose}></div>
      <div className={'drawer' + (open ? ' open' : '')}>
        <div className="drawer-header">
          <Link to="/" className="logo" onClick={onClose}>
            <img src="/image/Toolkit_pk.png" alt="ToolKitPK" className="logo-icon" />
            <span className="logo-text">ToolKitPK</span>
          </Link>
          <button className="drawer-close" onClick={onClose} aria-label="Close menu">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="drawer-lang-row">
          <div className="lang-toggle">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>English</button>
            <button className={lang === 'ur' ? 'active' : ''} onClick={() => setLang('ur')}>اردو</button>
          </div>
        </div>

        <div className="drawer-links">
          <Link to="/" onClick={onClose}>
            <span className="ico"><img src={ICONS.house} alt="" className="ico-img" loading="lazy" /></span>
            <span className="en-only">Home</span>
            <span className="ur-only ur-text">ہوم</span>
          </Link>
          <div className="drawer-section-label">
            <span className="en-only">Tools</span>
            <span className="ur-only ur-text">ٹولز</span>
          </div>
          {TOOLS.map((t) => (
            <Link key={t.href} to={t.href} onClick={onClose}>
              <span className="ico">
                <img src={t.icon} alt="" className="ico-img" loading="lazy" />
              </span>
              <span className="en-only">{t.en}</span>
              <span className="ur-only ur-text">{t.ur}</span>
            </Link>
          ))}
          <div className="drawer-divider"></div>
          <Link to="/about" onClick={onClose}>
            <span className="ico"><img src={ICONS.info} alt="" className="ico-img" loading="lazy" /></span>
            <span className="en-only">About</span>
            <span className="ur-only ur-text">ہمارے بارے میں</span>
          </Link>
          <Link to="/contact" onClick={onClose}>
            <span className="ico"><img src={ICONS.envelope} alt="" className="ico-img" loading="lazy" /></span>
            <span className="en-only">Contact</span>
            <span className="ur-only ur-text">رابطہ</span>
          </Link>
          <Link to="/privacy-policy" onClick={onClose}>
            <span className="ico"><img src={ICONS.locked} alt="" className="ico-img" loading="lazy" /></span>
            <span className="en-only">Privacy Policy</span>
            <span className="ur-only ur-text">پرائیویسی پالیسی</span>
          </Link>
          <Link to="/terms-of-service" onClick={onClose}>
            <span className="ico"><img src={ICONS.page} alt="" className="ico-img" loading="lazy" /></span>
            <span className="en-only">Terms of Service</span>
            <span className="ur-only ur-text">شرائط و ضوابط</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export { TOOLS }