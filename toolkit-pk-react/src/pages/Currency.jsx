import { useEffect, useRef, useState } from 'react'

const CURRENCY_NAMES = {
  PKR: 'Pakistani Rupee', USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', SAR: 'Saudi Riyal',
  AED: 'UAE Dirham', INR: 'Indian Rupee', BDT: 'Bangladeshi Taka', CNY: 'Chinese Yuan', JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar', AUD: 'Australian Dollar', CHF: 'Swiss Franc', TRY: 'Turkish Lira', MYR: 'Malaysian Ringgit',
  SGD: 'Singapore Dollar', THB: 'Thai Baht', QAR: 'Qatari Riyal', KWD: 'Kuwaiti Dinar', BHD: 'Bahraini Dinar',
  OMR: 'Omani Rial', EGP: 'Egyptian Pound', NZD: 'New Zealand Dollar', ZAR: 'South African Rand', RUB: 'Russian Ruble',
  KRW: 'South Korean Won', IDR: 'Indonesian Rupiah', HKD: 'Hong Kong Dollar', AFN: 'Afghan Afghani', NPR: 'Nepalese Rupee',
  LKR: 'Sri Lankan Rupee', IRR: 'Iranian Rial', IQD: 'Iraqi Dinar', JOD: 'Jordanian Dinar', LBP: 'Lebanese Pound',
  MAD: 'Moroccan Dirham', DZD: 'Algerian Dinar', TND: 'Tunisian Dinar', NGN: 'Nigerian Naira', KES: 'Kenyan Shilling',
  PHP: 'Philippine Peso', VND: 'Vietnamese Dong', BRL: 'Brazilian Real', MXN: 'Mexican Peso', SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone', DKK: 'Danish Krone', PLN: 'Polish Zloty', CZK: 'Czech Koruna', ILS: 'Israeli Shekel',
}
const label = (code) => (CURRENCY_NAMES[code] ? `${code} — ${CURRENCY_NAMES[code]}` : code)

