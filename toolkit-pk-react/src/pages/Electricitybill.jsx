import { useState } from 'react'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'How is my electricity bill estimated?',
    aEn: 'The estimate multiplies your entered units consumed by the applicable per-unit tariff slab rates used in Pakistan, giving an approximate bill amount.',
    qUr: 'میرا بجلی بل کیسے تخمینہ کیا جاتا ہے؟',
    aUr: 'یہ تخمینہ آپ کے درج کردہ استعمال شدہ یونٹس کو پاکستان میں لاگو فی یونٹ سلیب ریٹ سے ضرب دے کر تقریبی بل رقم بتاتا ہے۔',
  },
  {
    qEn: 'Why do electricity tariffs increase in slabs?',
    aEn: 'Pakistan uses a slab-based tariff system where the per-unit rate increases as your total monthly consumption crosses certain thresholds, to encourage conservation.',
    qUr: 'بجلی کے ٹیرف سلیبس میں کیوں بڑھتے ہیں؟',
    aUr: 'پاکستان میں سلیب کی بنیاد پر ٹیرف سسٹم ہے جہاں آپ کے ماہانہ استعمال کے مخصوص حد سے بڑھنے پر فی یونٹ ریٹ بڑھ جاتا ہے، تاکہ بجلی بچت کی حوصلہ افزائی ہو۔',
  },
  {
    qEn: 'Can I reduce my bill by using less electricity?',
    aEn: 'Yes, using energy-efficient appliances and LED bulbs can keep your usage within a lower slab, reducing your average per-unit rate.',
    qUr: 'کیا کم بجلی استعمال کر کے بل کم کیا جا سکتا ہے؟',
    aUr: 'جی ہاں، توانائی بچانے والے آلات اور ایل ای ڈی بلب استعمال کر کے آپ اپنا استعمال کم سلیب میں رکھ سکتے ہیں۔',
  },
  {
    qEn: 'Does this include taxes and surcharges?',
    aEn: 'This is a simplified estimate based on unit rates; your actual bill may also include taxes, fuel price adjustments, and other surcharges from your electricity provider.',
    qUr: 'کیا اس میں ٹیکس اور سرچارج شامل ہیں؟',
    aUr: 'یہ ایک آسان تخمینہ ہے جو یونٹ ریٹ پر مبنی ہے؛ آپ کے اصل بل میں ٹیکس، فیول ایڈجسٹمنٹ اور دیگر سرچارج بھی شامل ہو سکتے ہیں۔',
  },
]

const SLABS = [
  { upto: 50, rate: 8 },
  { upto: 100, rate: 14 },
  { upto: 200, rate: 20 },
  { upto: 300, rate: 28 },
  { upto: 700, rate: 38 },
  { upto: Infinity, rate: 48 },
]

function calcBillBreakdown(units) {
  let cost = 0
  let prev = 0
  const usedSlabs = []
  for (const s of SLABS) {
    if (units > prev) {
      const slabUnits = Math.min(units, s.upto) - prev
      const slabCost = slabUnits * s.rate
      cost += slabCost
      usedSlabs.push({ from: prev + 1, to: Math.min(units, s.upto), rate: s.rate, units: slabUnits, cost: slabCost })
      prev = s.upto
    } else break
  }
  return { cost, usedSlabs }
}

