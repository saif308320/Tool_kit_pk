import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

/* Same 3D icon set as Header.jsx / Home.jsx — keeps every icon on the
   site (mega-menu, drawer, home cards) consistent */
const ICON_BASE = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets'
const ICONS = {
  house: `${ICON_BASE}/House/3D/house_3d.png`,
  zakat: `${ICON_BASE}/Money%20bag/3D/money_bag_3d.png`,
  namaz: `${ICON_BASE}/Mosque/3D/mosque_3d.png`,
  islamicDate: `${ICON_BASE}/Crescent%20moon/3D/crescent_moon_3d.png`,
  currency: `${ICON_BASE}/Currency%20exchange/3D/currency_exchange_3d.png`,
  interest: `${ICON_BASE}/Chart%20increasing/3D/chart_increasing_3d.png`,
  tax: `${ICON_BASE}/Receipt/3D/receipt_3d.png`,
  discount: `${ICON_BASE}/Label/3D/label_3d.png`,
  loan: `${ICON_BASE}/Bank/3D/bank_3d.png`,
  electricity: `${ICON_BASE}/High%20voltage/3D/high_voltage_3d.png`,
  fuel: `${ICON_BASE}/Fuel%20pump/3D/fuel_pump_3d.png`,
  unit: `${ICON_BASE}/Straight%20ruler/3D/straight_ruler_3d.png`,
  percentage: `${ICON_BASE}/Bar%20chart/3D/bar_chart_3d.png`,
  gpa: `${ICON_BASE}/Graduation%20cap/3D/graduation_cap_3d.png`,
  wordCounter: `${ICON_BASE}/Memo/3D/memo_3d.png`,
  password: `${ICON_BASE}/Locked/3D/locked_3d.png`,
  bmi: `${ICON_BASE}/Balance%20scale/3D/balance_scale_3d.png`,
  calorie: `${ICON_BASE}/Fire/3D/fire_3d.png`,
  age: `${ICON_BASE}/Hourglass%20not%20done/3D/hourglass_not_done_3d.png`,
  pregnancy: `${ICON_BASE}/Baby%20bottle/3D/baby_bottle_3d.png`,
  countdown: `${ICON_BASE}/Alarm%20clock/3D/alarm_clock_3d.png`,
  info: `${ICON_BASE}/Information/3D/information_3d.png`,
  envelope: `${ICON_BASE}/Envelope/3D/envelope_3d.png`,
  locked: `${ICON_BASE}/Locked/3D/locked_3d.png`,
  page: `${ICON_BASE}/Page%20facing%20up/3D/page_facing_up_3d.png`,
}

/* Same 5 groups as Header.jsx's mega-menu, so mobile and desktop
   nav always agree on how the 20 tools are organised. */
