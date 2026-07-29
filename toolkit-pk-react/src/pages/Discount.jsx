import { useState } from 'react'
import Select from '../components/Select.jsx'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'How is the discounted price calculated?',
    aEn: 'Multiply the original price by the discount percentage to find the amount saved, then subtract that from the original price to get the final price.',
    qUr: 'ڈسکاؤنٹ کی قیمت کیسے نکالی جاتی ہے؟',
    aUr: 'اصل قیمت کو ڈسکاؤنٹ فیصد سے ضرب دے کر بچت کی رقم معلوم کریں، پھر اسے اصل قیمت سے منہا کر کے حتمی قیمت حاصل کریں۔',
  },
  {
    qEn: 'Can I calculate multiple discounts stacked together?',
    aEn: 'Stacked discounts are applied one after another on the reduced price, not added together — for example 20% then 10% off is not the same as 30% off.',
    qUr: 'کیا میں ایک ساتھ کئی ڈسکاؤنٹ لگا سکتا ہوں؟',
    aUr: 'ایک سے زیادہ ڈسکاؤنٹ باری باری کم شدہ قیمت پر لگتے ہیں، جمع نہیں ہوتے — مثلاً 20% پھر 10% کا مطلب 30% ڈسکاؤنٹ نہیں ہوتا۔',
  },
  {
    qEn: 'How much would I save on a discounted item?',
    aEn: 'If a jacket costs Rs. 4,000 and is on a 25% sale, you would save Rs. 1,000, making the final price Rs. 3,000.',
    qUr: 'کسی ڈسکاؤنٹ آئٹم پر میں کتنا بچاؤں گا؟',
    aUr: 'اگر کسی جیکٹ کی اصل قیمت 4,000 روپے ہے اور 25% سیل ہے، تو آپ 1,000 روپے بچائیں گے، اور حتمی قیمت 3,000 روپے ہوگی۔',
  },
  {
    qEn: 'Does this work for reverse discount (finding the original price)?',
    aEn: 'This calculator focuses on finding the final price and savings from the original price and discount percentage you enter.',
    qUr: 'کیا یہ الٹا ڈسکاؤنٹ (اصل قیمت معلوم کرنا) بھی نکال سکتا ہے؟',
    aUr: 'یہ کیلکولیٹر آپ کی درج کردہ اصل قیمت اور ڈسکاؤنٹ فیصد سے حتمی قیمت اور بچت نکالنے پر مرکوز ہے۔',
  },
]

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
      <SeoHead {...SEO.discount} />
      <Breadcrumb toolEn="Discount Calculator" toolUr="ڈسکاؤنٹ کیلکولیٹر" path="/discount-calculator" />
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
          <span className="en-only">✨ Calculate</span>
          <span className="ur-only ur-text">✨ حساب لگائیں</span>
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
    <p>When you know the discount percentage, the final price is the original price minus that percentage. Formula: Final Price = Original Price − (Original Price × Discount% ÷ 100).</p>
    <h2>Example</h2>
    <p>If a jacket originally costs Rs. 4,000 and is on a 25% sale, you save Rs. 1,000, making the final price Rs. 3,000. This calculator does that math instantly, and also works in reverse — enter the final price to find out what discount was applied.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>ڈسکاؤنٹ کا حساب کیسے کام کرتا ہے</h2>
    <p>جب آپ ڈسکاؤنٹ کی فیصد جانتے ہیں، تو حتمی قیمت اصل قیمت میں سے وہ فیصد منہا کر کے حاصل ہوتی ہے۔</p>
    <h2>مثال</h2>
    <p>اگر کسی جیکٹ کی اصل قیمت 4,000 روپے ہے اور 25% سیل ہے، تو آپ 1,000 روپے بچائیں گے، اور حتمی قیمت 3,000 روپے ہوگی۔</p>
  </div>
</article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/discount-calculator" />
    </div>
  )
}