export default function ElectricityBill() {
  const [units, setUnits] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    const u = parseFloat(units) || 0
    const { cost: energyCost, usedSlabs } = calcBillBreakdown(u)
    const fuelAdj = u * 4.5
    const taxes = (energyCost + fuelAdj) * 0.08
    const total = energyCost + fuelAdj + taxes
    const energyPct = Math.round((energyCost / total) * 100) || 0
    const fuelPct = Math.round((fuelAdj / total) * 100) || 0
    const taxPct = 100 - energyPct - fuelPct
    setResult({ energyCost, fuelAdj, taxes, total, usedSlabs, energyPct, fuelPct, taxPct })
  }

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.electricityBill} />
      <Breadcrumb toolEn="Electricity Bill Estimator" toolUr="بجلی بل تخمینہ" path="/electricity-bill-calculator" />
      <div className="calc-header">
        <h1 className="en-only">Electricity Bill Calculator</h1>
        <h1 className="ur-only ur-text">بجلی بل کیلکولیٹر</h1>
        <p className="calc-intro en-only">Estimate your monthly electricity bill based on units consumed, with a full slab-wise breakdown.</p>
        <p className="calc-intro ur-only ur-text">استعمال شدہ یونٹس کی بنیاد پر اپنے ماہانہ بجلی کے بل کا مکمل تخمینہ لگائیں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Units Consumed (kWh)</span><span className="ur-only ur-text">استعمال شدہ یونٹس</span></label>
          <input type="number" value={units} onChange={(e) => setUnits(e.target.value)} placeholder="e.g. 350" />
          <div className="hint en-only">Check your meter reading or last month's bill for units consumed.</div>
          <div className="hint ur-only ur-text">اپنے میٹر یا پچھلے بل سے یونٹس چیک کریں۔</div>
        </div>

        <button className="btn" onClick={calculate}>
          <span className="en-only">✨ Estimate Bill</span>
          <span className="ur-only ur-text">✨ بل کا اندازہ لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">Estimated Bill</div>
            <div className="label ur-only ur-text">تخمینہ بل</div>
            <div className="value">Rs. {Math.round(result.total).toLocaleString()}</div>

            <div className="split-bar">
              <div className="split-bar-seg" style={{ width: `${result.energyPct}%`, background: 'linear-gradient(90deg, var(--green), var(--green-dark))' }} />
              <div className="split-bar-seg" style={{ width: `${result.fuelPct}%`, background: 'linear-gradient(90deg, var(--gold), #d4a017)' }} />
              <div className="split-bar-seg" style={{ width: `${result.taxPct}%`, background: 'linear-gradient(90deg, #94a3b8, #64748b)' }} />
            </div>
            <div className="split-legend">
              <div className="split-legend-item"><span className="split-legend-dot" style={{ background: 'var(--green)' }} /><span className="en-only">Energy ({result.energyPct}%)</span><span className="ur-only ur-text">توانائی ({result.energyPct}%)</span></div>
              <div className="split-legend-item"><span className="split-legend-dot" style={{ background: 'var(--gold)' }} /><span className="en-only">Fuel Adj. ({result.fuelPct}%)</span><span className="ur-only ur-text">فیول ایڈجسٹمنٹ ({result.fuelPct}%)</span></div>
              <div className="split-legend-item"><span className="split-legend-dot" style={{ background: '#64748b' }} /><span className="en-only">Taxes ({result.taxPct}%)</span><span className="ur-only ur-text">ٹیکس ({result.taxPct}%)</span></div>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">Rs. {Math.round(result.energyCost).toLocaleString()}</div>
                <div className="stat-label en-only">Energy Charges</div>
                <div className="stat-label ur-only ur-text">توانائی چارجز</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⛽</div>
                <div className="stat-value">Rs. {Math.round(result.fuelAdj).toLocaleString()}</div>
                <div className="stat-label en-only">Fuel Adjustment</div>
                <div className="stat-label ur-only ur-text">فیول ایڈجسٹمنٹ</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🧾</div>
                <div className="stat-value">Rs. {Math.round(result.taxes).toLocaleString()}</div>
                <div className="stat-label en-only">Taxes</div>
                <div className="stat-label ur-only ur-text">ٹیکس</div>
              </div>
            </div>

            <div className="label en-only" style={{ marginTop: 18 }}>Slab-wise Breakdown</div>
            <div className="label ur-only ur-text" style={{ marginTop: 18 }}>سلیب کے مطابق تفصیل</div>
            <div className="timeline">
              {result.usedSlabs.map((s, i) => (
                <div key={i} className={'timeline-item' + (i === result.usedSlabs.length - 1 ? ' active' : ' done')}>
                  <div className="timeline-dot" />
                  <div className="timeline-title">
                    <span className="en-only">{s.from}–{s.to} units @ Rs. {s.rate}/unit</span>
                    <span className="ur-only ur-text">{s.from}–{s.to} یونٹس @ روپے {s.rate}/یونٹ</span>
                  </div>
                  <div className="timeline-sub en-only">Rs. {Math.round(s.cost).toLocaleString()} ({s.units} units)</div>
                  <div className="timeline-sub ur-only ur-text">روپے {Math.round(s.cost).toLocaleString()} ({s.units} یونٹس)</div>
                </div>
              ))}
            </div>

            <div className="nisab-note not-due" style={{ marginTop: 14 }}>
              <span className="en-only">This is an approximate estimate. Actual bill varies by DISCO, meter type, and government-notified rates.</span>
              <span className="ur-only ur-text">یہ صرف ایک تخمینہ ہے۔ اصل بل ڈسکو، میٹر کی قسم اور سرکاری نرخوں کے مطابق مختلف ہو سکتا ہے۔</span>
            </div>
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>How is the electricity bill calculated?</h2>
          <p>Electricity bills in Pakistan use slab-based pricing — the more units you consume, the higher the per-unit rate for the extra units. Fuel price adjustment and taxes are added on top of the base energy charges.</p>
          <h2>How to reduce your bill?</h2>
          <p>Using energy-efficient appliances, LED bulbs, and reducing usage during peak hours can help keep your consumption within a lower slab, lowering your average per-unit rate.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>بجلی کا بل کیسے حساب ہوتا ہے؟</h2>
          <p>پاکستان میں بجلی کا بل سلیب کی بنیاد پر لگتا ہے — جتنے زیادہ یونٹس استعمال ہوں گے، اضافی یونٹس کی قیمت اتنی ہی زیادہ ہوگی۔</p>
          <h2>بل کیسے کم کریں؟</h2>
          <p>توانائی بچانے والے آلات اور ایل ای ڈی بلب استعمال کر کے آپ اپنا استعمال کم سلیب میں رکھ سکتے ہیں۔</p>
        </div>
      </article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/electricity-bill-calculator" />
    </div>
  )
}