import { useState } from 'react'
import DatePicker from '../components/DatePicker.jsx'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'How accurate is this Islamic date conversion?',
    aEn: 'This tool uses astronomical calculations, but the official Islamic date in Pakistan depends on moon-sighting announcements by the Ruet-e-Hilal Committee, which can differ by a day.',
    qUr: 'یہ اسلامی تاریخ کنورژن کتنی درست ہے؟',
    aUr: 'یہ ٹول فلکیاتی حساب استعمال کرتا ہے، تاہم پاکستان میں سرکاری تاریخ رویت ہلال کمیٹی کے چاند دیکھنے کے اعلان پر منحصر ہوتی ہے، جس سے ایک دن کا فرق ہو سکتا ہے۔',
  },
  {
    qEn: 'Why does the Islamic calendar have 354 or 355 days?',
    aEn: 'The Hijri calendar is lunar, based on moon cycles of about 29.5 days each, making it roughly 10-11 days shorter than the solar Gregorian year.',
    qUr: 'اسلامی کیلنڈر میں 354 یا 355 دن کیوں ہوتے ہیں؟',
    aUr: 'ہجری کیلنڈر قمری ہے، جو تقریباً 29.5 دن کے چاند کے چکروں پر مبنی ہے، اس لیے یہ عیسوی سال سے تقریباً 10-11 دن چھوٹا ہوتا ہے۔',
  },
  {
    qEn: 'Can I convert both from Gregorian to Hijri and back?',
    aEn: 'Yes, this converter works both ways — enter a Gregorian date to get the Hijri equivalent, or an Islamic date to see the Gregorian date.',
    qUr: 'کیا میں عیسوی سے ہجری اور واپس دونوں طرف تبدیل کر سکتا ہوں؟',
    aUr: 'جی ہاں، یہ کنورٹر دونوں طرف کام کرتا ہے — عیسوی تاریخ درج کریں تاکہ ہجری تاریخ ملے، یا اسلامی تاریخ درج کریں تاکہ عیسوی تاریخ معلوم ہو۔',
  },
  {
    qEn: 'Why is this useful for Pakistan?',
    aEn: 'It helps track Islamic occasions like Ramadan, Eid, and Muharram, which follow the Hijri calendar and shift earlier by about 10-11 days each Gregorian year.',
    qUr: 'یہ پاکستان کے لیے کیوں مفید ہے؟',
    aUr: 'یہ رمضان، عید اور محرم جیسے اسلامی مواقع کو ٹریک کرنے میں مدد دیتا ہے، جو ہجری کیلنڈر کی پیروی کرتے ہیں اور ہر عیسوی سال تقریباً 10-11 دن پہلے آتے ہیں۔',
  },
]

const HIJRI_MONTHS = [
  { en: 'Muharram', ur: 'محرم' }, { en: 'Safar', ur: 'صفر' }, { en: 'Rabi al-Awwal', ur: 'ربیع الاول' },
  { en: 'Rabi al-Thani', ur: 'ربیع الثانی' }, { en: 'Jumada al-Awwal', ur: 'جمادی الاول' }, { en: 'Jumada al-Thani', ur: 'جمادی الثانی' },
  { en: 'Rajab', ur: 'رجب' }, { en: 'Shaban', ur: 'شعبان' }, { en: 'Ramadan', ur: 'رمضان' },
  { en: 'Shawwal', ur: 'شوال' }, { en: 'Dhu al-Qadah', ur: 'ذوالقعدہ' }, { en: 'Dhu al-Hijjah', ur: 'ذوالحجہ' },
]

const WEEKDAY_UR = { Sunday: 'اتوار', Monday: 'پیر', Tuesday: 'منگل', Wednesday: 'بدھ', Thursday: 'جمعرات', Friday: 'جمعہ', Saturday: 'ہفتہ' }

