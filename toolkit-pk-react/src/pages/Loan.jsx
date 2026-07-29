import { useState } from 'react'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'How is monthly EMI calculated?',
    aEn: 'EMI is calculated based on the loan amount, annual interest rate, and loan tenure in months, using a standard amortization formula.',
    qUr: 'ماہانہ ای ایم آئی کیسے نکالی جاتی ہے؟',
    aUr: 'ای ایم آئی کا حساب قرض کی رقم، سالانہ شرح سود، اور قرض کی مدت (مہینوں میں) کی بنیاد پر لگایا جاتا ہے۔',
  },
  {
    qEn: 'Why do early payments mostly go toward interest?',
    aEn: "In the early months of a loan, more of your EMI goes toward interest since it's calculated on the outstanding principal, which is highest at the start.",
    qUr: 'ابتدائی ادائیگیاں زیادہ تر سود میں کیوں جاتی ہیں؟',
    aUr: 'قرض کے شروع کے مہینوں میں آپ کی ای ایم آئی کا بڑا حصہ سود میں جاتا ہے کیونکہ یہ باقی ماندہ اصل رقم پر لگتا ہے جو شروع میں سب سے زیادہ ہوتی ہے۔',
  },
  {
    qEn: 'Does a longer loan tenure reduce total cost?',
    aEn: 'A longer tenure lowers your monthly EMI but increases the total interest paid over the life of the loan, so overall cost is usually higher.',
    qUr: 'کیا لمبی قرض مدت سے کل لاگت کم ہوتی ہے؟',
    aUr: 'لمبی مدت ماہانہ ای ایم آئی کم کرتی ہے لیکن قرض کی پوری مدت میں ادا کیا گیا کل سود بڑھ جاتا ہے، اس لیے مجموعی لاگت عام طور پر زیادہ ہوتی ہے۔',
  },
  {
    qEn: 'What loan types can I use this calculator for?',
    aEn: 'This works for any fixed-rate installment loan — personal loans, car loans, home loans, or business financing — as long as you know the rate and tenure.',
    qUr: 'یہ کیلکولیٹر کس قسم کے قرضوں کے لیے استعمال کر سکتا ہوں؟',
    aUr: 'یہ کسی بھی فکسڈ ریٹ قسطوں والے قرض کے لیے کام کرتا ہے — ذاتی قرض، گاڑی کا قرض، گھر کا قرض یا کاروباری فنانسنگ — بشرطیکہ آپ کو شرح اور مدت معلوم ہو۔',
  },
]

export default function Loan() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [tenure, setTenure] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    const p = parseFloat(principal) || 0
    const annualRate = parseFloat(rate) || 0
    const years = parseFloat(tenure) || 0

    if (p <= 0 || years <= 0) {
      setResult({ emi: 0, totalInterest: 0, totalPayment: 0 })
      return
    }

    const months = years * 12
    const monthlyRate = (annualRate / 100) / 12
    let emi
    if (monthlyRate === 0) {
      emi = p / months
    } else {
      const factor = Math.pow(1 + monthlyRate, months)
      emi = (p * monthlyRate * factor) / (factor - 1)
    }
    const totalPayment = emi * months
    const totalInterest = totalPayment - p
    const interestPct = totalPayment > 0 ? Math.round((totalInterest / totalPayment) * 100) : 0
    setResult({ emi, totalInterest, totalPayment, interestPct })
  }

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.loan} />
      <Breadcrumb toolEn="Loan / EMI Calculator" toolUr="قرض / قسط کیلکولیٹر" path="/loan-calculator" />
      <div className="calc-header">
        <h1 className="en-only">Loan / EMI Calculator</h1>
        <h1 className="ur-only ur-text">قرض / قسط کیلکولیٹر</h1>
        <p className="calc-intro en-only">Enter your loan amount, interest rate, and tenure to see your EMI, total interest, and total repayment.</p>
        <p className="calc-intro ur-only ur-text">اپنی قرض کی رقم، شرح سود اور مدت درج کریں۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Loan amount (PKR)</span><span className="ur-only ur-text">قرض کی رقم (روپے)</span></label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 1000000" />
        </div>
        <div className="rate-grid" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div className="field">
            <label><span className="en-only">Annual interest rate (%)</span><span className="ur-only ur-text">سالانہ شرح سود (%)</span></label>
            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 20" />
          </div>
          <div className="field">
            <label><span className="en-only">Loan tenure (years)</span><span className="ur-only ur-text">قرض کی مدت (سال)</span></label>
            <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="e.g. 5" />
          </div>
        </div>

        <button className="btn" onClick={calculate}>
          <span className="en-only">✨ Calculate EMI</span>
          <span className="ur-only ur-text">✨ قسط کا حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="ring" style={{ '--pct': result.interestPct, '--ring-color': '#f59e0b', '--ring-track': '#fef3c7' }}>
              <div className="ring-inner">
                <span className="ring-value">{result.interestPct}%</span>
                <span className="ring-caption en-only">is interest</span>
                <span className="ring-caption ur-only ur-text">سود</span>
              </div>
            </div>
            <div className="label en-only">Monthly Installment (EMI)</div>
            <div className="label ur-only ur-text">ماہانہ قسط</div>
            <div className="value">Rs. {Math.round(result.emi).toLocaleString()}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 16, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
                  <span className="en-only">Total Interest</span><span className="ur-only ur-text">کل سود</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Rs. {Math.round(result.totalInterest).toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
                  <span className="en-only">Total Payment</span><span className="ur-only ur-text">کل ادائیگی</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Rs. {Math.round(result.totalPayment).toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </div>
<article className="article">
  <div className="en-only">
    <h2>What is EMI?</h2>
    <p>EMI (Equated Monthly Installment) is the fixed amount you pay every month toward a loan — whether it's for a car, house, or personal loan — until the entire amount, including interest, is fully repaid. Each EMI payment covers a portion of the principal (the amount you borrowed) and a portion of the interest charged by the lender.</p>
    <h2>How is EMI calculated?</h2>
    <p>EMI is calculated using the loan amount (principal), the annual interest rate, and the loan tenure (in months). In the early months of a loan, a larger share of your EMI goes toward interest; as the loan progresses, more of it goes toward the principal. This is known as amortization.</p>
    <h2>Fixed-rate vs reducing-balance loans</h2>
    <p>Most banks in Pakistan use the reducing-balance method, meaning interest is charged only on the outstanding principal, not the original loan amount. This usually results in a lower total interest cost compared to flat-rate loans.</p>
  </div>
  <div className="ur-only ur-text">
    <h2>ای ایم آئی کیا ہے؟</h2>
    <p>ای ایم آئی وہ مقررہ رقم ہے جو آپ ہر ماہ قرض کی ادائیگی کے لیے دیتے ہیں — چاہے وہ گاڑی، گھر یا ذاتی قرض ہو — جب تک پوری رقم سود سمیت ادا نہ ہو جائے۔ ہر قسط میں اصل رقم کا کچھ حصہ اور سود کا کچھ حصہ شامل ہوتا ہے۔</p>
    <h2>ای ایم آئی کا حساب کیسے لگایا جاتا ہے؟</h2>
    <p>ای ایم آئی کا حساب قرض کی رقم، سالانہ شرح سود، اور قرض کی مدت (مہینوں میں) کی بنیاد پر لگایا جاتا ہے۔ شروع کے مہینوں میں زیادہ رقم سود میں جاتی ہے، اور بعد میں زیادہ رقم اصل قرض کم کرنے میں۔</p>
  </div>
</article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/loan-calculator" />
    </div>
  )
}