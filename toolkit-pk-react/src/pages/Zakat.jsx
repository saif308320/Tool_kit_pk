import { useEffect, useState } from 'react'
import Select from '../components/Select.jsx'

/* ---------- Inline SVG icons (replaces emoji that wasn't rendering) ---------- */
const IconCoinGold = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" fill="url(#goldGrad)" stroke="#b8860b" strokeWidth="1" />
    <circle cx="12" cy="12" r="6.4" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1" />
    <path d="M12 8.2v7.6M9.6 10.1c0-1 .9-1.7 2.4-1.7s2.4.6 2.4 1.5c0 2.1-4.8.9-4.8 3 0 .9 1 1.6 2.4 1.6s2.4-.6 2.4-1.6" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.2" strokeLinecap="round" />
    <defs>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0" stopColor="#f5cf5c" />
        <stop offset="1" stopColor="#c9931a" />
      </linearGradient>
    </defs>
  </svg>
)

const IconCoinSilver = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" fill="url(#silverGrad)" stroke="#94a3b8" strokeWidth="1" />
    <circle cx="12" cy="12" r="6.4" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" />
    <path d="M12 8.2v7.6M9.6 10.1c0-1 .9-1.7 2.4-1.7s2.4.6 2.4 1.5c0 2.1-4.8.9-4.8 3 0 .9 1 1.6 2.4 1.6s2.4-.6 2.4-1.6" stroke="#fff" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" />
    <defs>
      <linearGradient id="silverGrad" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0" stopColor="#e6eaf0" />
        <stop offset="1" stopColor="#9aa5b4" />
      </linearGradient>
    </defs>
  </svg>
)

const IconRefresh = ({ size = 17, spinning = false }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    style={{ animation: spinning ? 'spin 0.9s linear infinite' : 'none' }}
  >
    <path d="M20 11a8 8 0 1 0-2.34 5.66M20 5v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconCheck = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#16a34a" />
    <path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconWarn = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3.5l9.8 17H2.2L12 3.5z" fill="#f59e0b" />
    <path d="M12 9.5v4.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="#fff" />
  </svg>
)

const IconClock = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#64748b" strokeWidth="1.6" />
    <path d="M12 7v5l3.2 2" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconBadgeCheck = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2.4 1.4 2.7-.3 1.2 2.4 2.4 1.2-.3 2.7L22 12l-1.6 2.6.3 2.7-2.4 1.2-1.2 2.4-2.7-.3L12 22l-2.4-1.4-2.7.3-1.2-2.4-2.4-1.2.3-2.7L2 12l1.6-2.6-.3-2.7 2.4-1.2 1.2-2.4 2.7.3L12 2z" fill="#3730a3" />
    <path d="M8.5 12.5l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const NISAB_OPTIONS = [
  { value: 'silver', label: 'Silver Nisab (52.5 tola) — Recommended', icon: <IconCoinSilver /> },
  { value: 'gold', label: 'Gold Nisab (7.5 tola)', icon: <IconCoinGold /> },
]

/* ✅ Your live GoldAPI key goes here — this is the ONLY place it should be */
const GOLDAPI_KEY = 'goldapi-a68de977d18973cdc946adb7c8c408f6-io'
const GRAMS_PER_TOLA = 11.6638
const CACHE_KEY = 'toolkitpk_rates_cache'
const CACHE_HOURS = 6

function getCachedRates() {
  const raw = localStorage.getItem(CACHE_KEY)
  if (!raw) return null
  try {
    const data = JSON.parse(raw)
    const ageHours = (Date.now() - data.timestamp) / (1000 * 60 * 60)
    if (ageHours < CACHE_HOURS) return data
    return null
  } catch {
    return null
  }
}

function cacheRates(goldPerTola, silverPerTola) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    goldPerTola, silverPerTola, timestamp: Date.now(), time: new Date().toLocaleTimeString(),
  }))
}