export default function IslamicDateConverter() {
  const [mode, setMode] = useState('gToH')
  const [gDate, setGDate] = useState('')
  const [hDay, setHDay] = useState('')
  const [hMonth, setHMonth] = useState('1')
  const [hYear, setHYear] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function convert() {
    setError('')
    setResult(null)
    setLoading(true)
    try {
      if (mode === 'gToH') {
        if (!gDate) { setError('empty'); setLoading(false); return }
        const [y, m, d] = gDate.split('-')
        const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${d}-${m}-${y}`)
        const data = await res.json()
        const h = data.data.hijri
        const g = data.data.gregorian
        setResult({
          type: 'hijri',
          day: h.day, month: h.month, year: h.year,
          weekdayEn: g.weekday.en, weekdayUr: WEEKDAY_UR[g.weekday.en] || g.weekday.en,
        })
      } else {
        if (!hDay || !hYear) { setError('empty'); setLoading(false); return }
        const dd = String(hDay).padStart(2, '0')
        const mm = String(hMonth).padStart(2, '0')
        const res = await fetch(`https://api.aladhan.com/v1/hToG?date=${dd}-${mm}-${hYear}`)
        const data = await res.json()
        const g = data.data.gregorian
        setResult({
          type: 'gregorian',
          day: g.day, month: g.month, year: g.year,
          weekdayEn: g.weekday.en, weekdayUr: WEEKDAY_UR[g.weekday.en] || g.weekday.en,
        })
      }
    } catch (err) {
      setError('fail')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.islamicDate} />
      <Breadcrumb toolEn="Islamic Date Converter" toolUr="اسلامی تاریخ کنورٹر" path="/islamic-date-converter" />
      <div className="calc-header">
        <h1 className="en-only">Islamic Date Converter</h1>
        <h1 className="ur-only ur-text">اسلامی تاریخ کنورٹر</h1>
        <p className="calc-intro en-only">Convert between Gregorian and Hijri (Islamic) calendar dates instantly.</p>
        <p className="calc-intro ur-only ur-text">عیسوی اور ہجری تاریخ کو ایک دوسرے میں فوری تبدیل کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label>
            <span className="en-only">Conversion Direction</span>
            <span className="ur-only ur-text">تبدیلی کی سمت</span>
          </label>
          <div className="chip-row">
            <button type="button" className={'chip' + (mode === 'gToH' ? ' active' : '')} onClick={() => { setMode('gToH'); setResult(null) }}>
              Gregorian → Hijri
            </button>
            <button type="button" className={'chip' + (mode === 'hToG' ? ' active' : '')} onClick={() => { setMode('hToG'); setResult(null) }}>
              Hijri → Gregorian
            </button>
          </div>
        </div>

        {mode === 'gToH' ? (
          <div className="field">
            <label><span className="en-only">Select Gregorian Date</span><span className="ur-only ur-text">عیسوی تاریخ منتخب کریں</span></label>
            <DatePicker value={gDate} onChange={setGDate} placeholder="Select date" />
          </div>
        ) : (
          <div className="rate-grid">
            <div className="field">
              <label><span className="en-only">Hijri Day</span><span className="ur-only ur-text">ہجری دن</span></label>
              <input type="number" min="1" max="30" value={hDay} onChange={(e) => setHDay(e.target.value)} placeholder="e.g. 15" />
            </div>
            <div className="field">
              <label><span className="en-only">Hijri Month</span><span className="ur-only ur-text">ہجری مہینہ</span></label>
              <select value={hMonth} onChange={(e) => setHMonth(e.target.value)}>
                {HIJRI_MONTHS.map((m, i) => (
                  <option key={m.en} value={i + 1}>{m.en}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label><span className="en-only">Hijri Year</span><span className="ur-only ur-text">ہجری سال</span></label>
              <input type="number" value={hYear} onChange={(e) => setHYear(e.target.value)} placeholder="e.g. 1447" />
            </div>
          </div>
        )}

        <button type="button" className="btn" onClick={convert} disabled={loading}>
          <span className="en-only">{loading ? 'Converting...' : '🔄 Convert Date'}</span>
          <span className="ur-only ur-text">{loading ? 'تبدیل ہو رہا ہے...' : '🔄 تاریخ تبدیل کریں'}</span>
        </button>

        {error && (
          <div style={{ fontSize: 13, color: '#b91c1c', marginTop: 10 }}>
            <span className="en-only">⚠️ Please fill in the date fields correctly.</span>
            <span className="ur-only ur-text">⚠️ براہ کرم تاریخ درست درج کریں۔</span>
          </div>
        )}

        {result && (
          <div className="result-box show">
            <div className="label en-only">{result.type === 'hijri' ? 'Hijri Date' : 'Gregorian Date'}</div>
            <div className="label ur-only ur-text">{result.type === 'hijri' ? 'ہجری تاریخ' : 'عیسوی تاریخ'}</div>
            <div className="value" style={{ fontSize: 26 }}>
              {result.type === 'hijri'
                ? `${result.day} ${result.month.en} ${result.year} AH`
                : `${result.day} ${result.month.en} ${result.year} CE`}
            </div>
            {result.type === 'hijri' && (
              <div className="value ur-text" style={{ fontSize: 20, marginTop: 2 }}>{result.day} {result.month.ar} {result.year} ھ</div>
            )}

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">📆</div>
                <div className="stat-value">
                  <span className="en-only">{result.weekdayEn}</span>
                  <span className="ur-only ur-text">{result.weekdayUr}</span>
                </div>
                <div className="stat-label en-only">Day of the Week</div>
                <div className="stat-label ur-only ur-text">دن کا نام</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">{result.type === 'hijri' ? '🌙' : '☀️'}</div>
                <div className="stat-value">{result.type === 'hijri' ? 'Hijri' : 'Gregorian'}</div>
                <div className="stat-label en-only">Calendar System</div>
                <div className="stat-label ur-only ur-text">کیلنڈر نظام</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>What is the Hijri Calendar?</h2>
          <p>The Hijri calendar is the lunar Islamic calendar used to determine dates for Ramadan, Eid, Hajj, and other Islamic events. Since it follows the moon's cycle, it is roughly 10-11 days shorter than the Gregorian solar year — so Islamic months shift earlier each year relative to the Gregorian calendar.</p>
          <h2>How accurate is this converter?</h2>
          <p>This tool uses a well-established astronomical calculation and gives a reliable estimate for planning purposes. However, the actual start of a Hijri month in Pakistan officially depends on local moon sighting announced by the Ruet-e-Hilal Committee, which may shift the real date by a day.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>ہجری کیلنڈر کیا ہے؟</h2>
          <p>ہجری کیلنڈر قمری اسلامی کیلنڈر ہے جو رمضان، عید، حج اور دیگر اسلامی مواقع کی تاریخیں طے کرنے کے لیے استعمال ہوتا ہے۔ یہ عیسوی سال سے تقریباً 10-11 دن چھوٹا ہوتا ہے۔</p>
          <h2>یہ کنورٹر کتنا درست ہے؟</h2>
          <p>یہ ٹول فلکیاتی حساب استعمال کرتا ہے، تاہم پاکستان میں سرکاری تاریخ رویت ہلال کمیٹی کے چاند دیکھنے کے اعلان پر منحصر ہوتی ہے، جس سے ایک دن کا فرق ہو سکتا ہے۔</p>
        </div>
      </article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/islamic-date-converter" />
    </div>
  )
}