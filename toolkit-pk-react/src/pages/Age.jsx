import { useState } from 'react'
import Select from '../components/Select.jsx'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'How is age calculated in years, months, and days?',
    aEn: "The calculator subtracts your date of birth from today's date, accounting for varying month lengths and leap years, to give an exact breakdown in years, months, and days.",
    qUr: 'عمر سالوں، مہینوں اور دنوں میں کیسے شمار ہوتی ہے؟',
    aUr: 'یہ کیلکولیٹر آپ کی تاریخ پیدائش کو آج کی تاریخ سے منہا کرتا ہے، مہینوں کی مختلف لمبائی اور لیپ سال کو مدنظر رکھتے ہوئے سال، مہینے اور دن میں درست نتیجہ دیتا ہے۔',
  },
  {
    qEn: 'Why do I need an exact age calculation?',
    aEn: 'Job applications, university admissions, visa forms, and government documents in Pakistan often require your exact age in years, months, and days, not just years.',
    qUr: 'درست عمر کے حساب کی ضرورت کیوں پڑتی ہے؟',
    aUr: 'نوکری کی درخواستوں، داخلوں، ویزا فارمز اور سرکاری دستاویزات میں اکثر صرف سال نہیں بلکہ سال، مہینے اور دن میں درست عمر درکار ہوتی ہے۔',
  },
  {
    qEn: 'Does this calculator account for leap years?',
    aEn: 'Yes, the calculation automatically adjusts for leap years and different month lengths so the result stays accurate no matter what date range you enter.',
    qUr: 'کیا یہ کیلکولیٹر لیپ سال کو مدنظر رکھتا ہے؟',
    aUr: 'جی ہاں، یہ حساب خودکار طور پر لیپ سال اور مہینوں کی مختلف لمبائی کے مطابق ایڈجسٹ ہو جاتا ہے تاکہ نتیجہ ہمیشہ درست رہے۔',
  },
  {
    qEn: 'Can I calculate age as of a future or past date?',
    aEn: "Yes, you can set a custom 'as of' date instead of today to see what your age was, or will be, on any specific date.",
    qUr: 'کیا میں مستقبل یا ماضی کی کسی تاریخ تک عمر معلوم کر سکتا ہوں؟',
    aUr: 'جی ہاں، آپ آج کے بجائے کوئی اور تاریخ منتخب کر کے دیکھ سکتے ہیں کہ اس دن آپ کی عمر کتنی تھی یا ہوگی۔',
  },
]

const MONTHS = [
  { value: 1, en: 'January', ur: 'جنوری' },
  { value: 2, en: 'February', ur: 'فروری' },
  { value: 3, en: 'March', ur: 'مارچ' },
  { value: 4, en: 'April', ur: 'اپریل' },
  { value: 5, en: 'May', ur: 'مئی' },
  { value: 6, en: 'June', ur: 'جون' },
  { value: 7, en: 'July', ur: 'جولائی' },
  { value: 8, en: 'August', ur: 'اگست' },
  { value: 9, en: 'September', ur: 'ستمبر' },
  { value: 10, en: 'October', ur: 'اکتوبر' },
  { value: 11, en: 'November', ur: 'نومبر' },
  { value: 12, en: 'December', ur: 'دسمبر' },
]

const WEEKDAY_UR = { Sunday: 'اتوار', Monday: 'پیر', Tuesday: 'منگل', Wednesday: 'بدھ', Thursday: 'جمعرات', Friday: 'جمعہ', Saturday: 'ہفتہ' }

const ZODIAC = [
  { sign: 'Capricorn', ur: 'مکر', icon: '♑', from: [12, 22], to: [1, 19] },
  { sign: 'Aquarius', ur: 'دلو', icon: '♒', from: [1, 20], to: [2, 18] },
  { sign: 'Pisces', ur: 'حوت', icon: '♓', from: [2, 19], to: [3, 20] },
  { sign: 'Aries', ur: 'حمل', icon: '♈', from: [3, 21], to: [4, 19] },
  { sign: 'Taurus', ur: 'ثور', icon: '♉', from: [4, 20], to: [5, 20] },
  { sign: 'Gemini', ur: 'جوزا', icon: '♊', from: [5, 21], to: [6, 20] },
  { sign: 'Cancer', ur: 'سرطان', icon: '♋', from: [6, 21], to: [7, 22] },
  { sign: 'Leo', ur: 'اسد', icon: '♌', from: [7, 23], to: [8, 22] },
  { sign: 'Virgo', ur: 'سنبلہ', icon: '♍', from: [8, 23], to: [9, 22] },
  { sign: 'Libra', ur: 'میزان', icon: '♎', from: [9, 23], to: [10, 22] },
  { sign: 'Scorpio', ur: 'عقرب', icon: '♏', from: [10, 23], to: [11, 21] },
  { sign: 'Sagittarius', ur: 'قوس', icon: '♐', from: [11, 22], to: [12, 21] },
]