const CATEGORIES = [
  {
    key: 'islamic', en: 'Islamic', ur: 'اسلامی',
    tools: [
      { href: '/zakat-calculator', icon: ICONS.zakat, en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر' },
      { href: '/namaz-timings', icon: ICONS.namaz, en: 'Namaz Timings', ur: 'نماز کے اوقات' },
      { href: '/islamic-date-converter', icon: ICONS.islamicDate, en: 'Islamic Date Converter', ur: 'اسلامی تاریخ کنورٹر' },
    ],
  },
  {
    key: 'finance', en: 'Finance', ur: 'فنانس',
    tools: [
      { href: '/currency-converter', icon: ICONS.currency, en: 'Currency Converter', ur: 'کرنسی کنورٹر' },
      { href: '/compound-interest-calculator', icon: ICONS.interest, en: 'Compound Interest', ur: 'کمپاؤنڈ انٹرسٹ' },
      { href: '/salary-tax-calculator', icon: ICONS.tax, en: 'Salary Tax Calculator', ur: 'تنخواہ ٹیکس کیلکولیٹر' },
      { href: '/discount-calculator', icon: ICONS.discount, en: 'Discount Calculator', ur: 'ڈسکاؤنٹ کیلکولیٹر' },
    ],
  },
  {
    key: 'bills', en: 'Loans & Bills', ur: 'قرض اور بلز',
    tools: [
      { href: '/loan-calculator', icon: ICONS.loan, en: 'Loan / EMI Calculator', ur: 'قرض / قسط کیلکولیٹر' },
      { href: '/electricity-bill-calculator', icon: ICONS.electricity, en: 'Electricity Bill Estimator', ur: 'بجلی بل تخمینہ' },
      { href: '/fuel-cost-calculator', icon: ICONS.fuel, en: 'Petrol / Fuel Cost', ur: 'پیٹرول لاگت کیلکولیٹر' },
    ],
  },
  {
    key: 'utility', en: 'Utility', ur: 'یوٹیلیٹی',
    tools: [
      { href: '/unit-converter', icon: ICONS.unit, en: 'Unit Converter', ur: 'یونٹ کنورٹر' },
      { href: '/percentage-calculator', icon: ICONS.percentage, en: 'Percentage Calculator', ur: 'فیصد کیلکولیٹر' },
      { href: '/gpa-calculator', icon: ICONS.gpa, en: 'GPA Calculator', ur: 'جی پی اے کیلکولیٹر' },
      { href: '/word-counter', icon: ICONS.wordCounter, en: 'Word & Character Counter', ur: 'ورڈ کاؤنٹر' },
      { href: '/password-generator', icon: ICONS.password, en: 'Password Generator', ur: 'پاسورڈ جنریٹر' },
    ],
  },
  {
    key: 'health', en: 'Health & Life', ur: 'صحت اور زندگی',
    tools: [
      { href: '/bmi-calculator', icon: ICONS.bmi, en: 'BMI Calculator', ur: 'بی ایم آئی کیلکولیٹر' },
      { href: '/calorie-calculator', icon: ICONS.calorie, en: 'Calorie / BMR Calculator', ur: 'کیلوری کیلکولیٹر' },
      { href: '/age-calculator', icon: ICONS.age, en: 'Age Calculator', ur: 'عمر کیلکولیٹر' },
      { href: '/pregnancy-due-date-calculator', icon: ICONS.pregnancy, en: 'Pregnancy Due Date', ur: 'حمل کی تاریخ' },
      { href: '/date-countdown-calculator', icon: ICONS.countdown, en: 'Date Countdown', ur: 'تاریخ کاؤنٹ ڈاؤن' },
    ],
  },
]

export default function Drawer({ open, onClose }) {
  const { lang, setLang } = useLanguage()
  const [openCat, setOpenCat] = useState(null)

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

  // Drawer band hone par accordion ki state reset kar do, taake
  // agli baar khulay to har category collapsed state se shuru ho.
  useEffect(() => {
    if (!open) setOpenCat(null)
  }, [open])

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

          {CATEGORIES.map((cat) => {
            const isOpen = openCat === cat.key
            return (
              <div className={'drawer-accordion' + (isOpen ? ' open' : '')} key={cat.key}>
                <button
                  type="button"
                  className="drawer-accordion-trigger"
                  onClick={() => setOpenCat(isOpen ? null : cat.key)}
                  aria-expanded={isOpen}
                >
                  <span className="en-only">{cat.en}</span>
                  <span className="ur-only ur-text">{cat.ur}</span>
                  <svg className="drawer-accordion-chev" width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="drawer-accordion-panel">
                  <div className="drawer-accordion-panel-inner">
                    {cat.tools.map((t) => (
                      <Link key={t.href} to={t.href} onClick={onClose}>
                        <span className="ico">
                          <img src={t.icon} alt="" className="ico-img" loading="lazy" />
                        </span>
                        <span className="en-only">{t.en}</span>
                        <span className="ur-only ur-text">{t.ur}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}

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

export { CATEGORIES }