export default function Zakat() {
  const [goldRate, setGoldRate] = useState('')
  const [silverRate, setSilverRate] = useState('')
  const [goldTola, setGoldTola] = useState('')
  const [silverTola, setSilverTola] = useState('')
  const [cash, setCash] = useState('')
  const [investments, setInvestments] = useState('')
  const [nisabBasis, setNisabBasis] = useState('silver')
  const [status, setStatus] = useState({ en: 'Loading live rate...', ur: 'لائیو ریٹ لوڈ ہو رہا ہے...', kind: 'loading' })
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState(null)

  async function fetchLiveRates() {
    const cached = getCachedRates()
    if (cached) {
      setGoldRate(cached.goldPerTola)
      setSilverRate(cached.silverPerTola)
      setStatus({ en: `Rate loaded (cached ${cached.time})`, ur: `لائیو ریٹ لوڈ ہو گیا (${cached.time})`, kind: 'ok' })
      return
    }

    if (!GOLDAPI_KEY || GOLDAPI_KEY.includes('PASTE_YOUR')) {
      setStatus({
        en: 'API key not set yet. See README — get a free key from goldapi.io and paste it in Zakat.jsx. Enter rates manually for now.',
        ur: 'ابھی API key سیٹ نہیں ہے۔ خود ریٹ درج کریں۔',
        kind: 'warn',
      })
      return
    }

    setFetching(true)
    setStatus({ en: 'Fetching live rate...', ur: 'لائیو ریٹ حاصل ہو رہا ہے...', kind: 'loading' })

    try {
      const fxRes = await fetch('https://open.er-api.com/v6/latest/USD')
      const fxData = await fxRes.json()
      const usdToPkr = fxData.rates.PKR

      const goldRes = await fetch('https://www.goldapi.io/api/XAU/USD', {
        headers: { 'x-access-token': GOLDAPI_KEY, 'Content-Type': 'application/json' },
      })
      const goldData = await goldRes.json()
      const goldUsdPerGram = goldData.price_gram_24k

      const silverRes = await fetch('https://www.goldapi.io/api/XAG/USD', {
        headers: { 'x-access-token': GOLDAPI_KEY, 'Content-Type': 'application/json' },
      })
      const silverData = await silverRes.json()
      const silverUsdPerGram = silverData.price_gram_24k

      const goldPkrPerTola = Math.round(goldUsdPerGram * usdToPkr * GRAMS_PER_TOLA)
      const silverPkrPerTola = Math.round(silverUsdPerGram * usdToPkr * GRAMS_PER_TOLA)

      setGoldRate(goldPkrPerTola)
      setSilverRate(silverPkrPerTola)
      cacheRates(goldPkrPerTola, silverPkrPerTola)
      setStatus({ en: 'Live rate loaded just now.', ur: 'لائیو ریٹ ابھی لوڈ ہوا۔', kind: 'ok' })
    } catch (err) {
      setStatus({
        en: 'Could not fetch live rate. Please enter the rate manually below.',
        ur: 'لائیو ریٹ حاصل نہیں ہو سکا۔ براہ کرم نیچے خود ریٹ درج کریں۔',
        kind: 'warn',
      })
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => { fetchLiveRates() }, [])

  function calculateZakat() {
    const g = parseFloat(goldRate) || 0
    const s = parseFloat(silverRate) || 0
    const gt = parseFloat(goldTola) || 0
    const st = parseFloat(silverTola) || 0
    const c = parseFloat(cash) || 0
    const i = parseFloat(investments) || 0

    const goldValue = gt * g
    const silverValue = st * s
    const total = goldValue + silverValue + c + i
    const goldNisabValue = g * 7.5
    const silverNisabValue = s * 52.5
    const nisabValue = nisabBasis === 'gold' ? goldNisabValue : silverNisabValue
    const basisRate = nisabBasis === 'gold' ? g : s
    const zakat = total * 0.025

    let status = 'not-due'
    if (basisRate === 0) status = 'unknown'
    else if (total >= nisabValue) status = 'due'

    setResult({ zakat, total, nisabValue, status, nisabBasis })
  }

  const statusIcon = status.kind === 'ok' ? <IconCheck /> : status.kind === 'warn' ? <IconWarn /> : <IconClock />

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <h1 className="en-only">Zakat Calculator</h1>
        <h1 className="ur-only ur-text">زکوٰۃ کیلکولیٹر</h1>
        <p className="calc-intro en-only">Enter today's gold & silver rate, plus your cash and savings, to calculate your exact Zakat and check if it's due on you.</p>
        <p className="calc-intro ur-only ur-text">آج کے سونے اور چاندی کے ریٹ کے ساتھ اپنی نقدی اور بچت درج کریں۔</p>
      </div>

      <div className="calc-box">
        <p className="section-title">
          <span className="title-icon title-icon-gold"><IconCoinGold size={13} /></span>
          <span className="en-only">Today's Gold & Silver Rate (Pakistan)</span>
          <span className="ur-only ur-text">آج کا سونا اور چاندی کا ریٹ (پاکستان)</span>
        </p>

        <button
          type="button"
          className="btn btn-dark"
          onClick={fetchLiveRates}
          disabled={fetching}
        >
          <IconRefresh spinning={fetching} />
          <span className="en-only">Fetch Today's Rate Automatically</span>
          <span className="ur-only ur-text">آج کا ریٹ خود بخود حاصل کریں</span>
        </button>

        <div className={`status-line status-${status.kind}`}>
          {statusIcon}
          <span className="en-only">{status.en}</span>
          <span className="ur-only ur-text">{status.ur}</span>
        </div>

        <div className="rate-grid">
          <div className="field rate-card rate-card-gold">
            <label>
              <span className="rate-icon"><IconCoinGold size={16} /></span>
              <span className="en-only">Gold rate (PKR per tola)</span>
              <span className="ur-only ur-text">سونے کا ریٹ (روپے فی تولہ)</span>
            </label>
            <input type="number" value={goldRate} onChange={(e) => setGoldRate(e.target.value)} placeholder="e.g. 275000" />
            <div className="hint en-only">1 tola = 11.66 grams.</div>
            <div className="hint ur-only ur-text">1 تولہ = 11.66 گرام۔</div>
          </div>
          <div className="field rate-card rate-card-silver">
            <label>
              <span className="rate-icon"><IconCoinSilver size={16} /></span>
              <span className="en-only">Silver rate (PKR per tola)</span>
              <span className="ur-only ur-text">چاندی کا ریٹ (روپے فی تولہ)</span>
            </label>
            <input type="number" value={silverRate} onChange={(e) => setSilverRate(e.target.value)} placeholder="e.g. 3200" />
            <div className="hint en-only">1 tola = 11.66 grams.</div>
            <div className="hint ur-only ur-text">1 تولہ = 11.66 گرام۔</div>
          </div>
        </div>

        <p className="section-title">
          <span className="en-only">Your Assets</span>
          <span className="ur-only ur-text">آپ کے اثاثے</span>
        </p>

        <div className="field">
          <label><span className="en-only">Gold you own (in tola)</span><span className="ur-only ur-text">آپ کے پاس سونا (تولہ میں)</span></label>
          <input type="number" value={goldTola} onChange={(e) => setGoldTola(e.target.value)} placeholder="0" />
        </div>
        <div className="field">
          <label><span className="en-only">Silver you own (in tola)</span><span className="ur-only ur-text">آپ کے پاس چاندی (تولہ میں)</span></label>
          <input type="number" value={silverTola} onChange={(e) => setSilverTola(e.target.value)} placeholder="0" />
        </div>
        <div className="field">
          <label><span className="en-only">Cash & bank balance (PKR)</span><span className="ur-only ur-text">نقدی اور بینک بیلنس (روپے)</span></label>
          <input type="number" value={cash} onChange={(e) => setCash(e.target.value)} placeholder="0" />
        </div>
        <div className="field">
          <label><span className="en-only">Investments / savings (PKR)</span><span className="ur-only ur-text">سرمایہ کاری / بچت (روپے)</span></label>
          <input type="number" value={investments} onChange={(e) => setInvestments(e.target.value)} placeholder="0" />
        </div>

        <p className="section-title">
          <span className="title-icon title-icon-silver"><IconCoinSilver size={13} /></span>
          <span className="en-only">Nisab Basis</span>
          <span className="ur-only ur-text">نصاب کی بنیاد</span>
        </p>
        <div className="field">
          <Select options={NISAB_OPTIONS} value={nisabBasis} onChange={setNisabBasis} />
          <div className="hint en-only">Silver Nisab is lower and more commonly used, so more people qualify to give Zakat.</div>
          <div className="hint ur-only ur-text">چاندی کا نصاب کم ہوتا ہے اور عام طور پر استعمال ہوتا ہے۔</div>
        </div>

        <button className="btn" onClick={calculateZakat}>
          <span className="en-only">Calculate Zakat</span>
          <span className="ur-only ur-text">زکوٰۃ کا حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">Your Zakat Amount</div>
            <div className="label ur-only ur-text">آپ کی زکوٰۃ کی رقم</div>
            <div className="value">Rs. {Math.round(result.zakat).toLocaleString()}</div>
            <div className="sub">
              <span className="en-only">Total wealth: Rs. {Math.round(result.total).toLocaleString()}</span>
              <span className="ur-only ur-text">کل دولت: روپے {Math.round(result.total).toLocaleString()}</span>
            </div>
            <div className="badge-pill info">
              <span className="badge-icon">{result.nisabBasis === 'gold' ? <IconCoinGold size={14} /> : <IconCoinSilver size={14} />}</span>
              <span className="en-only">Nisab used: {result.nisabBasis === 'gold' ? 'Gold (7.5 tola)' : 'Silver (52.5 tola)'} — Rs. {Math.round(result.nisabValue).toLocaleString()}</span>
              <span className="ur-only ur-text">نصاب: {result.nisabBasis === 'gold' ? 'سونا' : 'چاندی'} — روپے {Math.round(result.nisabValue).toLocaleString()}</span>
            </div>
            {result.status === 'unknown' && (
              <div className="nisab-note not-due">
                <span className="en-only">Enter today's {result.nisabBasis} rate above to check if Zakat is obligatory on you.</span>
                <span className="ur-only ur-text">اوپر آج کا ریٹ درج کریں۔</span>
              </div>
            )}
            {result.status === 'due' && (
              <div className="nisab-note due">
                <span className="note-icon"><IconBadgeCheck size={14} /></span>
                <span className="en-only">Your wealth exceeds the Nisab. Zakat is obligatory on you.</span>
                <span className="ur-only ur-text">آپ کی دولت نصاب سے زیادہ ہے۔ آپ پر زکوٰۃ فرض ہے۔</span>
              </div>
            )}
            {result.status === 'not-due' && (
              <div className="nisab-note not-due">
                <span className="en-only">Your wealth is below the Nisab. Zakat is not obligatory.</span>
                <span className="ur-only ur-text">آپ کی دولت نصاب سے کم ہے۔ زکوٰۃ فرض نہیں۔</span>
              </div>
            )}
          </div>
        )}
      </div>

      <article className="article">
  <div className="en-only">
    <h2>What is Zakat?</h2>
    <p>Zakat is one of the five pillars of Islam and is obligatory on every Muslim whose total wealth exceeds the Nisab threshold for one full lunar (Hijri) year. It is calculated as 2.5% of your total qualifying wealth — including gold, silver, cash, savings, and investments — and is meant to purify wealth while supporting those in need.</p>
    <h2>What is Nisab?</h2>
    <p>Nisab is the minimum amount of wealth a Muslim must own before Zakat becomes obligatory. It is commonly based on 52.5 tola (612.35 grams) of silver, or alternatively 7.5 tola (87.48 grams) of gold. Most scholars recommend using the silver Nisab, since it is lower in value and allows more people to fulfill this obligation.</p>
    <h2>Who must pay Zakat?</h2>
    <p>Zakat is due on any adult Muslim of sound mind whose total wealth — after subtracting debts — stays above the Nisab threshold for a full lunar year. This includes cash in hand, bank balances, gold, silver, and business or investment assets, but generally excludes your primary home, personal vehicle, and everyday household items.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>زکوٰۃ کیا ہے؟</h2>
    <p>زکوٰۃ اسلام کے پانچ ارکان میں سے ایک ہے اور ہر اس مسلمان پر فرض ہے جس کی کل دولت ایک مکمل قمری سال تک نصاب کی حد سے زیادہ رہے۔ یہ کل مالیت کا 2.5 فیصد ہوتی ہے، جس میں سونا، چاندی، نقدی اور سرمایہ کاری شامل ہیں۔</p>
    <h2>نصاب کیا ہے؟</h2>
    <p>نصاب وہ کم از کم مقدار ہے جو ایک مسلمان کے پاس ہونی چاہیے تاکہ اس پر زکوٰۃ فرض ہو۔ عام طور پر یہ 52.5 تولہ چاندی یا 7.5 تولہ سونے کی مالیت پر مبنی ہوتا ہے۔</p>
    <h2>زکوٰۃ کس پر فرض ہے؟</h2>
    <p>زکوٰۃ ہر بالغ اور عاقل مسلمان پر فرض ہے جس کی کل دولت، قرض منہا کرنے کے بعد، ایک مکمل سال تک نصاب سے زیادہ رہے۔</p>
  </div>
</article>
    </div>
  )
}