function getZodiac(month, day) {
  return ZODIAC.find((z) => {
    const [fm, fd] = z.from
    const [tm, td] = z.to
    if (fm === tm) return month === fm && day >= fd && day <= td
    if (fm > tm) return (month === fm && day >= fd) || (month === tm && day <= td)
    return (month === fm && day >= fd) || (month === tm && day <= td) || (month > fm && month < tm)
  })
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

const now = new Date()
const CURRENT_YEAR = now.getFullYear()
const YEAR_OPTIONS = Array.from({ length: 110 }, (_, i) => CURRENT_YEAR - i).map((y) => ({ value: y, label: String(y) }))
const MONTH_OPTIONS_EN = MONTHS.map((m) => ({ value: m.value, label: m.en }))
const MONTH_OPTIONS_UR = MONTHS.map((m) => ({ value: m.value, label: m.ur }))

export default function Age() {
  const [day, setDay] = useState(now.getDate())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(CURRENT_YEAR - 25)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const maxDay = daysInMonth(year, month)
  const dayOptions = Array.from({ length: maxDay }, (_, i) => ({ value: i + 1, label: String(i + 1) }))

  function handleDayChange(v) { setDay(Math.min(v, maxDay)) }
  function handleMonthChange(v) { setMonth(v); if (day > daysInMonth(year, v)) setDay(daysInMonth(year, v)) }
  function handleYearChange(v) { setYear(v); if (day > daysInMonth(v, month)) setDay(daysInMonth(v, month)) }

  function calculate() {
    setError(null)
    const birth = new Date(year, month - 1, day)
    const today = new Date()
    if (birth > today) {
      setError({ en: 'Please choose a date in the past.', ur: 'براہ کرم ماضی کی تاریخ منتخب کریں۔' })
      setResult(null)
      return
    }

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months -= 1
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += lastMonth.getDate()
    }
    if (months < 0) { years -= 1; months += 12 }

    const msInDay = 1000 * 60 * 60 * 24
    const totalDays = Math.floor((today - birth) / msInDay)
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months
    const totalHours = totalDays * 24

    let nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBday < today) nextBday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate())
    const daysToNext = Math.ceil((nextBday - today) / msInDay)

    let lastBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (lastBday > today) lastBday = new Date(today.getFullYear() - 1, birth.getMonth(), birth.getDate())
    const daysSinceLast = Math.floor((today - lastBday) / msInDay)
    const yearProgressPct = Math.min(100, Math.round((daysSinceLast / (daysSinceLast + daysToNext)) * 100))

    const weekdayEn = birth.toLocaleDateString('en-US', { weekday: 'long' })
    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate())

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext, yearProgressPct, weekdayEn, zodiac })
  }

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.age} />
      <Breadcrumb toolEn="Age Calculator" toolUr="عمر کیلکولیٹر" path="/age-calculator" />
      <div className="calc-header">
        <h1 className="en-only">Age Calculator</h1>
        <h1 className="ur-only ur-text">عمر کیلکولیٹر</h1>
        <p className="calc-intro en-only">Enter your date of birth to find your exact age, zodiac sign, and fun stats.</p>
        <p className="calc-intro ur-only ur-text">اپنی تاریخ پیدائش درج کریں اور اپنی صحیح عمر معلوم کریں۔</p>
      </div>

      <div className="calc-box">
        <p className="section-title">
          <span className="en-only">🎂 Your Date of Birth</span>
          <span className="ur-only ur-text">🎂 آپ کی تاریخ پیدائش</span>
        </p>

        <div className="dob-grid">
          <div className="field">
            <label><span className="en-only">Day</span><span className="ur-only ur-text">دن</span></label>
            <Select options={dayOptions} value={day} onChange={handleDayChange} searchable={false} />
          </div>
          <div className="field">
            <label><span className="en-only">Month</span><span className="ur-only ur-text">مہینہ</span></label>
            <span className="en-only"><Select options={MONTH_OPTIONS_EN} value={month} onChange={handleMonthChange} searchable={false} /></span>
            <span className="ur-only"><Select options={MONTH_OPTIONS_UR} value={month} onChange={handleMonthChange} searchable={false} /></span>
          </div>
          <div className="field">
            <label><span className="en-only">Year</span><span className="ur-only ur-text">سال</span></label>
            <Select options={YEAR_OPTIONS} value={year} onChange={handleYearChange} searchable={true} searchPlaceholder="Search year..." />
          </div>
        </div>

        {error && (
          <div className="nisab-note due" style={{ marginBottom: 16 }}>
            <span className="en-only">{error.en}</span>
            <span className="ur-only ur-text">{error.ur}</span>
          </div>
        )}

        <button className="btn" onClick={calculate}>
          <span className="en-only">✨ Calculate My Age</span>
          <span className="ur-only ur-text">✨ عمر کا حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show age-result">
            <div className="age-ring" style={{ '--pct': result.yearProgressPct }}>
              <div className="age-ring-inner">
                <span className="age-ring-value">{result.years}</span>
                <span className="age-ring-caption en-only">years old</span>
                <span className="age-ring-caption ur-only ur-text">سال</span>
              </div>
            </div>

            <div className="label en-only" style={{ marginTop: 4 }}>Your Exact Age</div>
            <div className="label ur-only ur-text" style={{ marginTop: 4 }}>آپ کی صحیح عمر</div>
            <div className="value" style={{ fontSize: 22 }}>
              <span className="en-only">{result.years} years, {result.months} months, {result.days} days</span>
              <span className="ur-only ur-text">{result.years} سال، {result.months} مہینے، {result.days} دن</span>
            </div>

            {result.zodiac && (
              <div className="zodiac-badge">
                <span className="zodiac-icon">{result.zodiac.icon}</span>
                <span className="en-only">{result.zodiac.sign}</span>
                <span className="ur-only ur-text">{result.zodiac.ur}</span>
              </div>
            )}

            <div className="age-stats-grid">
              <div className="age-stat-card">
                <div className="age-stat-icon">📅</div>
                <div className="age-stat-value">{result.totalDays.toLocaleString()}</div>
                <div className="age-stat-label en-only">Total Days Lived</div>
                <div className="age-stat-label ur-only ur-text">کل دن</div>
              </div>
              <div className="age-stat-card">
                <div className="age-stat-icon">🗓️</div>
                <div className="age-stat-value">{result.totalWeeks.toLocaleString()}</div>
                <div className="age-stat-label en-only">Total Weeks</div>
                <div className="age-stat-label ur-only ur-text">کل ہفتے</div>
              </div>
              <div className="age-stat-card">
                <div className="age-stat-icon">📆</div>
                <div className="age-stat-value">{result.totalMonths.toLocaleString()}</div>
                <div className="age-stat-label en-only">Total Months</div>
                <div className="age-stat-label ur-only ur-text">کل مہینے</div>
              </div>
              <div className="age-stat-card">
                <div className="age-stat-icon">⏰</div>
                <div className="age-stat-value">{result.totalHours.toLocaleString()}</div>
                <div className="age-stat-label en-only">Total Hours</div>
                <div className="age-stat-label ur-only ur-text">کل گھنٹے</div>
              </div>
              <div className="age-stat-card">
                <div className="age-stat-icon">🎉</div>
                <div className="age-stat-value">{result.daysToNext}</div>
                <div className="age-stat-label en-only">Days to Next Birthday</div>
                <div className="age-stat-label ur-only ur-text">اگلی سالگرہ</div>
              </div>
              <div className="age-stat-card">
                <div className="age-stat-icon">📍</div>
                <div className="age-stat-value" style={{ fontSize: 15 }}>
                  <span className="en-only">{result.weekdayEn}</span>
                  <span className="ur-only ur-text">{WEEKDAY_UR[result.weekdayEn]}</span>
                </div>
                <div className="age-stat-label en-only">Born On</div>
                <div className="age-stat-label ur-only ur-text">پیدائش کا دن</div>
              </div>
            </div>
          </div>
        )}
      </div>

     <article className="article">
  <div className="en-only">
    <h2>How is exact age calculated?</h2>
    <p>This calculator counts the full years, months, and remaining days between your date of birth and today's date, giving you a precise breakdown instead of just a rounded age in years.</p>
    <h2>Why calculate your exact age?</h2>
    <p>Knowing your exact age is useful for job applications, school admissions, visa forms, legal documents, or simply for personal curiosity like counting down to a milestone birthday. Some official forms require your age in years, months, and days rather than just years.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>صحیح عمر کیسے شمار کی جاتی ہے؟</h2>
    <p>یہ کیلکولیٹر آپ کی تاریخ پیدائش اور آج کی تاریخ کے درمیان مکمل سال، مہینے اور دن شمار کرتا ہے۔</p>
    <h2>صحیح عمر معلوم کرنا کیوں ضروری ہے؟</h2>
    <p>یہ نوکری کی درخواستوں، داخلوں، ویزا فارمز اور دیگر سرکاری دستاویزات کے لیے مفید ہے، جہاں سال، مہینے اور دن میں عمر درکار ہوتی ہے۔</p>
  </div>
</article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/age-calculator" />
    </div>
  )
}