function CurrencySelect({ rates, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleOutside)
    return () => document.removeEventListener('click', handleOutside)
  }, [])

  const codes = rates ? Object.keys(rates).sort() : []
  const filtered = codes.filter((c) => label(c).toUpperCase().includes(query.toUpperCase()))

  return (
    <div className={'cselect' + (open ? ' open' : '')} ref={ref}>
      <button type="button" className="cselect-trigger" onClick={() => { setOpen(!open); setQuery('') }}>
        <span>{label(value)}</span>
        <svg className="chev" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="cselect-panel">
        <div className="cselect-search">
          <input type="text" placeholder="Search currency..." value={query} onChange={(e) => setQuery(e.target.value)} onClick={(e) => e.stopPropagation()} autoFocus />
        </div>
        <div className="cselect-list">
          {filtered.length === 0 && <div className="cselect-empty">No currency found</div>}
          {filtered.map((code) => (
            <div
              key={code}
              className={'cselect-option' + (code === value ? ' selected' : '')}
              onClick={() => { onChange(code); setOpen(false) }}
            >
              {label(code)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CACHE_KEY = 'toolkitpk_fx_cache'
const CACHE_HOURS = 6

export default function Currency() {
  const [rates, setRates] = useState(null)
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('PKR')
  const [to, setTo] = useState('USD')
  const [status, setStatus] = useState({ en: '⏳ Loading live exchange rate...', ur: '⏳ لائیو ایکسچینج ریٹ لوڈ ہو رہا ہے...', error: false })

  useEffect(() => {
    function getCached() {
      const raw = localStorage.getItem(CACHE_KEY)
      if (!raw) return null
      try {
        const data = JSON.parse(raw)
        const ageHours = (Date.now() - data.timestamp) / (1000 * 60 * 60)
        return ageHours < CACHE_HOURS ? data : null
      } catch { return null }
    }

    const cached = getCached()
    if (cached) {
      setRates(cached.rates)
      setStatus({ en: `✅ Live rate loaded (cached ${cached.time})`, ur: `✅ لائیو ریٹ لوڈ ہو گیا`, error: false })
      return
    }

    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        setRates(data.rates)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ rates: data.rates, timestamp: Date.now(), time: new Date().toLocaleTimeString() }))
        setStatus({ en: '✅ Live rate loaded just now.', ur: '✅ لائیو ریٹ ابھی لوڈ ہوا۔', error: false })
      })
      .catch(() => setStatus({ en: '⚠️ Could not load live rate.', ur: '⚠️ لائیو ریٹ لوڈ نہیں ہو سکا۔', error: true }))
  }, [])

  let result = null
  let rate = null
  if (rates) {
    const amt = parseFloat(amount) || 0
    result = (amt / rates[from]) * rates[to]
    rate = rates[to] / rates[from]
  }

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Currency Converter</h1>
        <h1 className="ur-only ur-text">کرنسی کنورٹر</h1>
        <p className="calc-intro en-only">Convert PKR to USD, EUR, SAR, AED, GBP and more — using today's live exchange rate.</p>
        <p className="calc-intro ur-only ur-text">آج کے لائیو ایکسچینج ریٹ کے ساتھ کرنسیاں تبدیل کریں۔</p>
      </div>

      <div className="calc-box">
        <div style={{ fontSize: 12.5, marginBottom: 18, color: status.error ? '#b91c1c' : '#6b7280' }}>
          <span className="en-only">{status.en}</span>
          <span className="ur-only ur-text">{status.ur}</span>
        </div>

        <div className="rate-grid" style={{ alignItems: 'end' }}>
          <div className="field">
            <label><span className="en-only">Amount</span><span className="ur-only ur-text">رقم</span></label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="field">
            <label><span className="en-only">From</span><span className="ur-only ur-text">سے</span></label>
            <CurrencySelect rates={rates} value={from} onChange={setFrom} />
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '4px 0 18px' }}>
          <button type="button" onClick={() => { setFrom(to); setTo(from) }} style={{ border: '1.5px solid var(--border)', background: '#fff', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: 16 }} title="Swap">⇅</button>
        </div>

        <div className="field">
          <label><span className="en-only">To</span><span className="ur-only ur-text">میں</span></label>
          <CurrencySelect rates={rates} value={to} onChange={setTo} />
        </div>

        {rates && (
          <div className="result-box show">
            <div className="label en-only">Converted Amount</div>
            <div className="label ur-only ur-text">تبدیل شدہ رقم</div>
            <div className="value">{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}</div>
            <div className="sub">1 {from} = {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}</div>
            <div className="badge-pill good">
              <span className="badge-icon">💱</span>
              <span className="en-only">Live market rate</span>
              <span className="ur-only ur-text">لائیو مارکیٹ ریٹ</span>
            </div>
          </div>
        )}
      </div>

      <article className="article">
  <div className="en-only">
    <h2>How does this converter work?</h2>
    <p>This tool fetches live foreign exchange rates automatically from real-time market data, so the conversion you see reflects current rates rather than outdated fixed values. You can convert PKR to USD, or between dozens of other world currencies.</p>
    <h2>Why do exchange rates change?</h2>
    <p>Currency values fluctuate constantly based on factors like interest rates, inflation, trade balances, political stability, and global demand for a currency. Because of this, the same amount of PKR can buy a different amount of USD from one day to the next.</p>
    <h2>When to use a currency converter</h2>
    <p>Whether you're sending remittances, planning to travel, shopping from an international store, or just curious about today's rate, a quick and accurate currency converter saves you from manually checking multiple sources.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>یہ کنورٹر کیسے کام کرتا ہے؟</h2>
    <p>یہ ٹول خودکار طور پر لائیو ایکسچینج ریٹ حاصل کرتا ہے، تاکہ آپ کو ہمیشہ موجودہ مارکیٹ ریٹ کے مطابق درست نتیجہ ملے۔</p>
    <h2>ایکسچینج ریٹ کیوں بدلتا ہے؟</h2>
    <p>کرنسی کی قیمت سود کی شرح، مہنگائی، تجارتی توازن اور عالمی طلب جیسے عوامل کی بنیاد پر روزانہ بدلتی رہتی ہے۔</p>
  </div>
</article>
    </div>
  )
}