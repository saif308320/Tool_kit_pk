import { useState } from 'react'
import Select from '../components/Select.jsx'

const UNIT_OPTIONS = [
  { value: 'metric', label: 'Metric (cm, kg)', icon: '📏' },
  { value: 'imperial', label: 'Imperial (ft/in, lbs)', icon: '📐' },
]

export default function Bmi() {
  const [unit, setUnit] = useState('metric')
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    let bmi = 0
    if (unit === 'metric') {
      const h = (parseFloat(heightCm) || 0) / 100
      const w = parseFloat(weightKg) || 0
      if (h > 0) bmi = w / (h * h)
    } else {
      const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
      const w = parseFloat(weightLbs) || 0
      if (totalIn > 0) bmi = (w / (totalIn * totalIn)) * 703
    }
    bmi = Math.round(bmi * 10) / 10

    let catEn, catUr, cls, badgeCls
    if (bmi === 0) { catEn = 'Enter valid height and weight above.'; catUr = 'براہ کرم درست قد اور وزن درج کریں۔'; cls = 'not-due'; badgeCls = 'info' }
    else if (bmi < 18.5) { catEn = 'You are Underweight.'; catUr = 'آپ کا وزن کم ہے۔'; cls = 'not-due'; badgeCls = 'info' }
    else if (bmi < 25) { catEn = 'You have a Normal weight. Great job!'; catUr = 'آپ کا وزن نارمل ہے۔'; cls = 'not-due'; badgeCls = 'good' }
    else if (bmi < 30) { catEn = 'You are Overweight.'; catUr = 'آپ کا وزن زیادہ ہے۔'; cls = 'due'; badgeCls = 'warn' }
    else { catEn = 'You are in the Obese range.'; catUr = 'آپ موٹاپے کی حد میں ہیں۔'; cls = 'due'; badgeCls = 'bad' }

    const pointerPct = Math.max(2, Math.min(98, ((bmi - 15) / (40 - 15)) * 100))
    setResult({ bmi, catEn, catUr, cls, badgeCls, pointerPct })
  }

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">BMI Calculator</h1>
        <h1 className="ur-only ur-text">بی ایم آئی کیلکولیٹر</h1>
        <p className="calc-intro en-only">Enter your height and weight to check your Body Mass Index.</p>
        <p className="calc-intro ur-only ur-text">اپنا قد اور وزن درج کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Unit system</span><span className="ur-only ur-text">یونٹ سسٹم</span></label>
          <Select options={UNIT_OPTIONS} value={unit} onChange={setUnit} />
        </div>

        {unit === 'metric' ? (
          <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="field">
              <label><span className="en-only">Height (cm)</span><span className="ur-only ur-text">قد (سینٹی میٹر)</span></label>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g. 170" />
            </div>
            <div className="field">
              <label><span className="en-only">Weight (kg)</span><span className="ur-only ur-text">وزن (کلوگرام)</span></label>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="e.g. 65" />
            </div>
          </div>
        ) : (
          <>
            <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div className="field">
                <label><span className="en-only">Height (feet)</span><span className="ur-only ur-text">قد (فٹ)</span></label>
                <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="e.g. 5" />
              </div>
              <div className="field">
                <label><span className="en-only">Height (inches)</span><span className="ur-only ur-text">قد (انچ)</span></label>
                <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="e.g. 7" />
              </div>
            </div>
            <div className="field">
              <label><span className="en-only">Weight (lbs)</span><span className="ur-only ur-text">وزن (پاؤنڈ)</span></label>
              <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="e.g. 143" />
            </div>
          </>
        )}

        <button className="btn" onClick={calculate}>
          <span className="en-only">Calculate BMI</span>
          <span className="ur-only ur-text">بی ایم آئی کا حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">Your BMI</div>
            <div className="label ur-only ur-text">آپ کا بی ایم آئی</div>
            <div className="value">{result.bmi}</div>
            <div className="gauge">
              <div className="gauge-track">
                <div className="gauge-pointer" style={{ left: `${result.pointerPct}%` }}></div>
              </div>
              <div className="gauge-labels">
                <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
              </div>
            </div>
            <div className={`badge-pill ${result.badgeCls}`}>
              <span className="en-only">{result.catEn}</span>
              <span className="ur-only ur-text">{result.catUr}</span>
            </div>
          </div>
        )}
      </div>

     <article className="article">
  <div className="en-only">
    <h2>What is BMI?</h2>
    <p>Body Mass Index (BMI) is a simple screening measure that uses your height and weight to estimate whether your body weight falls in a healthy range. It's calculated by dividing your weight in kilograms by the square of your height in meters.</p>
    <h2>BMI Categories</h2>
    <p>Below 18.5 — Underweight<br/>18.5–24.9 — Normal<br/>25.0–29.9 — Overweight<br/>30.0+ — Obese</p>
    <h2>Limitations of BMI</h2>
    <p>BMI doesn't distinguish between muscle and fat, so athletes or very muscular individuals may show a higher BMI without excess body fat. It also doesn't account for age, sex, or fat distribution. BMI is a useful starting point, not a full diagnosis.</p>
    <p style={{ fontSize: 13, color: 'var(--muted)' }}>For personalized health advice, consult a doctor.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>بی ایم آئی کیا ہے؟</h2>
    <p>باڈی ماس انڈیکس (بی ایم آئی) ایک سادہ پیمانہ ہے جو آپ کے قد اور وزن کی بنیاد پر یہ اندازہ لگاتا ہے کہ آپ کا وزن صحت مند حد میں ہے یا نہیں۔</p>
    <h2>بی ایم آئی کیٹیگریز</h2>
    <p>18.5 سے کم — کم وزن<br/>18.5–24.9 — نارمل<br/>25.0–29.9 — زیادہ وزن<br/>30.0+ — موٹاپا</p>
  </div>
</article>
    </div>
  )
}