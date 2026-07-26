import { useState } from 'react'
import Select from '../components/Select.jsx'

const MODE_OPTIONS = [
  { value: 'mode1', label: 'X% of Y', icon: '➗' },
  { value: 'mode2', label: 'X is what % of Y', icon: '📐' },
  { value: 'mode3', label: '% Increase / Decrease from X to Y', icon: '📈' },
]

export default function Percentage() {
  const [mode, setMode] = useState('mode1')
  const [m1p, setM1p] = useState('')
  const [m1n, setM1n] = useState('')
  const [m2x, setM2x] = useState('')
  const [m2y, setM2y] = useState('')
  const [m3x, setM3x] = useState('')
  const [m3y, setM3y] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    if (mode === 'mode1') {
      const p = parseFloat(m1p) || 0
      const n = parseFloat(m1n) || 0
      setResult({ text: ((p / 100) * n).toLocaleString(undefined, { maximumFractionDigits: 2 }) })
    } else if (mode === 'mode2') {
      const x = parseFloat(m2x) || 0
      const y = parseFloat(m2y) || 0
      const r = y !== 0 ? (x / y) * 100 : 0
      setResult({ text: r.toLocaleString(undefined, { maximumFractionDigits: 2 }) + '%' })
    } else {
      const x = parseFloat(m3x) || 0
      const y = parseFloat(m3y) || 0
      const change = x !== 0 ? ((y - x) / x) * 100 : 0
      setResult({ text: (change >= 0 ? '+' : '') + change.toLocaleString(undefined, { maximumFractionDigits: 2 }) + '%', change })
    }
  }

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Percentage Calculator</h1>
        <h1 className="ur-only ur-text">فیصد کیلکولیٹر</h1>
        <p className="calc-intro en-only">Three common percentage calculations in one tool.</p>
        <p className="calc-intro ur-only ur-text">ایک ہی ٹول میں تین عام فیصد حسابات۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Calculation type</span><span className="ur-only ur-text">حساب کی قسم</span></label>
          <Select options={MODE_OPTIONS} value={mode} onChange={(v) => { setMode(v); setResult(null) }} />
        </div>

        {mode === 'mode1' && (
          <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="field">
              <label><span className="en-only">Percentage (%)</span><span className="ur-only ur-text">فیصد (%)</span></label>
              <input type="number" value={m1p} onChange={(e) => setM1p(e.target.value)} placeholder="e.g. 15" />
            </div>
            <div className="field">
              <label><span className="en-only">Of number</span><span className="ur-only ur-text">عدد کا</span></label>
              <input type="number" value={m1n} onChange={(e) => setM1n(e.target.value)} placeholder="e.g. 200" />
            </div>
          </div>
        )}
        {mode === 'mode2' && (
          <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="field">
              <label><span className="en-only">Number (X)</span><span className="ur-only ur-text">عدد (X)</span></label>
              <input type="number" value={m2x} onChange={(e) => setM2x(e.target.value)} placeholder="e.g. 30" />
            </div>
            <div className="field">
              <label><span className="en-only">Out of (Y)</span><span className="ur-only ur-text">کل میں سے (Y)</span></label>
              <input type="number" value={m2y} onChange={(e) => setM2y(e.target.value)} placeholder="e.g. 200" />
            </div>
          </div>
        )}
        {mode === 'mode3' && (
          <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="field">
              <label><span className="en-only">From value (X)</span><span className="ur-only ur-text">پہلی قیمت (X)</span></label>
              <input type="number" value={m3x} onChange={(e) => setM3x(e.target.value)} placeholder="e.g. 200" />
            </div>
            <div className="field">
              <label><span className="en-only">To value (Y)</span><span className="ur-only ur-text">نئی قیمت (Y)</span></label>
              <input type="number" value={m3y} onChange={(e) => setM3y(e.target.value)} placeholder="e.g. 250" />
            </div>
          </div>
        )}

        <button className="btn" onClick={calculate}>
          <span className="en-only">Calculate</span>
          <span className="ur-only ur-text">حساب لگائیں</span>
        </button>

        {result !== null && (
          <div className="result-box show">
            <div className="label en-only">Result</div>
            <div className="label ur-only ur-text">نتیجہ</div>
            <div className="value">{result.text}</div>
            {mode === 'mode3' && (
              <div className={`badge-pill ${result.change >= 0 ? 'good' : 'bad'}`}>
                <span className="badge-icon">{result.change >= 0 ? '📈' : '📉'}</span>
                <span className="en-only">{result.change >= 0 ? 'Increase' : 'Decrease'}</span>
                <span className="ur-only ur-text">{result.change >= 0 ? 'اضافہ' : 'کمی'}</span>
              </div>
            )}
          </div>
        )}
      </div>

    <article className="article">
  <div className="en-only">
    <h2>Three ways to calculate percentages</h2>
    <p><strong>X% of Y</strong> — find a portion of a total. Formula: (X ÷ 100) × Y. Example: 20% of 500 = 100.</p>
    <p><strong>X is what % of Y</strong> — find what share one number represents. Formula: (X ÷ Y) × 100.</p>
    <p><strong>% Increase/Decrease</strong> — find the percentage change between two values. Formula: ((New − Old) ÷ Old) × 100.</p>
    <h2>Where percentages are used every day</h2>
    <p>Percentages show up everywhere — calculating discounts while shopping, working out exam scores, comparing salary raises, tracking loan interest, or understanding statistics in the news. Getting comfortable with the three formulas above covers almost every everyday percentage question.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>فیصد حساب کرنے کے تین طریقے</h2>
    <p><strong>X فیصد از Y</strong> — کسی کل رقم کا حصہ معلوم کرنا۔</p>
    <p><strong>X، Y کا کتنا فیصد ہے</strong> — ایک نمبر دوسرے کا کتنا حصہ ہے یہ معلوم کرنا۔</p>
    <p><strong>فیصد اضافہ/کمی</strong> — دو اقدار کے درمیان فیصد تبدیلی معلوم کرنا۔</p>
  </div>
</article>
    </div>
  )
}