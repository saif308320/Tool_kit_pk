import { useState } from 'react'
import Select from '../components/Select.jsx'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'How is salary tax calculated in Pakistan?',
    aEn: 'Pakistan uses a slab-based system where your annual taxable income is taxed at increasing rates as it crosses each threshold, similar to most countries.',
    qUr: 'پاکستان میں تنخواہ ٹیکس کیسے نکالا جاتا ہے؟',
    aUr: 'پاکستان میں سلیب کی بنیاد پر نظام ہے جہاں آپ کی سالانہ قابل ٹیکس آمدنی مختلف حدوں کو عبور کرنے پر بڑھتی ہوئی شرح سے ٹیکس ادا کرتی ہے۔',
  },
  {
    qEn: 'What are the current tax slabs?',
    aEn: 'As a general guide: income up to Rs. 600,000 annually is tax-free at 0%, Rs. 600,001–1,200,000 is taxed at 1%, and Rs. 1,200,001–2,200,000 at Rs. 6,000 plus 11% of the amount above 1,200,000.',
    qUr: 'موجودہ ٹیکس سلیبز کیا ہیں؟',
    aUr: 'عمومی رہنمائی کے طور پر: 600,000 روپے تک سالانہ آمدنی 0% ٹیکس فری ہے، 600,001–1,200,000 پر 1%، اور 1,200,001–2,200,000 پر 6,000 + 11% ٹیکس لگتا ہے۔',
  },
  {
    qEn: 'Do tax slabs change every year?',
    aEn: "Yes, tax slabs are typically revised in each year's Federal Budget, so always verify current rates with FBR before making financial decisions.",
    qUr: 'کیا ٹیکس سلیبز ہر سال بدلتے ہیں؟',
    aUr: 'جی ہاں، ٹیکس سلیبز عام طور پر ہر سال کے وفاقی بجٹ میں نظرثانی ہوتے ہیں، اس لیے مالی فیصلوں سے پہلے ایف بی آر سے موجودہ شرحیں ضرور چیک کریں۔',
  },
  {
    qEn: 'Is this calculator a substitute for professional tax advice?',
    aEn: 'No, this gives a quick estimate only — for exact tax filing and deductions specific to your situation, consult a qualified tax accountant or FBR directly.',
    qUr: 'کیا یہ کیلکولیٹر پیشہ ور ٹیکس مشورے کا متبادل ہے؟',
    aUr: 'نہیں، یہ صرف فوری تخمینہ دیتا ہے — درست ٹیکس فائلنگ اور آپ کی صورتحال کے مطابق کٹوتیوں کے لیے کسی مستند ٹیکس اکاؤنٹنٹ یا ایف بی آر سے رجوع کریں۔',
  },
]

const TYPE_OPTIONS = [
  { value: 'monthly', label: 'Monthly', icon: '📅' },
  { value: 'annual', label: 'Annual', icon: '🗓️' },
]

function computeAnnualTax(annualIncome) {
  let tax = 0
  let slabLabel = ''
  if (annualIncome <= 600000) { tax = 0; slabLabel = '0% slab' }
  else if (annualIncome <= 1200000) { tax = (annualIncome - 600000) * 0.01; slabLabel = '1% slab' }
  else if (annualIncome <= 2200000) { tax = 6000 + (annualIncome - 1200000) * 0.11; slabLabel = '11% slab' }
  else if (annualIncome <= 3200000) { tax = 116000 + (annualIncome - 2200000) * 0.23; slabLabel = '23% slab' }
  else if (annualIncome <= 4100000) { tax = 346000 + (annualIncome - 3200000) * 0.30; slabLabel = '30% slab' }
  else { tax = 616000 + (annualIncome - 4100000) * 0.35; slabLabel = '35% slab' }

  let surcharge = 0
  if (annualIncome > 10000000) surcharge = tax * 0.09
  return { tax: tax + surcharge, slabLabel, surcharge }
}

