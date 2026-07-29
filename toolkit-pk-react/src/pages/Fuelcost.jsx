import { useEffect, useState } from 'react'
import Select from '../components/Select.jsx'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'How is trip fuel cost calculated?',
    aEn: "Divide the trip distance by your vehicle's fuel efficiency to get litres needed, then multiply by the current fuel price per litre.",
    qUr: 'سفر کا فیول خرچہ کیسے نکالا جاتا ہے؟',
    aUr: 'سفر کی مسافت کو اپنی گاڑی کی فیول ایفیشنسی سے تقسیم کر کے درکار لیٹرز معلوم کریں، پھر موجودہ فی لیٹر قیمت سے ضرب دیں۔',
  },
  {
    qEn: 'Where does the fuel price used in this calculator come from?',
    aEn: 'You can enter the current petrol/diesel price yourself, since prices are revised periodically by the government and vary slightly by region.',
    qUr: 'اس کیلکولیٹر میں استعمال ہونے والی فیول قیمت کہاں سے آتی ہے؟',
    aUr: 'آپ خود موجودہ پیٹرول/ڈیزل قیمت درج کر سکتے ہیں، کیونکہ قیمتیں حکومت کی طرف سے وقتاً فوقتاً تبدیل ہوتی رہتی ہیں اور علاقے کے حساب سے تھوڑی مختلف ہو سکتی ہیں۔',
  },
  {
    qEn: 'Does fuel price vary across Pakistan?',
    aEn: 'The government sets one official price nationwide, though remote areas like Gilgit-Baltistan, Chitral, and Azad Kashmir may see a slightly higher price due to transport costs.',
    qUr: 'کیا پاکستان میں فیول قیمت مختلف علاقوں میں مختلف ہے؟',
    aUr: 'حکومت پورے ملک کے لیے ایک ہی سرکاری قیمت مقرر کرتی ہے، البتہ گلگت بلتستان، چترال اور آزاد کشمیر جیسے دور دراز علاقوں میں ترسیل کے اخراجات کی وجہ سے تھوڑا اضافہ ہو سکتا ہے۔',
  },
  {
    qEn: 'Can I use this for both petrol and diesel vehicles?',
    aEn: "Yes, simply enter your vehicle's actual mileage and the current price of whichever fuel type it uses.",
    qUr: 'کیا یہ پیٹرول اور ڈیزل دونوں گاڑیوں کے لیے استعمال ہو سکتا ہے؟',
    aUr: 'جی ہاں، بس اپنی گاڑی کی اصل مائلیج اور استعمال ہونے والے فیول کی موجودہ قیمت درج کریں۔',
  },
]

/* ------------------------------------------------------------------
   Pakistan's petrol/diesel prices are fixed nationally by OGRA every
   fortnight — there is no free live-price API for this. So instead of
   faking a "per-city API", we give you one place (below) to update the
   two numbers every time OGRA announces new prices, and we apply a
   small, realistic surcharge for remote/hard-to-supply regions where
   pump prices genuinely run a bit higher because of transport cost —
   which is the "city to city difference" that actually exists in Pakistan.
   ------------------------------------------------------------------ */

// 👉 UPDATE THESE TWO NUMBERS EVERY TIME THE GOVERNMENT REVISES FUEL PRICES
const BASE_PRICES = {
  petrol: { key: 'petrol', en: 'Petrol (Regular)', ur: 'پیٹرول', rate: 272 },
  diesel: { key: 'diesel', en: 'High Speed Diesel', ur: 'ڈیزل', rate: 278 },
  hioctane: { key: 'hioctane', en: 'Hi-Octane', ur: 'ہائی آکٹین', rate: 305 },
}
const PRICE_LAST_UPDATED = 'July 2026' // update this label alongside the rates above

