import { useState } from 'react'
import Select from '../components/Select.jsx'

const MODE_OPTIONS = [
  { value: 'mode1', label: 'Find Sale Price (I know the discount %)', icon: '🏷️' },
  { value: 'mode2', label: 'Find Discount % (I know both prices)', icon: '💯' },
]

export default function Discount() {
  const [mode, setMode] = useState('mode1')
  const [m1price, setM1price] = useState('')
  const [m1discount, setM1discount] = useState('')
  const [m2original, setM2original] = useState('')
  const [m2sale, setM2sale] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    if (mode === 'mode1') {
      const price = parseFloat(m1price) || 0
      const discount = parseFloat(m1discount) || 0
      const saved = price * (discount / 100)
      setResult({ labelEn: 'Final Sale Price', labelUr: 'حتمی سیل قیمت', value: `Rs. ${(price - saved).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, savedEn: `You save Rs. ${saved.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, savedUr: `آپ کی بچت: روپے ${saved.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, savedPct: discount })
    } else {
      const original = parseFloat(m2original) || 0
      const sale = parseFloat(m2sale) || 0
      const saved = original - sale
      const pct = original !== 0 ? (saved / original) * 100 : 0
      setResult({ labelEn: 'Discount Percentage', labelUr: 'ڈسکاؤنٹ فیصد', value: pct.toLocaleString(undefined, { maximumFractionDigits: 2 }) + '%', savedEn: `You saved Rs. ${saved.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, savedUr: `آپ نے بچائے: روپے ${saved.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, savedPct: pct })
    }
  }

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Discount Calculator</h1>
        <h1 className="ur-only ur-text">ڈسکاؤنٹ کیلکولیٹر</h1>
        <p className="calc-intro en-only">Find the final sale price and savings, or the discount percentage.</p>
        <p className="calc-intro ur-only ur-text">حتمی سیل قیمت اور بچت معلوم کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Calculation type</span><span className="ur-only ur-text">حساب کی قسم</span></label>
          <Select options={MODE_OPTIONS} value={mode} onChange={(v) => { setMode(v); setResult(null) }} />
        </div>

        {mode === 'mode1' ? (
          <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="field">
              <label><span className="en-only">Original price (PKR)</span><span className="ur-only ur-text">اصل قیمت (روپے)</span></label>
              <input type="number" value={m1price} onChange={(e) => setM1price(e.target.value)} placeholder="e.g. 5000" />
            </div>
            <div className="field">
              <label><span className="en-only">Discount (%)</span><span className="ur-only ur-text">ڈسکاؤنٹ (%)</span></label>
              <input type="number" value={m1discount} onChange={(e) => setM1discount(e.target.value)} placeholder="e.g. 20" />
            </div>
          </div>
        ) : (
          <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="field">
              <label><span className="en-only">Original price (PKR)</span><span className="ur-only ur-text">اصل قیمت (روپے)</span></label>
              <input type="number" value={m2original} onChange={(e) => setM2original(e.target.value)} placeholder="e.g. 5000" />
            </div>
            <div className="field">
              <label><span className="en-only">Sale price (PKR)</span><span className="ur-only ur-text">سیل قیمت (روپے)</span></label>
              <input type="number" value={m2sale} onChange={(e) => setM2sale(e.target.value)} placeholder="e.g. 4000" />
            </div>
          </div>
        )}

        <button className="btn" onClick={calculate}>
          <span className="en-only">Calculate</span>
          <span className="ur-only ur-text">حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">{result.labelEn}</div>
            <div className="label ur-only ur-text">{result.labelUr}</div>
            <div className="value">{result.value}</div>
            <div className="sub">
              <span className="en-only">{result.savedEn}</span>
              <span className="ur-only ur-text">{result.savedUr}</span>
            </div>
            <div className={'badge-pill ' + (result.savedPct >= 30 ? 'good' : 'info')}>
              <span className="badge-icon">🏷️</span>
              <span className="en-only">{result.savedPct >= 30 ? 'Great Deal — ' : ''}{result.savedPct.toLocaleString(undefined, { maximumFractionDigits: 1 })}% off</span>
              <span className="ur-only ur-text">{result.savedPct.toLocaleString(undefined, { maximumFractionDigits: 1 })}% رعایت</span>
            </div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>How discount calculation works</h2>
          <p>When you know the discount percentage, the final price is the original minus that percentage.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>ڈسکاؤنٹ کا حساب کیسے کام کرتا ہے</h2>
        </div>
      </article>
    </div>
  )
}