export default function Tax() {
  const [type, setType] = useState('monthly')
  const [salary, setSalary] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    const inputVal = parseFloat(salary) || 0
    const annualIncome = type === 'monthly' ? inputVal * 12 : inputVal
    const { tax, slabLabel, surcharge } = computeAnnualTax(annualIncome)
    const monthlyTax = tax / 12
    const netMonthly = (annualIncome / 12) - monthlyTax
    setResult({ monthlyTax, annualTax: tax, netMonthly, slabLabel, surcharge, annualIncome })
  }

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.tax} />
      <Breadcrumb toolEn="Salary Tax Calculator" toolUr="تنخواہ ٹیکس کیلکولیٹر" path="/salary-tax-calculator" />
      <div className="calc-header">
        <h1 className="en-only">Salary Tax Calculator</h1>
        <h1 className="ur-only ur-text">تنخواہ ٹیکس کیلکولیٹر</h1>
        <p className="calc-intro en-only">Based on the latest FBR tax slabs for Tax Year 2025–26.</p>
        <p className="calc-intro ur-only ur-text">ایف بی آر کے تازہ ترین ٹیکس سلیبز برائے سال 2025-26 کے مطابق۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Salary type</span><span className="ur-only ur-text">تنخواہ کی قسم</span></label>
          <Select options={TYPE_OPTIONS} value={type} onChange={setType} />
        </div>
        <div className="field">
          <label>
            <span className="en-only">{type === 'monthly' ? 'Monthly salary (PKR)' : 'Annual salary (PKR)'}</span>
            <span className="ur-only ur-text">{type === 'monthly' ? 'ماہانہ تنخواہ (روپے)' : 'سالانہ تنخواہ (روپے)'}</span>
          </label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. 250000" />
        </div>

        <button className="btn" onClick={calculate}>
          <span className="en-only">✨ Calculate Tax</span>
          <span className="ur-only ur-text">✨ ٹیکس کا حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">Monthly Tax Deduction</div>
            <div className="label ur-only ur-text">ماہانہ ٹیکس کٹوتی</div>
            <div className="value">Rs. {Math.round(result.monthlyTax).toLocaleString()}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 16, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
                  <span className="en-only">Annual Tax</span><span className="ur-only ur-text">سالانہ ٹیکس</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Rs. {Math.round(result.annualTax).toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
                  <span className="en-only">Net Monthly</span><span className="ur-only ur-text">ماہانہ نیٹ</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Rs. {Math.round(result.netMonthly).toLocaleString()}</div>
              </div>
            </div>
            <div className="badge-pill info">
              <span className="badge-icon">🧾</span>
              <span className="en-only">
                You fall in the {result.slabLabel} based on your annual income of Rs. {Math.round(result.annualIncome).toLocaleString()}.
                {result.surcharge > 0 && ` A 9% surcharge (Rs. ${Math.round(result.surcharge).toLocaleString()}) also applies.`}
              </span>
              <span className="ur-only ur-text">آپ {result.slabLabel} میں آتے ہیں۔</span>
            </div>
          </div>
        )}
      </div>

    <article className="article">
  <div className="en-only">
    <h2>How is income tax calculated in Pakistan?</h2>
    <p>Pakistan uses a progressive tax slab system for salaried individuals, meaning your income is taxed at increasing rates as it crosses each slab threshold — not a single flat rate on your entire salary. Only the portion of income above each threshold is taxed at the next higher rate.</p>
    <h2>Current FBR Tax Slabs (Tax Year 2025–26)</h2>
    <p>
      Up to Rs. 600,000/year — 0%<br/>
      Rs. 600,001 – 1,200,000 — 1% of amount exceeding Rs. 600,000<br/>
      Rs. 1,200,001 – 2,200,000 — Rs. 6,000 + 11%<br/>
      Rs. 2,200,001 – 3,200,000 — Rs. 116,000 + 23%<br/>
      Rs. 3,200,001 – 4,100,000 — Rs. 346,000 + 30%<br/>
      Above Rs. 4,100,000 — Rs. 616,000 + 35%
    </p>
    <p style={{ fontSize: 13, color: 'var(--muted)' }}>Note: Tax slabs may change annually — verify with FBR's official circular.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>پاکستان میں انکم ٹیکس کیسے شمار ہوتا ہے؟</h2>
    <p>پاکستان میں تنخواہ دار افراد کے لیے پروگریسو ٹیکس سلیب سسٹم استعمال ہوتا ہے، یعنی جیسے جیسے آمدنی بڑھتی ہے، اضافی رقم پر زیادہ شرح سے ٹیکس لگتا ہے۔</p>
    <h2>موجودہ ایف بی آر ٹیکس سلیبز</h2>
    <p>600,000 روپے تک — 0%<br/>600,001 – 1,200,000 — 1%<br/>1,200,001 – 2,200,000 — 6,000 + 11%</p>
  </div>
</article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/salary-tax-calculator" />
    </div>
  )
}