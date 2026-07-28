import { Link } from 'react-router-dom'
import TypeText from '../components/TypeText.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const TYPE_WORDS_EN = ['Zakat', 'Currency', 'Loan / EMI', 'Salary Tax', 'BMI', 'Age', 'Percentage', 'Unit', 'Discount', 'GPA']
const TYPE_WORDS_UR = ['زکوٰۃ', 'کرنسی', 'قرض / قسط', 'تنخواہ ٹیکس', 'بی ایم آئی', 'عمر', 'فیصد', 'یونٹ', 'ڈسکاؤنٹ', 'جی پی اے']

/* Same 3D icon set used across Header.jsx / Drawer.jsx — keeps every
   surface of the site (mega-menu, drawer, home cards) visually consistent */
const ICON_BASE = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets'
const ICONS = {
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
}

/* Same 5 groups as the header mega-menu, so the whole site uses one
   consistent taxonomy instead of a different grouping on every page. */
const CATEGORIES = [
  {
    key: 'islamic', glow: 'glow-teal', en: 'Islamic', ur: 'اسلامی',
    tools: [
      { href: '/zakat-calculator', icon: ICONS.zakat, en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر', enDesc: 'Calculate your annual Zakat on gold, silver, and cash.', urDesc: 'سونے، چاندی اور نقدی پر اپنی سالانہ زکوٰۃ کا حساب لگائیں۔' },
      { href: '/namaz-timings', icon: ICONS.namaz, en: 'Namaz Timings', ur: 'نماز کے اوقات', enDesc: 'Get accurate prayer timings for your city.', urDesc: 'اپنے شہر کے لیے نماز کے درست اوقات معلوم کریں۔' },
      { href: '/islamic-date-converter', icon: ICONS.islamicDate, en: 'Islamic Date Converter', ur: 'اسلامی تاریخ کنورٹر', enDesc: 'Convert Gregorian dates to the Islamic Hijri calendar.', urDesc: 'عیسوی تاریخ کو ہجری تاریخ میں تبدیل کریں۔' },
    ],
  },
  {
    key: 'finance', glow: 'glow-blue', en: 'Finance', ur: 'فنانس',
    tools: [
      { href: '/currency-converter', icon: ICONS.currency, en: 'Currency Converter', ur: 'کرنسی کنورٹر', enDesc: 'Convert PKR to USD and other currencies.', urDesc: 'پاکستانی روپے کو ڈالر اور دیگر کرنسیوں میں تبدیل کریں۔' },
      { href: '/compound-interest-calculator', icon: ICONS.interest, en: 'Compound Interest', ur: 'کمپاؤنڈ انٹرسٹ', enDesc: 'See how your savings grow with compound interest over time.', urDesc: 'وقت کے ساتھ کمپاؤنڈ انٹرسٹ سے اپنی بچت کا اضافہ دیکھیں۔' },
      { href: '/salary-tax-calculator', icon: ICONS.tax, en: 'Salary Tax Calculator', ur: 'تنخواہ ٹیکس کیلکولیٹر', enDesc: 'Estimate your income tax as per Pakistan tax slabs.', urDesc: 'پاکستان کے ٹیکس سلیبز کے مطابق اپنا انکم ٹیکس معلوم کریں۔' },
      { href: '/discount-calculator', icon: ICONS.discount, en: 'Discount Calculator', ur: 'ڈسکاؤنٹ کیلکولیٹر', enDesc: 'Find sale prices and amount saved.', urDesc: 'سیل کی قیمت اور بچت کی رقم معلوم کریں۔' },
    ],
  },
  {
    key: 'bills', glow: 'glow-amber', en: 'Loans & Bills', ur: 'قرض اور بلز',
    tools: [
      { href: '/loan-calculator', icon: ICONS.loan, en: 'Loan / EMI Calculator', ur: 'قرض / قسط کیلکولیٹر', enDesc: 'Work out your monthly loan installments.', urDesc: 'اپنی ماہانہ قرض کی اقساط معلوم کریں۔' },
      { href: '/electricity-bill-calculator', icon: ICONS.electricity, en: 'Electricity Bill Estimator', ur: 'بجلی بل تخمینہ', enDesc: 'Estimate your monthly electricity bill from your unit usage.', urDesc: 'یونٹس کے استعمال سے اپنے ماہانہ بجلی بل کا تخمینہ لگائیں۔' },
      { href: '/fuel-cost-calculator', icon: ICONS.fuel, en: 'Petrol / Fuel Cost', ur: 'پیٹرول لاگت کیلکولیٹر', enDesc: 'Work out how much your trip will cost in fuel.', urDesc: 'اپنے سفر کی پیٹرول لاگت معلوم کریں۔' },
    ],
  },
  {
    key: 'utility', glow: 'glow-violet', en: 'Utility', ur: 'یوٹیلیٹی',
    tools: [
      { href: '/unit-converter', icon: ICONS.unit, en: 'Unit Converter', ur: 'یونٹ کنورٹر', enDesc: 'Convert length, weight, and temperature units.', urDesc: 'لمبائی، وزن اور درجہ حرارت کی اکائیاں تبدیل کریں۔' },
      { href: '/percentage-calculator', icon: ICONS.percentage, en: 'Percentage Calculator', ur: 'فیصد کیلکولیٹر', enDesc: 'Quickly calculate percentages and changes.', urDesc: 'فیصد اور تبدیلیوں کا فوری حساب لگائیں۔' },
      { href: '/gpa-calculator', icon: ICONS.gpa, en: 'GPA Calculator', ur: 'جی پی اے کیلکولیٹر', enDesc: 'Convert percentage to CGPA/GPA.', urDesc: 'فیصد کو سی جی پی اے/جی پی اے میں تبدیل کریں۔' },
      { href: '/word-counter', icon: ICONS.wordCounter, en: 'Word & Character Counter', ur: 'ورڈ کاؤنٹر', enDesc: 'Count words, characters, and reading time instantly.', urDesc: 'الفاظ، حروف اور پڑھنے کا وقت فوری شمار کریں۔' },
      { href: '/password-generator', icon: ICONS.password, en: 'Password Generator', ur: 'پاسورڈ جنریٹر', enDesc: 'Create strong, random passwords in one click.', urDesc: 'ایک کلک میں مضبوط، رینڈم پاسورڈ بنائیں۔' },
    ],
  },
  {
    key: 'health', glow: 'glow-rose', en: 'Health & Life', ur: 'صحت اور زندگی',
    tools: [
      { href: '/bmi-calculator', icon: ICONS.bmi, en: 'BMI Calculator', ur: 'بی ایم آئی کیلکولیٹر', enDesc: 'Check your Body Mass Index instantly.', urDesc: 'اپنا باڈی ماس انڈیکس فوری چیک کریں۔' },
      { href: '/calorie-calculator', icon: ICONS.calorie, en: 'Calorie / BMR Calculator', ur: 'کیلوری کیلکولیٹر', enDesc: 'Find your daily calorie needs based on your body and activity.', urDesc: 'اپنے جسم اور سرگرمی کی بنیاد پر روزانہ کیلوریز کی ضرورت معلوم کریں۔' },
      { href: '/age-calculator', icon: ICONS.age, en: 'Age Calculator', ur: 'عمر کیلکولیٹر', enDesc: 'Find your exact age in years, months, and days.', urDesc: 'اپنی صحیح عمر سال، مہینے اور دن میں معلوم کریں۔' },
      { href: '/pregnancy-due-date-calculator', icon: ICONS.pregnancy, en: 'Pregnancy Due Date', ur: 'حمل کی تاریخ', enDesc: 'Estimate your expected delivery date from your last period.', urDesc: 'آخری ماہواری سے متوقع تاریخ پیدائش معلوم کریں۔' },
      { href: '/date-countdown-calculator', icon: ICONS.countdown, en: 'Date Countdown', ur: 'تاریخ کاؤنٹ ڈاؤن', enDesc: 'Count down the days to any important date.', urDesc: 'کسی بھی اہم تاریخ تک دنوں کی گنتی کریں۔' },
    ],
  },
]

const TOTAL_TOOLS = CATEGORIES.reduce((n, c) => n + c.tools.length, 0)

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

function ToolCard({ t, cat, idx }) {
  const { lang } = useLanguage()

  function shareOnWhatsApp(e) {
    e.preventDefault()
    e.stopPropagation()
    const url = `${window.location.origin}${t.href}`
    const label = lang === 'ur' ? t.ur : t.en
    const text = `${label} — ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <Link className="tool-card tool-card-premium" to={t.href} style={{ animationDelay: `${idx * 0.04}s` }}>
      <div className="tool-card-top">
        <div className={`tool-icon-badge ${cat.glow}`}>
          <img src={t.icon} alt="" className="tool-icon-img" loading="lazy" />
        </div>
        <span className={`tool-card-tag ${cat.glow} en-only`}>{cat.en}</span>
        <span className={`tool-card-tag ${cat.glow} ur-only ur-text`}>{cat.ur}</span>
      </div>
      <h2 className="en-only">{t.en}</h2>
      <h2 className="ur-only ur-text">{t.ur}</h2>
      <p className="en-only">{t.enDesc}</p>
      <p className="ur-only ur-text">{t.urDesc}</p>
      <div className="tool-card-footer">
        <span className="tool-card-cta en-only">
          Try now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
        <span className="tool-card-cta ur-only ur-text">
          ابھی آزمائیں
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
        <button type="button" className="tool-card-share" onClick={shareOnWhatsApp} aria-label="Share on WhatsApp" title="Share on WhatsApp">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91.01-5.46-4.44-9.91-9.9-9.91zm5.8 14.05c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.93 0-1.4.73-2.08 1-2.36.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.17.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.13.07.72-.17 1.4z"/>
          </svg>
        </button>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div>
      <section className="hero hero-premium">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <span className="hero-kicker en-only">Pakistan's #1 Free Calculator Suite — {TOTAL_TOOLS} Tools</span>
        <span className="hero-kicker ur-only ur-text">پاکستان کی نمبر 1 مفت کیلکولیٹر سائٹ — {TOTAL_TOOLS} ٹولز</span>

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
          <h2 className="en-only">All {TOTAL_TOOLS} Calculators</h2>
          <h2 className="ur-only ur-text">تمام {TOTAL_TOOLS} کیلکولیٹرز</h2>
        </div>

        {CATEGORIES.map((cat) => (
          <div className="tool-category-block" key={cat.key}>
            <div className="tool-category-head">
              <span className={`tool-category-dot ${cat.glow}`}></span>
              <h3 className="en-only">{cat.en}</h3>
              <h3 className="ur-only ur-text">{cat.ur}</h3>
            </div>
            <div className="tool-grid tool-grid-premium">
              {cat.tools.map((t, idx) => (
                <ToolCard t={t} cat={cat} idx={idx} key={t.href} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}