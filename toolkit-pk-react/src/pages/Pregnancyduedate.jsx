import { useState } from 'react'
import DatePicker from '../components/DatePicker.jsx'

// Approximate size-comparison per pregnancy week (fun, easy-to-grasp reference)
const SIZE_BY_WEEK = [
  { upto: 4, en: 'a poppy seed', ur: 'خشخاش کے دانے' },
  { upto: 8, en: 'a raspberry', ur: 'رسبری' },
  { upto: 12, en: 'a lime', ur: 'لیموں' },
  { upto: 16, en: 'an avocado', ur: 'ایوکاڈو' },
  { upto: 20, en: 'a banana', ur: 'کیلا' },
  { upto: 24, en: 'an ear of corn', ur: 'مکئی کا بھٹہ' },
  { upto: 28, en: 'an eggplant', ur: 'بینگن' },
  { upto: 32, en: 'a coconut', ur: 'ناریل' },
  { upto: 36, en: 'a papaya', ur: 'پپیتا' },
  { upto: 40, en: 'a small watermelon', ur: 'چھوٹا تربوز' },
]

function sizeForWeek(week) {
  return SIZE_BY_WEEK.find((s) => week <= s.upto) || SIZE_BY_WEEK[SIZE_BY_WEEK.length - 1]
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function fmt(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function PregnancyDueDate() {
  const [lmp, setLmp] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    if (!lmp) return
    const start = new Date(lmp)
    const due = addDays(start, 280)
    const conception = addDays(start, 14)

    const today = new Date()
    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24))
    const weeks = Math.max(0, Math.floor(diffDays / 7))
    const days = Math.max(0, diffDays % 7)

    let trimester = 1
    if (weeks >= 27) trimester = 3
    else if (weeks >= 13) trimester = 2

    const progressPct = Math.max(0, Math.min(100, Math.round((diffDays / 280) * 100)))
    const daysLeft = Math.max(0, 280 - diffDays)
    const size = sizeForWeek(weeks)

    const milestones = [
      { label: 'End of 1st Trimester', ur: 'پہلی سہ ماہی مکمل', week: 13, date: addDays(start, 13 * 7) },
      { label: 'Anomaly Scan Window', ur: 'انامیلی اسکین کا وقت', week: 20, date: addDays(start, 20 * 7) },
      { label: 'Start of 3rd Trimester', ur: 'تیسری سہ ماہی شروع', week: 27, date: addDays(start, 27 * 7) },
      { label: 'Full Term', ur: 'مکمل مدت', week: 37, date: addDays(start, 37 * 7) },
      { label: 'Estimated Due Date', ur: 'متوقع تاریخ پیدائش', week: 40, date: due },
    ]

    setResult({ due, conception, weeks, days, trimester, progressPct, daysLeft, size, milestones })
  }

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Pregnancy Due Date Calculator</h1>
        <h1 className="ur-only ur-text">حمل کی متوقع تاریخ کیلکولیٹر</h1>
        <p className="calc-intro en-only">Estimate your expected delivery date, current week, trimester, and key milestones — all in one place.</p>
        <p className="calc-intro ur-only ur-text">اپنی متوقع ڈیلیوری تاریخ، حمل کا موجودہ ہفتہ اور اہم مراحل ایک ہی جگہ معلوم کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">First Day of Last Menstrual Period (LMP)</span><span className="ur-only ur-text">آخری ماہواری کا پہلا دن</span></label>
          <DatePicker value={lmp} onChange={setLmp} placeholder="Select date" max={new Date().toISOString().slice(0, 10)} />
          <div className="hint en-only">Not sure of your LMP date? Ask your doctor for an ultrasound-based estimate instead.</div>
          <div className="hint ur-only ur-text">اگر آخری ماہواری کی تاریخ یاد نہ ہو تو ڈاکٹر سے الٹراساؤنڈ کے ذریعے تصدیق کروائیں۔</div>
        </div>

        <button className="btn" onClick={calculate}>
          <span className="en-only">👶 Calculate Due Date</span>
          <span className="ur-only ur-text">👶 متوقع تاریخ نکالیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="highlight-banner">
              <div className="hb-label en-only">Estimated Due Date</div>
              <div className="hb-label ur-only ur-text">متوقع تاریخ پیدائش</div>
              <div className="hb-value">{fmt(result.due)}</div>
              <div className="hb-sub en-only">{result.daysLeft} days to go</div>
              <div className="hb-sub ur-only ur-text">{result.daysLeft} دن باقی</div>
            </div>

            <div className="label en-only">Pregnancy Progress — {result.weeks}w {result.days}d, Trimester {result.trimester}</div>
            <div className="label ur-only ur-text">حمل کی پیش رفت — {result.weeks} ہفتے {result.days} دن، سہ ماہی {result.trimester}</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${result.progressPct}%` }} />
            </div>
            <div className="progress-row">
              <span>Week 0</span>
              <span>{result.progressPct}%</span>
              <span>Week 40</span>
            </div>

            <div className="badge-pill good" style={{ marginTop: 6 }}>
              <span className="badge-icon">🍼</span>
              <span className="en-only">Your baby is about the size of {result.size.en} this week</span>
              <span className="ur-only ur-text">اس ہفتے آپ کا بچہ تقریباً {result.size.ur} کے برابر ہے</span>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">🗓️</div>
                <div className="stat-value" style={{ fontSize: 15 }}>{fmt(result.conception)}</div>
                <div className="stat-label en-only">Estimated Conception</div>
                <div className="stat-label ur-only ur-text">تخمینی حمل ٹھہرنے کی تاریخ</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📍</div>
                <div className="stat-value">{result.trimester} / 3</div>
                <div className="stat-label en-only">Current Trimester</div>
                <div className="stat-label ur-only ur-text">موجودہ سہ ماہی</div>
              </div>
            </div>

            <div className="label en-only" style={{ marginTop: 18 }}>Key Milestones</div>
            <div className="label ur-only ur-text" style={{ marginTop: 18 }}>اہم مراحل</div>
            <div className="timeline">
              {result.milestones.map((m) => (
                <div key={m.week} className={'timeline-item' + (result.weeks >= m.week ? ' done' : result.weeks >= m.week - 4 ? ' active' : '')}>
                  <div className="timeline-dot" />
                  <div className="timeline-title en-only">{m.label} (Week {m.week})</div>
                  <div className="timeline-title ur-only ur-text">{m.ur} (ہفتہ {m.week})</div>
                  <div className="timeline-sub">{fmt(m.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>How is the due date calculated?</h2>
          <p>This calculator uses Naegele's Rule, which adds 280 days (40 weeks) to the first day of your last menstrual period to estimate the delivery date, assuming a regular 28-day cycle.</p>
          <h2>Is the due date exact?</h2>
          <p>The due date is an estimate — only about 5% of babies are born exactly on their due date, and most arrive within a 2-week window around it. Always confirm with your doctor's ultrasound-based estimate, especially if your cycle is irregular.</p>
          <h2>What do the three trimesters mean?</h2>
          <p>Pregnancy is divided into three trimesters: the first (weeks 1-12) covers early development, the second (weeks 13-26) is often called the "golden period" with fewer symptoms, and the third (weeks 27-40) is the final stretch before delivery.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>متوقع تاریخ کیسے نکالی جاتی ہے؟</h2>
          <p>یہ کیلکولیٹر آخری ماہواری کے پہلے دن میں 280 دن (40 ہفتے) شامل کر کے متوقع تاریخ پیدائش نکالتا ہے۔</p>
          <h2>کیا یہ تاریخ بالکل درست ہے؟</h2>
          <p>یہ صرف ایک تخمینہ ہے۔ درست معلومات کے لیے اپنے ڈاکٹر سے الٹراساؤنڈ کے ذریعے تصدیق کروائیں۔</p>
        </div>
      </article>
    </div>
  )
}