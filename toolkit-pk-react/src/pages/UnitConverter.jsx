import { useState } from 'react'
import Select from '../components/Select.jsx'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'What unit types can I convert?',
    aEn: 'This tool converts length, weight, volume, and temperature between metric and imperial systems, including common Pakistani units like tola.',
    qUr: 'میں کون سے یونٹ تبدیل کر سکتا ہوں؟',
    aUr: 'یہ ٹول لمبائی، وزن، حجم اور درجہ حرارت کو میٹرک اور امپیریل سسٹمز کے درمیان تبدیل کرتا ہے، بشمول تولہ جیسے عام پاکستانی یونٹس۔',
  },
  {
    qEn: 'Why are both metric and imperial units used in Pakistan?',
    aEn: 'Pakistan officially uses the metric system, but traditional units like tola and imperial units like feet are still common in daily life and certain industries.',
    qUr: 'پاکستان میں میٹرک اور امپیریل دونوں یونٹس کیوں استعمال ہوتے ہیں؟',
    aUr: 'پاکستان سرکاری طور پر میٹرک سسٹم استعمال کرتا ہے، لیکن تولہ جیسے روایتی یونٹس اور فٹ جیسے امپیریل یونٹس روزمرہ زندگی اور بعض صنعتوں میں اب بھی عام ہیں۔',
  },
  {
    qEn: 'How accurate are the conversions?',
    aEn: 'Conversions use precise standard conversion factors, so results are mathematically accurate for any value you enter.',
    qUr: 'یہ تبدیلیاں کتنی درست ہیں؟',
    aUr: 'تبدیلیاں درست معیاری تبدیلی فیکٹرز استعمال کرتی ہیں، اس لیے آپ کی درج کردہ ہر قدر کے لیے نتیجہ ریاضیاتی طور پر درست ہوتا ہے۔',
  },
  {
    qEn: 'Can I convert between any two units instantly?',
    aEn: "Yes, simply select the unit category, choose your 'from' and 'to' units, and the result updates instantly as you type.",
    qUr: 'کیا میں کسی بھی دو یونٹس کے درمیان فوری تبدیلی کر سکتا ہوں؟',
    aUr: "جی ہاں، بس یونٹ کیٹیگری منتخب کریں، 'سے' اور 'میں' یونٹس چنیں، اور ٹائپ کرتے ہی نتیجہ فوری اپڈیٹ ہو جائے گا۔",
  },
]

const CATEGORY_OPTIONS = [
  { value: 'length', label: 'Length', icon: '📏' },
  { value: 'weight', label: 'Weight', icon: '⚖️' },
  { value: 'temperature', label: 'Temperature', icon: '🌡️' },
]

const UNITS = {
  length: { m: { label: 'Meters (m)', f: 1 }, km: { label: 'Kilometers (km)', f: 1000 }, cm: { label: 'Centimeters (cm)', f: 0.01 }, mm: { label: 'Millimeters (mm)', f: 0.001 }, ft: { label: 'Feet (ft)', f: 0.3048 }, inch: { label: 'Inches (in)', f: 0.0254 }, mile: { label: 'Miles (mi)', f: 1609.34 }, yard: { label: 'Yards (yd)', f: 0.9144 } },
  weight: { kg: { label: 'Kilograms (kg)', f: 1 }, g: { label: 'Grams (g)', f: 0.001 }, lb: { label: 'Pounds (lb)', f: 0.453592 }, oz: { label: 'Ounces (oz)', f: 0.0283495 }, ton: { label: 'Tons (metric)', f: 1000 }, tola: { label: 'Tola', f: 0.0116638 } },
}
const TEMP_UNITS = { c: 'Celsius (°C)', f: 'Fahrenheit (°F)', k: 'Kelvin (K)' }

