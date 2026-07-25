import { useState } from 'react'
import Select from '../components/Select.jsx'

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
        </div>
        <div className="ur-only ur-text">
          <h2>دستیاب تبدیلیاں</h2>
        </div>
      </article>
    </div>
  )
}