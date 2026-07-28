import { Link } from 'react-router-dom'

/* Same 5 groups as Header.jsx / Drawer.jsx / Home.jsx, so every nav
   surface on the site agrees on how the 20 tools are organised. */
const CATEGORIES = [
  {
    key: 'islamic', glow: 'glow-teal', en: 'Islamic', ur: 'اسلامی',
    tools: [
      { href: '/zakat-calculator', en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر' },
      { href: '/namaz-timings', en: 'Namaz Timings', ur: 'نماز کے اوقات' },
      { href: '/islamic-date-converter', en: 'Islamic Date Converter', ur: 'اسلامی تاریخ کنورٹر' },
    ],
  },
  {
    key: 'finance', glow: 'glow-blue', en: 'Finance', ur: 'فنانس',
    tools: [
      { href: '/currency-converter', en: 'Currency Converter', ur: 'کرنسی کنورٹر' },
      { href: '/compound-interest-calculator', en: 'Compound Interest', ur: 'کمپاؤنڈ انٹرسٹ' },
      { href: '/salary-tax-calculator', en: 'Salary Tax Calculator', ur: 'تنخواہ ٹیکس کیلکولیٹر' },
      { href: '/discount-calculator', en: 'Discount Calculator', ur: 'ڈسکاؤنٹ کیلکولیٹر' },
    ],
  },
  {
    key: 'bills', glow: 'glow-amber', en: 'Loans & Bills', ur: 'قرض اور بلز',
    tools: [
      { href: '/loan-calculator', en: 'Loan / EMI Calculator', ur: 'قرض / قسط کیلکولیٹر' },
      { href: '/electricity-bill-calculator', en: 'Electricity Bill Estimator', ur: 'بجلی بل تخمینہ' },
      { href: '/fuel-cost-calculator', en: 'Petrol / Fuel Cost', ur: 'پیٹرول لاگت کیلکولیٹر' },
    ],
  },
  {
    key: 'utility', glow: 'glow-violet', en: 'Utility', ur: 'یوٹیلیٹی',
    tools: [
      { href: '/unit-converter', en: 'Unit Converter', ur: 'یونٹ کنورٹر' },
      { href: '/percentage-calculator', en: 'Percentage Calculator', ur: 'فیصد کیلکولیٹر' },
      { href: '/gpa-calculator', en: 'GPA Calculator', ur: 'جی پی اے کیلکولیٹر' },
      { href: '/word-counter', en: 'Word & Character Counter', ur: 'ورڈ کاؤنٹر' },
      { href: '/password-generator', en: 'Password Generator', ur: 'پاسورڈ جنریٹر' },
    ],
  },
  {
    key: 'health', glow: 'glow-rose', en: 'Health & Life', ur: 'صحت اور زندگی',
    tools: [
      { href: '/bmi-calculator', en: 'BMI Calculator', ur: 'بی ایم آئی کیلکولیٹر' },
      { href: '/calorie-calculator', en: 'Calorie / BMR Calculator', ur: 'کیلوری کیلکولیٹر' },
      { href: '/age-calculator', en: 'Age Calculator', ur: 'عمر کیلکولیٹر' },
      { href: '/pregnancy-due-date-calculator', en: 'Pregnancy Due Date', ur: 'حمل کی تاریخ' },
      { href: '/date-countdown-calculator', en: 'Date Countdown', ur: 'تاریخ کاؤنٹ ڈاؤن' },
    ],
  },
]

const COMPANY_LINKS = [
  { href: '/about', en: 'About', ur: 'ہمارے بارے میں' },
  { href: '/contact', en: 'Contact', ur: 'رابطہ' },
  { href: '/privacy-policy', en: 'Privacy Policy', ur: 'پرائیویسی پالیسی' },
  { href: '/terms-of-service', en: 'Terms of Service', ur: 'شرائط و ضوابط' },
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
          <p className="footer-tagline en-only">
            Free, fast, and accurate online calculators built for Pakistan — 20 tools across Islamic, Finance, Bills, Utility, and Health, with no sign-up required.
          </p>
          <p className="footer-tagline ur-only ur-text">
            پاکستان کے لیے بنائے گئے 20 مفت، تیز اور درست آن لائن کیلکولیٹرز — اسلامی، مالیات، بلز، یوٹیلیٹی اور صحت کے شعبوں میں، بغیر کسی رجسٹریشن کے۔
          </p>
          <span className="footer-made-badge">🇵🇰 <span className="en-only">Made for Pakistan</span><span className="ur-only ur-text">پاکستان کے لیے بنایا گیا</span></span>
        </div>

        {CATEGORIES.map((cat) => (
          <div className="footer-link-col" key={cat.key}>
            <div className="footer-col-title">
              <span className={`footer-col-dot ${cat.glow}`}></span>
              <span className="en-only">{cat.en}</span>
              <span className="ur-only ur-text">{cat.ur}</span>
            </div>
            {cat.tools.map((t) => (
              <Link key={t.href} to={t.href}>
                <span className="en-only">{t.en}</span>
                <span className="ur-only ur-text">{t.ur}</span>
              </Link>
            ))}
          </div>
        ))}

        <div className="footer-link-col">
          <div className="footer-col-title">
            <span className="en-only">Company</span>
            <span className="ur-only ur-text">کمپنی</span>
          </div>
          {COMPANY_LINKS.map((l) => (
            <Link key={l.href} to={l.href}>
              <span className="en-only">{l.en}</span>
              <span className="ur-only ur-text">{l.ur}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-bottom footer-bottom-premium">
        <span className="en-only">© 2026 ToolKitPK. All rights reserved.</span>
        <span className="ur-only ur-text">© 2026 ٹول کٹ پی کے۔ جملہ حقوق محفوظ ہیں۔</span>
      </div>
    </footer>
  )
}