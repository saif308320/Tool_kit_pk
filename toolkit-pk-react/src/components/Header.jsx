import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

const ICON_BASE = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets'
const ICONS = {
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
  namaz: `${ICON_BASE}/Mosque/3D/mosque_3d.png`,
  islamicDate: `${ICON_BASE}/Crescent%20moon/3D/crescent_moon_3d.png`,
  electricity: `${ICON_BASE}/High%20voltage/3D/high_voltage_3d.png`,
  fuel: `${ICON_BASE}/Fuel%20pump/3D/fuel_pump_3d.png`,
  interest: `${ICON_BASE}/Chart%20increasing/3D/chart_increasing_3d.png`,
  countdown: `${ICON_BASE}/Alarm%20clock/3D/alarm_clock_3d.png`,
  pregnancy: `${ICON_BASE}/Baby%20bottle/3D/baby_bottle_3d.png`,
  wordCounter: `${ICON_BASE}/Memo/3D/memo_3d.png`,
  password: `${ICON_BASE}/Locked/3D/locked_3d.png`,
  calorie: `${ICON_BASE}/Fire/3D/fire_3d.png`,
}

const NAV_CATEGORIES = [
  {
    key: 'islamic',
    en: 'Islamic', ur: 'اسلامی',
    tools: [
      { href: '/zakat-calculator', en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر', icon: ICONS.zakat, ready: true },
      { href: '/namaz-timings', en: 'Namaz Timings', ur: 'نماز کے اوقات', icon: ICONS.namaz, ready: false },
      { href: '/islamic-date-converter', en: 'Islamic Date Converter', ur: 'اسلامی تاریخ کنورٹر', icon: ICONS.islamicDate, ready: false },
    ],
  },
  {
    key: 'finance',
    en: 'Finance', ur: 'فنانس',
    tools: [
      { href: '/currency-converter', en: 'Currency Converter', ur: 'کرنسی کنورٹر', icon: ICONS.currency, ready: true },
      { href: '/compound-interest-calculator', en: 'Compound Interest', ur: 'کمپاؤنڈ انٹرسٹ', icon: ICONS.interest, ready: false },
      { href: '/salary-tax-calculator', en: 'Salary Tax Calculator', ur: 'تنخواہ ٹیکس کیلکولیٹر', icon: ICONS.tax, ready: true },
      { href: '/discount-calculator', en: 'Discount Calculator', ur: 'ڈسکاؤنٹ کیلکولیٹر', icon: ICONS.discount, ready: true },
    ],
  },
  {
    key: 'bills',
    en: 'Loans & Bills', ur: 'قرض اور بلز',
    tools: [
      { href: '/loan-calculator', en: 'Loan / EMI Calculator', ur: 'قرض / قسط کیلکولیٹر', icon: ICONS.loan, ready: true },
      { href: '/electricity-bill-calculator', en: 'Electricity Bill Estimator', ur: 'بجلی بل تخمینہ', icon: ICONS.electricity, ready: false },
      { href: '/fuel-cost-calculator', en: 'Petrol / Fuel Cost', ur: 'پیٹرول لاگت کیلکولیٹر', icon: ICONS.fuel, ready: false },
    ],
  },
  {
    key: 'utility',
    en: 'Utility', ur: 'یوٹیلیٹی',
    tools: [
      { href: '/unit-converter', en: 'Unit Converter', ur: 'یونٹ کنورٹر', icon: ICONS.unit, ready: true },
      { href: '/percentage-calculator', en: 'Percentage Calculator', ur: 'فیصد کیلکولیٹر', icon: ICONS.percentage, ready: true },
      { href: '/gpa-calculator', en: 'GPA Calculator', ur: 'جی پی اے کیلکولیٹر', icon: ICONS.gpa, ready: true },
      { href: '/word-counter', en: 'Word & Character Counter', ur: 'ورڈ کاؤنٹر', icon: ICONS.wordCounter, ready: false },
      { href: '/password-generator', en: 'Password Generator', ur: 'پاسورڈ جنریٹر', icon: ICONS.password, ready: false },
    ],
  },
  {
    key: 'health',
    en: 'Health & Life', ur: 'صحت اور زندگی',
    tools: [
      { href: '/bmi-calculator', en: 'BMI Calculator', ur: 'بی ایم آئی کیلکولیٹر', icon: ICONS.bmi, ready: true },
      { href: '/calorie-calculator', en: 'Calorie / BMR Calculator', ur: 'کیلوری کیلکولیٹر', icon: ICONS.calorie, ready: false },
      { href: '/age-calculator', en: 'Age Calculator', ur: 'عمر کیلکولیٹر', icon: ICONS.age, ready: true },
      { href: '/pregnancy-due-date-calculator', en: 'Pregnancy Due Date', ur: 'حمل کی تاریخ', icon: ICONS.pregnancy, ready: false },
      { href: '/date-countdown-calculator', en: 'Date Countdown', ur: 'تاریخ کاؤنٹ ڈاؤن', icon: ICONS.countdown, ready: false },
    ],
  },
]

export default function Header({ onMenuClick, menuOpen }) {
  const { lang, setLang } = useLanguage()
  const [openKey, setOpenKey] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenKey(null)
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpenKey(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header>
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/image/Toolkit_pk.png" alt="ToolKitPK" className="logo-icon" />
          <span className="logo-text">ToolKitPK</span>
        </Link>

        <nav className="top-nav mega-nav" ref={navRef}>
          {NAV_CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className={`mega-item ${openKey === cat.key ? 'open' : ''}`}
              onMouseEnter={() => setOpenKey(cat.key)}
              onMouseLeave={() => setOpenKey(null)}
            >
              <button
                type="button"
                className="mega-trigger"
                onClick={() => setOpenKey(openKey === cat.key ? null : cat.key)}
                aria-expanded={openKey === cat.key}
              >
                <span className="en-only">{cat.en}</span>
                <span className="ur-only ur-text">{cat.ur}</span>
                <svg className="mega-chev" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="mega-panel">
                <div className="mega-panel-inner">
                  {cat.tools.map((t) => (
                    t.ready ? (
                      <Link key={t.href} to={t.href} className="mega-tool" onClick={() => setOpenKey(null)}>
                        <img src={t.icon} alt="" className="mega-tool-icon" loading="lazy" />
                        <span className="en-only">{t.en}</span>
                        <span className="ur-only ur-text">{t.ur}</span>
                      </Link>
                    ) : (
                      <div key={t.href} className="mega-tool mega-tool-soon">
                        <img src={t.icon} alt="" className="mega-tool-icon" loading="lazy" />
                        <span className="en-only">{t.en}</span>
                        <span className="ur-only ur-text">{t.ur}</span>
                        <span className="soon-badge en-only">Soon</span>
                        <span className="soon-badge ur-only ur-text">جلد</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-toggle lang-toggle-desktop">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>English</button>
            <button className={lang === 'ur' ? 'active' : ''} onClick={() => setLang('ur')}>اردو</button>
          </div>
          <button
            className={'hamburger-btn' + (menuOpen ? ' open' : '')}
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}