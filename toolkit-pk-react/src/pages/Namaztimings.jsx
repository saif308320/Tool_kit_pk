import { useEffect, useState } from 'react'
import Select from '../components/Select.jsx'

/* Reliable lat/long per city — using coordinates instead of the city-name
   lookup avoids Aladhan's geocoding failing/mismatching for smaller PK cities,
   which was the cause of incorrect/blank timings before. */
const CITIES = [
  { value: 'Karachi', label: 'Karachi', lat: 24.8607, lon: 67.0011 },
  { value: 'Lahore', label: 'Lahore', lat: 31.5497, lon: 74.3436 },
  { value: 'Islamabad', label: 'Islamabad', lat: 33.6844, lon: 73.0479 },
  { value: 'Rawalpindi', label: 'Rawalpindi', lat: 33.5651, lon: 73.0169 },
  { value: 'Faisalabad', label: 'Faisalabad', lat: 31.4504, lon: 73.1350 },
  { value: 'Multan', label: 'Multan', lat: 30.1575, lon: 71.5249 },
  { value: 'Peshawar', label: 'Peshawar', lat: 34.0151, lon: 71.5249 },
  { value: 'Quetta', label: 'Quetta', lat: 30.1798, lon: 66.9750 },
  { value: 'Sialkot', label: 'Sialkot', lat: 32.4945, lon: 74.5229 },
  { value: 'Hyderabad', label: 'Hyderabad', lat: 25.3960, lon: 68.3578 },
  { value: 'Gujranwala', label: 'Gujranwala', lat: 32.1877, lon: 74.1945 },
  { value: 'Sukkur', label: 'Sukkur', lat: 27.7052, lon: 68.8574 },
]

