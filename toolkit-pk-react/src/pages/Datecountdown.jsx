import { useEffect, useRef, useState } from 'react'
import DatePicker from '../components/DatePicker.jsx'

function nextOccurrence(month, day) {
  const now = new Date()
  let d = new Date(now.getFullYear(), month - 1, day)
  if (d < now) d = new Date(now.getFullYear() + 1, month - 1, day)
  return d.toISOString().slice(0, 10)
}

const PRESETS = [
  { en: 'New Year', ur: 'نیا سال', get: () => nextOccurrence(1, 1) },
  { en: 'Pakistan Day', ur: 'یوم پاکستان', get: () => nextOccurrence(3, 23) },
  { en: 'Independence Day', ur: 'یوم آزادی', get: () => nextOccurrence(8, 14) },
  { en: 'Defence Day', ur: 'یوم دفاع', get: () => nextOccurrence(9, 6) },
  { en: 'Quaid Day', ur: 'یوم قائد', get: () => nextOccurrence(12, 25) },
]

export default function DateCountdown() {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [remain, setRemain] = useState(null)
  const timerRef = useRef(null)

  function start(overrideTarget, overrideTitle) {
    const t = overrideTarget || target
    if (!t) return
    clearInterval(timerRef.current)
    const tick = () => {
      const diff = new Date(t) - new Date()
      if (diff <= 0) {
        setRemain({ done: true })
        clearInterval(timerRef.current)
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const mins = Math.floor((diff / (1000 * 60)) % 60)
      const secs = Math.floor((diff / 1000) % 60)
      const weeks = Math.floor(days / 7)
      const months = Math.floor(days / 30.44)
      setRemain({ days, hours, mins, secs, weeks, months, done: false })
    }
    tick()
    timerRef.current = setInterval(tick, 1000)
  }

  function applyPreset(p) {
    const d = p.get()
    setTarget(d)
    setTitle(p.en)
    start(d, p.en)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Date Countdown Calculator</h1>
        <h1 className="ur-only ur-text">تاریخ کاؤنٹ ڈاؤن کیلکولیٹر</h1>
        <p className="calc-intro en-only">Live countdown to any future date — birthday, wedding, exam, or national day.</p>
        <p className="calc-intro ur-only ur-text">کسی بھی آنے والی تاریخ تک لائیو کاؤنٹ ڈاؤن — سالگرہ، شادی، امتحان یا کوئی بھی موقع۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Quick Presets</span><span className="ur-only ur-text">فوری منتخب کریں</span></label>
          <div className="chip-row">
            {PRESETS.map((p) => (
              <button key={p.en} type="button" className="chip" onClick={() => applyPreset(p)}>{p.en}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label><span className="en-only">Event Name (optional)</span><span className="ur-only ur-text">موقع کا نام (اختیاری)</span></label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. My Birthday" />
        </div>
        <div className="field">
          <label><span className="en-only">Target Date</span><span className="ur-only ur-text">مطلوبہ تاریخ</span></label>
          <DatePicker value={target} onChange={(v) => { setTarget(v); start(v) }} placeholder="Select date" />
        </div>

        <button className="btn" onClick={() => start()}>
          <span className="en-only">Start Countdown</span>
          <span className="ur-only ur-text">کاؤنٹ ڈاؤن شروع کریں</span>
        </button>

        {remain && !remain.done && (
          <div className="result-box show">
            <div className="highlight-banner">
              <div className="hb-label en-only">{title ? `Countdown to ${title}` : 'Time Remaining'}</div>
              <div className="hb-label ur-only ur-text">{title ? `${title} تک باقی وقت` : 'باقی وقت'}</div>
              <div className="hb-value">{remain.days} days</div>
              <div className="hb-sub en-only">≈ {remain.months} months / {remain.weeks} weeks</div>
              <div className="hb-sub ur-only ur-text">≈ {remain.months} مہینے / {remain.weeks} ہفتے</div>
            </div>

            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {[
                { en: 'Days', ur: 'دن', val: remain.days },
                { en: 'Hours', ur: 'گھنٹے', val: remain.hours },
                { en: 'Mins', ur: 'منٹ', val: remain.mins },
                { en: 'Secs', ur: 'سیکنڈ', val: remain.secs },
              ].map((u) => (
                <div key={u.en} className="stat-card" style={{ textAlign: 'center' }}>
                  <div className="stat-value" style={{ fontSize: 22 }}>{u.val}</div>
                  <div className="stat-label en-only">{u.en}</div>
                  <div className="stat-label ur-only ur-text">{u.ur}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {remain && remain.done && (
          <div className="result-box show">
            <div className="value en-only">🎉 The date has arrived!</div>
            <div className="value ur-only ur-text">🎉 تاریخ آ گئی ہے!</div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>What can I use this for?</h2>
          <p>Use this countdown for birthdays, weddings, exams, national holidays, product launches, or any important upcoming date — it updates live every second.</p>
          <h2>Why don't you show Eid or Ramadan as presets?</h2>
          <p>Islamic dates like Eid and Ramadan depend on local moon sighting and shift each year, so an exact preset could be off by a day. Use the Islamic Date Converter tool alongside the official Ruet-e-Hilal announcement for those dates.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>یہ کس کام آ سکتا ہے؟</h2>
          <p>سالگرہ، شادی، امتحان، قومی دن یا کسی بھی اہم آنے والی تاریخ کے لیے یہ کاؤنٹ ڈاؤن استعمال کریں — یہ ہر سیکنڈ لائیو اپڈیٹ ہوتا ہے۔</p>
        </div>
      </article>
    </div>
  )
}