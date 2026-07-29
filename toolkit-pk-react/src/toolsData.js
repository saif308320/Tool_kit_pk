// Central list of every tool on the site — single source of truth.
// Reused by Home.jsx (popular/recent), RelatedCalculators, Breadcrumb,
// and the visit-tracking hook. Keep this in sync with App.jsx routes
// and seoData.js keys (the `seoKey` field maps to seoData.js).

const ICON_BASE = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets'

export const TOOLS = [
  // Islamic
  { href: '/zakat-calculator', seoKey: 'zakat', category: 'islamic', glow: 'glow-teal',
    en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر', icon: `${ICON_BASE}/Money%20bag/3D/money_bag_3d.png` },
  { href: '/namaz-timings', seoKey: 'namaz', category: 'islamic', glow: 'glow-teal',
    en: 'Namaz Timings', ur: 'نماز کے اوقات', icon: `${ICON_BASE}/Mosque/3D/mosque_3d.png` },
  { href: '/islamic-date-converter', seoKey: 'islamicDate', category: 'islamic', glow: 'glow-teal',
    en: 'Islamic Date Converter', ur: 'اسلامی تاریخ کنورٹر', icon: `${ICON_BASE}/Crescent%20moon/3D/crescent_moon_3d.png` },

  // Finance
  { href: '/currency-converter', seoKey: 'currency', category: 'finance', glow: 'glow-blue',
    en: 'Currency Converter', ur: 'کرنسی کنورٹر', icon: `${ICON_BASE}/Currency%20exchange/3D/currency_exchange_3d.png` },
  { href: '/compound-interest-calculator', seoKey: 'compoundInterest', category: 'finance', glow: 'glow-blue',
    en: 'Compound Interest', ur: 'کمپاؤنڈ انٹرسٹ', icon: `${ICON_BASE}/Chart%20increasing/3D/chart_increasing_3d.png` },
  { href: '/salary-tax-calculator', seoKey: 'tax', category: 'finance', glow: 'glow-blue',
    en: 'Salary Tax Calculator', ur: 'تنخواہ ٹیکس کیلکولیٹر', icon: `${ICON_BASE}/Receipt/3D/receipt_3d.png` },
  { href: '/discount-calculator', seoKey: 'discount', category: 'finance', glow: 'glow-blue',
    en: 'Discount Calculator', ur: 'ڈسکاؤنٹ کیلکولیٹر', icon: `${ICON_BASE}/Label/3D/label_3d.png` },

  // Loans & Bills
  { href: '/loan-calculator', seoKey: 'loan', category: 'bills', glow: 'glow-amber',
    en: 'Loan / EMI Calculator', ur: 'قرض / قسط کیلکولیٹر', icon: `${ICON_BASE}/Bank/3D/bank_3d.png` },
  { href: '/electricity-bill-calculator', seoKey: 'electricityBill', category: 'bills', glow: 'glow-amber',
    en: 'Electricity Bill Estimator', ur: 'بجلی بل تخمینہ', icon: `${ICON_BASE}/High%20voltage/3D/high_voltage_3d.png` },
  { href: '/fuel-cost-calculator', seoKey: 'fuelCost', category: 'bills', glow: 'glow-amber',
    en: 'Petrol / Fuel Cost', ur: 'پیٹرول لاگت کیلکولیٹر', icon: `${ICON_BASE}/Fuel%20pump/3D/fuel_pump_3d.png` },

  // Utility
  { href: '/unit-converter', seoKey: 'unitConverter', category: 'utility', glow: 'glow-violet',
    en: 'Unit Converter', ur: 'یونٹ کنورٹر', icon: `${ICON_BASE}/Straight%20ruler/3D/straight_ruler_3d.png` },
  { href: '/percentage-calculator', seoKey: 'percentage', category: 'utility', glow: 'glow-violet',
    en: 'Percentage Calculator', ur: 'فیصد کیلکولیٹر', icon: `${ICON_BASE}/Bar%20chart/3D/bar_chart_3d.png` },
  { href: '/gpa-calculator', seoKey: 'gpa', category: 'utility', glow: 'glow-violet',
    en: 'GPA Calculator', ur: 'جی پی اے کیلکولیٹر', icon: `${ICON_BASE}/Graduation%20cap/3D/graduation_cap_3d.png` },
  { href: '/word-counter', seoKey: 'wordCounter', category: 'utility', glow: 'glow-violet',
    en: 'Word & Character Counter', ur: 'ورڈ کاؤنٹر', icon: `${ICON_BASE}/Memo/3D/memo_3d.png` },
  { href: '/password-generator', seoKey: 'passwordGenerator', category: 'utility', glow: 'glow-violet',
    en: 'Password Generator', ur: 'پاسورڈ جنریٹر', icon: `${ICON_BASE}/Locked/3D/locked_3d.png` },

  // Health & Life
  { href: '/bmi-calculator', seoKey: 'bmi', category: 'health', glow: 'glow-rose',
    en: 'BMI Calculator', ur: 'بی ایم آئی کیلکولیٹر', icon: `${ICON_BASE}/Balance%20scale/3D/balance_scale_3d.png` },
  { href: '/calorie-calculator', seoKey: 'calorie', category: 'health', glow: 'glow-rose',
    en: 'Calorie / BMR Calculator', ur: 'کیلوری کیلکولیٹر', icon: `${ICON_BASE}/Fire/3D/fire_3d.png` },
  { href: '/age-calculator', seoKey: 'age', category: 'health', glow: 'glow-rose',
    en: 'Age Calculator', ur: 'عمر کیلکولیٹر', icon: `${ICON_BASE}/Hourglass%20not%20done/3D/hourglass_not_done_3d.png` },
  { href: '/pregnancy-due-date-calculator', seoKey: 'pregnancy', category: 'health', glow: 'glow-rose',
    en: 'Pregnancy Due Date', ur: 'حمل کی تاریخ', icon: `${ICON_BASE}/Baby%20bottle/3D/baby_bottle_3d.png` },
  { href: '/date-countdown-calculator', seoKey: 'dateCountdown', category: 'health', glow: 'glow-rose',
    en: 'Date Countdown', ur: 'تاریخ کاؤنٹ ڈاؤن', icon: `${ICON_BASE}/Alarm%20clock/3D/alarm_clock_3d.png` },
]

// Curated fallback order for first-time visitors (before any real click
// data exists in localStorage) — highest-search-intent tools for Pakistan.
export const CURATED_POPULAR_HREFS = [
  '/zakat-calculator',
  '/namaz-timings',
  '/age-calculator',
  '/loan-calculator',
]

export function getToolByHref(href) {
  return TOOLS.find((t) => t.href === href)
}

export function getRelatedTools(currentHref, count = 3) {
  const current = getToolByHref(currentHref)
  if (!current) return []
  const sameCategory = TOOLS.filter((t) => t.category === current.category && t.href !== currentHref)
  return sameCategory.slice(0, count)
}