const ORDER = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
const NAMES_EN = { Fajr: 'Fajr', Sunrise: 'Sunrise', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' }
const NAMES_UR = { Fajr: 'فجر', Sunrise: 'طلوع آفتاب', Dhuhr: 'ظہر', Asr: 'عصر', Maghrib: 'مغرب', Isha: 'عشاء' }
const ICONS = { Fajr: '🌙', Sunrise: '🌅', Dhuhr: '☀️', Asr: '🌤️', Maghrib: '🌇', Isha: '🌃' }

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function to12h(t) {
  if (!t) return t
  const timePart = t.split(' ')[0]
  let [h, m] = timePart.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${String(m).padStart(2, '0')} ${period}`
}

function findNext(timings) {
  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  for (const key of ORDER) {
    if (!timings[key]) continue
    const t = toMinutes(timings[key].split(' ')[0])
    if (t > nowMin) return { key, minutesLeft: t - nowMin }
  }
  // after Isha — next is tomorrow's Fajr
  const fajr = toMinutes(timings.Fajr.split(' ')[0])
  return { key: 'Fajr', minutesLeft: (24 * 60 - nowMin) + fajr, tomorrow: true }
}

export default function NamazTimings() {
  const [city, setCity] = useState('Karachi')
  const [timings, setTimings] = useState(null)
  const [hijri, setHijri] = useState(null)
  const [date, setDate] = useState('')
  const [next, setNext] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorDetail, setErrorDetail] = useState('')

  async function fetchTimings(isRetry) {
    setLoading(true)
    setError('')
    setErrorDetail('')
    if (!isRetry) setTimings(null)
    try {
      const c = CITIES.find((x) => x.value === city)
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${c.lat}&longitude=${c.lon}&method=1`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.code === 200) {
        setTimings(data.data.timings)
        setHijri(data.data.date.hijri)
        setDate(data.data.date.readable)
        setNext(findNext(data.data.timings))
      } else {
        throw new Error(`API returned code ${data.code}`)
      }
    } catch (err) {
      console.error('NamazTimings fetch failed:', err)
      if (!isRetry) {
        // one silent retry — helps with a flaky first request
        return fetchTimings(true)
      }
      setError('fail')
      setErrorDetail(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh the "next prayer" countdown every 30s while timings are shown
  useEffect(() => {
    if (!timings) return
    const id = setInterval(() => setNext(findNext(timings)), 30000)
    return () => clearInterval(id)
  }, [timings])

  const cityOptions = CITIES.map((c) => ({ value: c.value, label: c.label }))

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Namaz Timings (Prayer Times)</h1>
        <h1 className="ur-only ur-text">نماز کے اوقات</h1>
        <p className="calc-intro en-only">Get today's accurate, live prayer timings for any city in Pakistan.</p>
        <p className="calc-intro ur-only ur-text">پاکستان کے کسی بھی شہر کے آج کے درست نماز کے اوقات معلوم کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label>
            <span className="en-only">Select City</span>
            <span className="ur-only ur-text">شہر منتخب کریں</span>
          </label>
          <Select options={cityOptions} value={city} onChange={setCity} searchable searchPlaceholder="Search city..." />
        </div>

        <button type="button" className="btn" onClick={fetchTimings} disabled={loading}>
          <span className="en-only">{loading ? 'Loading...' : '🕌 Get Prayer Timings'}</span>
          <span className="ur-only ur-text">{loading ? 'لوڈ ہو رہا ہے...' : '🕌 نماز کے اوقات حاصل کریں'}</span>
        </button>

        {error && (
          <div style={{ fontSize: 13, color: '#b91c1c', marginTop: 10 }}>
            <span className="en-only">⚠️ Could not fetch timings. Please check your internet connection and try again.</span>
            <span className="ur-only ur-text">⚠️ اوقات حاصل نہیں ہو سکے۔ انٹرنیٹ کنکشن چیک کر کے دوبارہ کوشش کریں۔</span>
            {errorDetail && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>({errorDetail})</div>}
          </div>
        )}

        {timings && (
          <div className="result-box show">
            {next && (
              <div className="highlight-banner">
                <div className="hb-label en-only">{next.tomorrow ? "Next Prayer (Tomorrow)" : 'Next Prayer'}</div>
                <div className="hb-label ur-only ur-text">{next.tomorrow ? 'اگلی نماز (کل)' : 'اگلی نماز'}</div>
                <div className="hb-value">
                  {ICONS[next.key]} <span className="en-only">{NAMES_EN[next.key]}</span><span className="ur-only ur-text">{NAMES_UR[next.key]}</span> — {to12h(timings[next.key])}
                </div>
                <div className="hb-sub en-only">In {Math.floor(next.minutesLeft / 60)}h {next.minutesLeft % 60}m</div>
                <div className="hb-sub ur-only ur-text">{Math.floor(next.minutesLeft / 60)} گھنٹے {next.minutesLeft % 60} منٹ باقی</div>
              </div>
            )}

            <div className="label en-only">Prayer Times — {city} ({date})</div>
            <div className="label ur-only ur-text">نماز کے اوقات — {city} ({date})</div>
            {hijri && (
              <div className="sub" style={{ marginBottom: 4 }}>
                <span className="en-only">{hijri.day} {hijri.month.en} {hijri.year} AH</span>
                <span className="ur-only ur-text">{hijri.day} {hijri.month.ar} {hijri.year} ہجری</span>
              </div>
            )}

            <div className="prayer-grid">
              {ORDER.map((k) => (
                <div key={k} className={'prayer-card' + (next && next.key === k ? ' active' : '')}>
                  <div className="prayer-card-icon">{ICONS[k]}</div>
                  <div className="prayer-card-name">
                    <span className="en-only">{NAMES_EN[k]}</span>
                    <span className="ur-only ur-text">{NAMES_UR[k]}</span>
                  </div>
                  <div className="prayer-card-time">{to12h(timings[k])}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>About Prayer Timings</h2>
          <p>Prayer (Namaz) timings change daily based on the sun's position and vary by city. These timings are calculated live using each city's exact coordinates with the University of Islamic Sciences, Karachi calculation method, commonly used across Pakistan.</p>
          <h2>Why timings differ by city?</h2>
          <p>Sunrise and sunset shift with longitude and latitude, so each city in Pakistan has slightly different prayer timings even on the same day — cities further east (like Peshawar) see Fajr and Maghrib slightly earlier than cities further west.</p>
          <h2>What calculation method is used?</h2>
          <p>This tool uses the Karachi method (angle-based Fajr/Isha calculation), which is the standard adopted by most mosques and Islamic organizations in Pakistan.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>نماز کے اوقات کے بارے میں</h2>
          <p>نماز کے اوقات روزانہ سورج کی پوزیشن کے مطابق تبدیل ہوتے ہیں اور شہر کے لحاظ سے مختلف ہوتے ہیں۔ یہ اوقات ہر شہر کے صحیح جغرافیائی محل وقوع سے کراچی کیلکولیشن میتھڈ کے مطابق لائیو حاصل کیے جاتے ہیں۔</p>
          <h2>شہر کے مطابق اوقات مختلف کیوں ہوتے ہیں؟</h2>
          <p>طلوع اور غروب آفتاب کے اوقات جغرافیائی محل وقوع کے مطابق تبدیل ہوتے ہیں، اسی لیے ہر شہر کے اوقات میں تھوڑا فرق ہوتا ہے۔</p>
        </div>
      </article>
    </div>
  )
}