import { Link } from 'react-router-dom'
import TypeText from '../components/TypeText.jsx'

const TYPE_WORDS_EN = ['Zakat', 'Currency', 'Loan / EMI', 'Salary Tax', 'BMI', 'Age', 'Percentage', 'Unit', 'Discount', 'GPA']
const TYPE_WORDS_UR = ['زکوٰۃ', 'کرنسی', 'قرض / قسط', 'تنخواہ ٹیکس', 'بی ایم آئی', 'عمر', 'فیصد', 'یونٹ', 'ڈسکاؤنٹ', 'جی پی اے']

/* 3D icon set — same visual family as the header logo (Fluent 3D emoji) */
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
}

const TOOLS = [
  { href: '/zakat-calculator', en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر', enDesc: 'Calculate your annual Zakat on gold, silver, and cash.', urDesc: 'سونے، چاندی اور نقدی پر اپنی سالانہ زکوٰۃ کا حساب لگائیں۔', icon: ICONS.zakat, glow: 'glow-teal' },
  { href: '/currency-converter', en: 'Currency Converter', ur: 'کرنسی کنورٹر', enDesc: 'Convert PKR to USD and other currencies.', urDesc: 'پاکستانی روپے کو ڈالر اور دیگر کرنسیوں میں تبدیل کریں۔', icon: ICONS.currency, glow: 'glow-blue' },
  { href: '/loan-calculator', en: 'Loan / EMI Calculator', ur: 'قرض / قسط کیلکولیٹر', enDesc: 'Work out your monthly loan installments.', urDesc: 'اپنی ماہانہ قرض کی اقساط معلوم کریں۔', icon: ICONS.loan, glow: 'glow-amber' },
  { href: '/salary-tax-calculator', en: 'Salary Tax Calculator', ur: 'تنخواہ ٹیکس کیلکولیٹر', enDesc: 'Estimate your income tax as per Pakistan tax slabs.', urDesc: 'پاکستان کے ٹیکس سلیبز کے مطابق اپنا انکم ٹیکس معلوم کریں۔', icon: ICONS.tax, glow: 'glow-rose' },
  { href: '/bmi-calculator', en: 'BMI Calculator', ur: 'بی ایم آئی کیلکولیٹر', enDesc: 'Check your Body Mass Index instantly.', urDesc: 'اپنا باڈی ماس انڈیکس فوری چیک کریں۔', icon: ICONS.bmi, glow: 'glow-teal' },
  { href: '/age-calculator', en: 'Age Calculator', ur: 'عمر کیلکولیٹر', enDesc: 'Find your exact age in years, months, and days.', urDesc: 'اپنی صحیح عمر سال، مہینے اور دن میں معلوم کریں۔', icon: ICONS.age, glow: 'glow-blue' },
  { href: '/percentage-calculator', en: 'Percentage Calculator', ur: 'فیصد کیلکولیٹر', enDesc: 'Quickly calculate percentages and changes.', urDesc: 'فیصد اور تبدیلیوں کا فوری حساب لگائیں۔', icon: ICONS.percentage, glow: 'glow-violet' },
  { href: '/unit-converter', en: 'Unit Converter', ur: 'یونٹ کنورٹر', enDesc: 'Convert length, weight, and temperature units.', urDesc: 'لمبائی، وزن اور درجہ حرارت کی اکائیاں تبدیل کریں۔', icon: ICONS.unit, glow: 'glow-amber' },
  { href: '/discount-calculator', en: 'Discount Calculator', ur: 'ڈسکاؤنٹ کیلکولیٹر', enDesc: 'Find sale prices and amount saved.', urDesc: 'سیل کی قیمت اور بچت کی رقم معلوم کریں۔', icon: ICONS.discount, glow: 'glow-rose' },
  { href: '/gpa-calculator', en: 'GPA Calculator', ur: 'جی پی اے کیلکولیٹر', enDesc: 'Convert percentage to CGPA/GPA.', urDesc: 'فیصد کو سی جی پی اے/جی پی اے میں تبدیل کریں۔', icon: ICONS.gpa, glow: 'glow-violet' },
]

const TRUST_EN = [
  { icon: '✓', text: '100% Free' },
  { icon: '⚡', text: 'Instant Results' },
  { icon: '🔒', text: 'No Sign-up Needed' },
  { icon: '🇵🇰', text: 'Made for Pakistan' },
]
const TRUST_UR = [
  { icon: '✓', text: '100% مفت' },
  { icon: '⚡', text: 'فوری نتائج' },
  { icon: '🔒', text: 'رجسٹریشن کی ضرورت نہیں' },
  { icon: '🇵🇰', text: 'پاکستان کے لیے بنایا گیا' },
]

export default function Home() {
  return (
    <div>
      <section className="hero hero-premium">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <span className="hero-kicker en-only">Pakistan's #1 Free Calculator Suite</span>
        <span className="hero-kicker ur-only ur-text">پاکستان کی نمبر 1 مفت کیلکولیٹر سائٹ</span>

        <h1 className="en-only">Free Online <TypeText words={TYPE_WORDS_EN} /> Calculators for Pakistan</h1>
        <h1 className="ur-only ur-text">پاکستان کے لیے مفت آن لائن <TypeText words={TYPE_WORDS_UR} /> کیلکولیٹرز</h1>
        <p className="en-only">Simple, fast, and accurate tools — Zakat, Loan, Tax, Currency, and more. No sign-up needed.</p>
        <p className="ur-only ur-text">آسان، تیز اور درست ٹولز — زکوٰۃ، قرض، ٹیکس، کرنسی اور مزید۔ کسی رجسٹریشن کی ضرورت نہیں۔</p>

        <div className="trust-row en-only">
          {TRUST_EN.map((t) => (
            <span className="trust-pill" key={t.text}><span className="trust-ico">{t.icon}</span>{t.text}</span>
          ))}
        </div>
        <div className="trust-row ur-only ur-text">
          {TRUST_UR.map((t) => (
            <span className="trust-pill" key={t.text}><span className="trust-ico">{t.icon}</span>{t.text}</span>
          ))}
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-section-head">
          <span className="tools-kicker en-only">Explore</span>
          <span className="tools-kicker ur-only ur-text">دریافت کریں</span>
          <h2 className="en-only">All Calculators</h2>
          <h2 className="ur-only ur-text">تمام کیلکولیٹرز</h2>
        </div>

        <div className="tool-grid tool-grid-premium">
          {TOOLS.map((t, idx) => (
            <Link className="tool-card tool-card-premium" to={t.href} key={t.href} style={{ animationDelay: `${idx * 0.04}s` }}>
              <div className={`tool-icon-badge ${t.glow}`}>
                <img src={t.icon} alt="" className="tool-icon-img" loading="lazy" />
              </div>
              <h2 className="en-only">{t.en}</h2>
              <h2 className="ur-only ur-text">{t.ur}</h2>
              <p className="en-only">{t.enDesc}</p>
              <p className="ur-only ur-text">{t.urDesc}</p>
              <span className="tool-card-arrow en-only" aria-hidden="true"></span>
              <span className="tool-card-arrow ur-only" aria-hidden="true"></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}