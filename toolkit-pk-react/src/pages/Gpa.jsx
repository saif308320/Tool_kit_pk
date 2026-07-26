import { useState } from 'react'
import Select from '../components/Select.jsx'

const MODE_OPTIONS = [
  { value: 'mode1', label: 'Percentage to GPA', icon: '📊' },
  { value: 'mode2', label: 'CGPA from Multiple Semesters', icon: '🎓' },
]

export default function Gpa() {
  const [mode, setMode] = useState('mode1')
  const [percent, setPercent] = useState('')
  const [gpaResult, setGpaResult] = useState(null)
  const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }, { gpa: '', credits: '' }])
  const [cgpa, setCgpa] = useState(null)

  function calcPercentToGPA() {
    const p = parseFloat(percent) || 0
    let gpa
    if (p >= 85) gpa = 4.0
    else if (p >= 50) gpa = 2.0 + ((p - 50) / 35) * 2.0
    else gpa = (p / 50) * 2.0
    gpa = Math.round(gpa * 100) / 100

    let en, ur, badgeCls
    if (gpa >= 3.7) { en = 'Excellent (A range)'; ur = 'بہترین (A رینج)'; badgeCls = 'good' }
    else if (gpa >= 3.0) { en = 'Very Good (B+ range)'; ur = 'بہت اچھا (B+ رینج)'; badgeCls = 'good' }
    else if (gpa >= 2.5) { en = 'Good (B range)'; ur = 'اچھا (B رینج)'; badgeCls = 'info' }
    else if (gpa >= 2.0) { en = 'Satisfactory (C range)'; ur = 'تسلی بخش (C رینج)'; badgeCls = 'warn' }
    else { en = 'Below passing threshold'; ur = 'پاسنگ حد سے کم'; badgeCls = 'bad' }

    setGpaResult({ gpa, en, ur, badgeCls })
  }

  function updateSemester(i, field, val) {
    const copy = [...semesters]
    copy[i][field] = val
    setSemesters(copy)
  }

  function addSemester() {
    setSemesters([...semesters, { gpa: '', credits: '' }])
  }

  function calcCGPA() {
    let totalPoints = 0, totalCredits = 0
    semesters.forEach((s) => {
      const g = parseFloat(s.gpa) || 0
      const c = parseFloat(s.credits) || 0
      totalPoints += g * c
      totalCredits += c
    })
    setCgpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00')
  }

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">GPA Calculator</h1>
        <h1 className="ur-only ur-text">جی پی اے کیلکولیٹر</h1>
        <p className="calc-intro en-only">Convert percentage to GPA, or calculate your overall CGPA.</p>
        <p className="calc-intro ur-only ur-text">اپنا فیصد جی پی اے میں تبدیل کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Calculation type</span><span className="ur-only ur-text">حساب کی قسم</span></label>
          <Select options={MODE_OPTIONS} value={mode} onChange={setMode} />
        </div>

        {mode === 'mode1' ? (
          <>
            <div className="field">
              <label><span className="en-only">Percentage (%)</span><span className="ur-only ur-text">فیصد (%)</span></label>
              <input type="number" min="0" max="100" value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="e.g. 82" />
            </div>
            <button className="btn" onClick={calcPercentToGPA}>
              <span className="en-only">Convert to GPA</span>
              <span className="ur-only ur-text">جی پی اے میں تبدیل کریں</span>
            </button>
            {gpaResult && (
              <div className="result-box show">
                <div className="label en-only">Your GPA (out of 4.0)</div>
                <div className="label ur-only ur-text">آپ کا جی پی اے</div>
                <div className="value">{gpaResult.gpa.toFixed(2)}</div>
                <div className={`badge-pill ${gpaResult.badgeCls}`}>
                  <span className="badge-icon">🎓</span>
                  <span className="en-only">{gpaResult.en}</span>
                  <span className="ur-only ur-text">{gpaResult.ur}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="section-title">
              <span className="en-only">Your Semesters</span>
              <span className="ur-only ur-text">آپ کے سمسٹرز</span>
            </p>
            {semesters.map((s, i) => (
              <div className="rate-grid" key={i} style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 10 }}>
                <div className="field" style={{ marginBottom: 8 }}>
                  <label><span className="en-only">Semester {i + 1} GPA</span><span className="ur-only ur-text">سمسٹر {i + 1} جی پی اے</span></label>
                  <input type="number" min="0" max="4" step="0.01" value={s.gpa} onChange={(e) => updateSemester(i, 'gpa', e.target.value)} placeholder="e.g. 3.5" />
                </div>
                <div className="field" style={{ marginBottom: 8 }}>
                  <label><span className="en-only">Credit Hours</span><span className="ur-only ur-text">کریڈٹ آورز</span></label>
                  <input type="number" value={s.credits} onChange={(e) => updateSemester(i, 'credits', e.target.value)} placeholder="e.g. 18" />
                </div>
              </div>
            ))}
            <button type="button" onClick={addSemester} style={{ background: '#fff', border: '1.5px dashed var(--border)', borderRadius: 10, padding: 10, width: '100%', cursor: 'pointer', fontSize: 14, color: 'var(--green-dark)', fontWeight: 600, marginBottom: 16 }}>
              <span className="en-only">+ Add Semester</span>
              <span className="ur-only ur-text">+ سمسٹر شامل کریں</span>
            </button>
            <button className="btn" onClick={calcCGPA}>
              <span className="en-only">Calculate CGPA</span>
              <span className="ur-only ur-text">سی جی پی اے کا حساب لگائیں</span>
            </button>
            {cgpa !== null && (
              <div className="result-box show">
                <div className="label en-only">Your Overall CGPA</div>
                <div className="label ur-only ur-text">آپ کا مجموعی سی جی پی اے</div>
                <div className="value">{cgpa}</div>
                <div className={`badge-pill ${cgpa >= 3.7 ? 'good' : cgpa >= 3.0 ? 'good' : cgpa >= 2.5 ? 'info' : cgpa >= 2.0 ? 'warn' : 'bad'}`}>
                  <span className="badge-icon">🎓</span>
                  <span className="en-only">out of 4.0</span>
                  <span className="ur-only ur-text">4.0 میں سے</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

     <article className="article">
  <div className="en-only">
    <h2>How percentage converts to GPA</h2>
    <p>Most Pakistani universities use a 4.0 scale where 85%+ typically maps to a 4.0 GPA, with proportionally lower GPA values as the percentage decreases. Different universities may use slightly different conversion tables, so always check your specific institution's official policy for exact cutoffs.</p>
    <h2>How CGPA is calculated</h2>
    <p>CGPA (Cumulative Grade Point Average) is the credit-hour-weighted average of your GPA across all completed semesters. This means a semester with more credit hours has a proportionally larger effect on your overall CGPA than a semester with fewer credit hours.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>فیصد جی پی اے میں کیسے تبدیل ہوتا ہے</h2>
    <p>زیادہ تر پاکستانی جامعات 4.0 سکیل استعمال کرتی ہیں جہاں 85% یا اس سے زیادہ نمبر 4.0 جی پی اے کے برابر ہوتے ہیں۔</p>
    <h2>سی جی پی اے کیسے شمار ہوتا ہے</h2>
    <p>سی جی پی اے تمام مکمل شدہ سمسٹرز کے کریڈٹ اوورز کی بنیاد پر اوسط جی پی اے ہوتا ہے۔</p>
  </div>
</article>
    </div>
  )
}