function convertTemp(value, from, to) {
  let c
  if (from === 'c') c = value
  else if (from === 'f') c = (value - 32) * 5 / 9
  else c = value - 273.15
  if (to === 'c') return c
  if (to === 'f') return (c * 9 / 5) + 32
  return c + 273.15
}

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [value, setValue] = useState(1)
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('ft')

  function handleCategoryChange(cat) {
    setCategory(cat)
    if (cat === 'temperature') { setFrom('c'); setTo('f') }
    else { const keys = Object.keys(UNITS[cat]); setFrom(keys[0]); setTo(keys[1]) }
  }

  let result = 0
  if (category === 'temperature') {
    result = convertTemp(parseFloat(value) || 0, from, to)
  } else {
    const units = UNITS[category]
    const valBase = (parseFloat(value) || 0) * units[from].f
    result = valBase / units[to].f
  }

  const optionEntries = category === 'temperature'
    ? Object.entries(TEMP_UNITS).map(([k, label]) => [k, label])
    : Object.entries(UNITS[category]).map(([k, v]) => [k, v.label])

  const unitOptions = optionEntries.map(([k, label]) => ({ value: k, label }))

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.unitConverter} />
      <Breadcrumb toolEn="Unit Converter" toolUr="یونٹ کنورٹر" path="/unit-converter" />
      <div className="calc-header">
        <h1 className="en-only">Unit Converter</h1>
        <h1 className="ur-only ur-text">یونٹ کنورٹر</h1>
        <p className="calc-intro en-only">Convert between length, weight, and temperature units instantly.</p>
        <p className="calc-intro ur-only ur-text">لمبائی، وزن اور درجہ حرارت کی اکائیاں تبدیل کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Category</span><span className="ur-only ur-text">قسم</span></label>
          <Select options={CATEGORY_OPTIONS} value={category} onChange={handleCategoryChange} />
        </div>

        <div className="rate-grid" style={{ alignItems: 'end', borderBottom: 'none', paddingBottom: 0 }}>
          <div className="field">
            <label><span className="en-only">Value</span><span className="ur-only ur-text">قدر</span></label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div className="field">
            <label><span className="en-only">From</span><span className="ur-only ur-text">سے</span></label>
            <Select options={unitOptions} value={from} onChange={setFrom} searchable={unitOptions.length > 5} />
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '4px 0 18px' }}>
          <button type="button" onClick={() => { setFrom(to); setTo(from) }} style={{ border: '1.5px solid var(--border)', background: '#fff', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: 16 }} title="Swap">⇅</button>
        </div>

        <div className="field">
          <label><span className="en-only">To</span><span className="ur-only ur-text">میں</span></label>
          <Select options={unitOptions} value={to} onChange={setTo} searchable={unitOptions.length > 5} />
        </div>

        <div className="result-box show">
          <div className="label en-only">Converted Value</div>
          <div className="label ur-only ur-text">تبدیل شدہ قدر</div>
          <div className="value">{result.toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
          <div className="badge-pill info">
            <span className="badge-icon">{CATEGORY_OPTIONS.find((c) => c.value === category)?.icon}</span>
            <span>{value || 0} {unitOptions.find((u) => u.value === from)?.label} = {result.toLocaleString(undefined, { maximumFractionDigits: 4 })} {unitOptions.find((u) => u.value === to)?.label}</span>
          </div>
        </div>
      </div>

     <article className="article">
  <div className="en-only">
    <h2>Supported conversions</h2>
    <p><strong>Length</strong> — meters, km, cm, feet, inches, miles, yards</p>
    <p><strong>Weight</strong> — kg, grams, pounds, ounces, tons, tola</p>
    <p><strong>Temperature</strong> — Celsius, Fahrenheit, Kelvin</p>
    <h2>Why unit conversion matters</h2>
    <p>Pakistan commonly mixes metric units (kilograms, meters) with traditional units like tola for gold and silver, while international recipes, products, or travel often use imperial units like pounds, feet, or Fahrenheit. This tool bridges that gap instantly, so you don't need to memorize conversion formulas or search separately for each unit pair.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>دستیاب تبدیلیاں</h2>
    <p><strong>لمبائی</strong> — میٹر، کلومیٹر، سینٹی میٹر، فٹ، انچ، میل، گز</p>
    <p><strong>وزن</strong> — کلوگرام، گرام، پاؤنڈ، اونس، ٹن، تولہ</p>
    <p><strong>درجہ حرارت</strong> — سیلسیس، فارن ہائیٹ، کیلون</p>
    <h2>یونٹ تبدیل کرنا کیوں ضروری ہے؟</h2>
    <p>پاکستان میں میٹرک اور روایتی یونٹس (جیسے تولہ) دونوں استعمال ہوتے ہیں، جبکہ بین الاقوامی مصنوعات میں امپیریل یونٹس عام ہیں۔ یہ ٹول فوری اور درست تبدیلی فراہم کرتا ہے۔</p>
  </div>
</article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/unit-converter" />
    </div>
  )
}