const CITIES = [
  { value: 'Karachi', label: 'Karachi', extra: 0 },
  { value: 'Lahore', label: 'Lahore', extra: 0 },
  { value: 'Islamabad', label: 'Islamabad', extra: 0 },
  { value: 'Rawalpindi', label: 'Rawalpindi', extra: 0 },
  { value: 'Faisalabad', label: 'Faisalabad', extra: 0 },
  { value: 'Multan', label: 'Multan', extra: 0 },
  { value: 'Peshawar', label: 'Peshawar', extra: 0 },
  { value: 'Quetta', label: 'Quetta', extra: 1.5 },
  { value: 'Sialkot', label: 'Sialkot', extra: 0 },
  { value: 'Hyderabad', label: 'Hyderabad', extra: 0 },
  { value: 'Muzaffarabad', label: 'Muzaffarabad (AJK)', extra: 3 },
  { value: 'Gilgit', label: 'Gilgit', extra: 8 },
  { value: 'Skardu', label: 'Skardu', extra: 10 },
  { value: 'Chitral', label: 'Chitral', extra: 6 },
]

export default function FuelCost() {
  const [fuelType, setFuelType] = useState('petrol')
  const [city, setCity] = useState('Karachi')
  const [distance, setDistance] = useState('')
  const [mileage, setMileage] = useState('')
  const [price, setPrice] = useState(String(BASE_PRICES.petrol.rate))
  const [roundTrip, setRoundTrip] = useState(false)
  const [result, setResult] = useState(null)

  // Auto-fill price whenever fuel type or city changes (user can still edit it manually)
  useEffect(() => {
    const c = CITIES.find((x) => x.value === city)
    const base = BASE_PRICES[fuelType].rate
    setPrice(String(Math.round((base + (c?.extra || 0)) * 10) / 10))
  }, [fuelType, city])

  function calculate() {
    const d = (parseFloat(distance) || 0) * (roundTrip ? 2 : 1)
    const m = parseFloat(mileage) || 1
    const p = parseFloat(price) || 0
    const litersNeeded = d / m
    const totalCost = litersNeeded * p
    const costPerKm = totalCost / (d || 1)
    setResult({ litersNeeded, totalCost, costPerKm, distance: d })
  }

  const fuelOptions = Object.values(BASE_PRICES).map((f) => ({ value: f.key, label: f.en }))
  const cityOptions = CITIES.map((c) => ({ value: c.value, label: c.label }))

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.fuelCost} />
      <Breadcrumb toolEn="Petrol / Fuel Cost" toolUr="پیٹرول لاگت کیلکولیٹر" path="/fuel-cost-calculator" />
      <div className="calc-header">
        <h1 className="en-only">Petrol / Fuel Cost Calculator</h1>
        <h1 className="ur-only ur-text">پیٹرول / فیول خرچہ کیلکولیٹر</h1>
        <p className="calc-intro en-only">Calculate fuel needed and total cost for your trip — by fuel type and city.</p>
        <p className="calc-intro ur-only ur-text">اپنے سفر کے لیے درکار پیٹرول اور کل خرچہ فیول کی قسم اور شہر کے حساب سے معلوم کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="rate-grid">
          <div className="field">
            <label><span className="en-only">Fuel Type</span><span className="ur-only ur-text">فیول کی قسم</span></label>
            <Select options={fuelOptions} value={fuelType} onChange={setFuelType} />
          </div>
          <div className="field">
            <label><span className="en-only">City</span><span className="ur-only ur-text">شہر</span></label>
            <Select options={cityOptions} value={city} onChange={setCity} searchable searchPlaceholder="Search city..." />
          </div>
        </div>

        <div className="field">
          <label><span className="en-only">Distance (km)</span><span className="ur-only ur-text">فاصلہ (کلومیٹر)</span></label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g. 250" />
          <button type="button" className={'toggle-row' + (roundTrip ? ' active' : '')} style={{ marginTop: 10 }} onClick={() => setRoundTrip((v) => !v)}>
            <span className="toggle-row-label">
              <span className="en-only">Round trip (there &amp; back)</span>
              <span className="ur-only ur-text">راؤنڈ ٹرپ (آنا جانا)</span>
            </span>
            <span className="toggle-switch">
              <svg viewBox="0 0 20 20" fill="none"><path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </button>
        </div>

        <div className="rate-grid">
          <div className="field">
            <label><span className="en-only">Vehicle Mileage (km/liter)</span><span className="ur-only ur-text">مائیلج (کلومیٹر فی لیٹر)</span></label>
            <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="e.g. 15" />
          </div>
          <div className="field">
            <label><span className="en-only">Price (PKR/liter)</span><span className="ur-only ur-text">قیمت (روپے/لیٹر)</span></label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <div className="hint en-only">Auto-filled for {city} — rates as of {PRICE_LAST_UPDATED}. Edit if the price has since changed.</div>
            <div className="hint ur-only ur-text">{city} کے لیے خودکار بھرا گیا — {PRICE_LAST_UPDATED} کی قیمت۔ اگر قیمت بدل چکی ہو تو خود درج کریں۔</div>
          </div>
        </div>

        <button className="btn" onClick={calculate}>
          <span className="en-only">✨ Calculate Fuel Cost</span>
          <span className="ur-only ur-text">✨ فیول خرچہ نکالیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">Total Fuel Cost</div>
            <div className="label ur-only ur-text">کل فیول خرچہ</div>
            <div className="value">Rs. {Math.round(result.totalCost).toLocaleString()}</div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">⛽</div>
                <div className="stat-value">{result.litersNeeded.toFixed(1)} L</div>
                <div className="stat-label en-only">Fuel Needed</div>
                <div className="stat-label ur-only ur-text">درکار فیول</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🛣️</div>
                <div className="stat-value">{result.distance} km</div>
                <div className="stat-label en-only">Total Distance</div>
                <div className="stat-label ur-only ur-text">کل فاصلہ</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💵</div>
                <div className="stat-value">Rs. {result.costPerKm.toFixed(1)}</div>
                <div className="stat-label en-only">Cost per KM</div>
                <div className="stat-label ur-only ur-text">فی کلومیٹر خرچہ</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>How to save fuel on long trips?</h2>
          <p>Maintaining a steady speed, keeping tire pressure correct, and avoiding unnecessary idling can significantly improve your vehicle's mileage and reduce your total fuel cost.</p>
          <h2>Why petrol prices change often?</h2>
          <p>In Pakistan, petroleum prices are revised roughly every two weeks (fortnightly) by the government (via OGRA/the Finance Ministry), based on international crude oil prices and the PKR-USD exchange rate.</p>
          <h2>Do prices really differ by city?</h2>
          <p>The government sets one official ex-depot price for the whole country, so major cities like Karachi, Lahore, and Islamabad share the same rate. Remote regions such as Gilgit-Baltistan, Chitral, and Azad Kashmir can see a small extra transport surcharge at the pump, which this calculator accounts for.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>لمبے سفر میں فیول کیسے بچائیں؟</h2>
          <p>یکساں رفتار، ٹائر پریشر درست رکھنا اور غیر ضروری آئیڈلنگ سے بچنا مائیلج بہتر بناتا ہے۔</p>
          <h2>پیٹرول کی قیمت بار بار کیوں بدلتی ہے؟</h2>
          <p>پاکستان میں پیٹرولیم کی قیمتوں پر ہر پندرہ دن بعد نظرثانی ہوتی ہے، بین الاقوامی خام تیل کی قیمت اور ڈالر کے ریٹ کے مطابق۔</p>
          <h2>کیا قیمت واقعی شہر کے حساب سے مختلف ہوتی ہے؟</h2>
          <p>حکومت پورے ملک کے لیے ایک ہی سرکاری قیمت مقرر کرتی ہے، البتہ گلگت بلتستان، چترال اور آزاد کشمیر جیسے دور دراز علاقوں میں ترسیل کے اخراجات کی وجہ سے تھوڑا اضافہ ہو سکتا ہے۔</p>
        </div>
      </article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/fuel-cost-calculator" />
    </div>
  )
}