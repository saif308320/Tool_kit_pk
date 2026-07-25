import { useState } from 'react'

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
          <span className="en-only">Calculate EMI</span>
          <span className="ur-only ur-text">قسط کا حساب لگائیں</span>
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
          <p>EMI is the fixed amount you pay every month toward a loan until it is fully repaid.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>ای ایم آئی کیا ہے؟</h2>
          <p>ای ایم آئی وہ مقررہ رقم ہے جو آپ ہر ماہ قرض کی ادائیگی کے لیے دیتے ہیں۔</p>
        </div>
      </article>
    </div>
  )
}