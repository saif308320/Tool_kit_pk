import { useState } from 'react'
import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import FAQ from '../components/FAQ.jsx'
import RelatedCalculators from '../components/RelatedCalculators.jsx'

const PAGE_FAQS = [
  {
    qEn: 'What is the difference between simple and compound interest?',
    aEn: 'Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus any interest already earned, so it grows faster over time.',
    qUr: 'سادہ اور کمپاؤنڈ سود میں کیا فرق ہے؟',
    aUr: 'سادہ سود صرف اصل رقم پر لگتا ہے جبکہ کمپاؤنڈ سود اصل رقم اور جمع شدہ سود دونوں پر لگتا ہے، جس سے رقم تیزی سے بڑھتی ہے۔',
  },
  {
    qEn: 'How often should interest be compounded for the best growth?',
    aEn: 'More frequent compounding (monthly or daily) results in slightly higher returns than annual compounding, since interest gets added to the principal more often.',
    qUr: 'بہترین اضافے کے لیے سود کتنی بار کمپاؤنڈ ہونا چاہیے؟',
    aUr: 'زیادہ بار کمپاؤنڈنگ (ماہانہ یا روزانہ) سالانہ کمپاؤنڈنگ کی نسبت تھوڑا زیادہ منافع دیتی ہے کیونکہ سود جلدی جلدی اصل رقم میں شامل ہوتا ہے۔',
  },
  {
    qEn: 'What is the rule of 72?',
    aEn: 'Dividing 72 by your annual interest rate gives a rough estimate of how many years it will take for your investment to double in value.',
    qUr: '72 کا اصول کیا ہے؟',
    aUr: '72 کو اپنی سالانہ شرح سود سے تقسیم کرنے سے ایک اندازہ ملتا ہے کہ آپ کی سرمایہ کاری کتنے سالوں میں دگنی ہو جائے گی۔',
  },
  {
    qEn: 'Can I use this for both savings and loan calculations?',
    aEn: 'This calculator is designed for showing how savings or investments grow over time; for loan repayment schedules, use the dedicated Loan/EMI calculator instead.',
    qUr: 'کیا میں یہ بچت اور قرض دونوں کے لیے استعمال کر سکتا ہوں؟',
    aUr: 'یہ کیلکولیٹر بچت اور سرمایہ کاری کے بڑھنے کو دکھانے کے لیے ہے؛ قرض کی اقساط کے لیے ہمارا مخصوص Loan/EMI کیلکولیٹر استعمال کریں۔',
  },
]

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [freq, setFreq] = useState('1')
  const [result, setResult] = useState(null)

  function calculate() {
    const p = parseFloat(principal) || 0
    const r = parseFloat(rate) || 0
    const t = parseFloat(years) || 0
    const n = parseFloat(freq) || 1

    const amount = p * Math.pow(1 + (r / 100) / n, n * t)
    const interest = amount - p
    const principalPct = amount > 0 ? Math.round((p / amount) * 100) : 0
    const interestPct = 100 - principalPct

    // Year-by-year growth (capped to 10 rows so long periods stay readable)
    const totalYears = Math.max(1, Math.round(t))
    const step = totalYears > 10 ? Math.ceil(totalYears / 10) : 1
    const rows = []
    for (let y = step; y <= totalYears; y += step) {
      const val = p * Math.pow(1 + (r / 100) / n, n * y)
      rows.push({ year: y, value: val })
    }
    if (rows.length === 0 || rows[rows.length - 1].year !== totalYears) {
      rows.push({ year: totalYears, value: amount })
    }

    setResult({ amount, interest, principal: p, principalPct, interestPct, rows })
  }

  return (
    <div className="calc-wrap">
      <SeoHead {...SEO.compoundInterest} />
      <Breadcrumb toolEn="Compound Interest Calculator" toolUr="کمپاؤنڈ انٹرسٹ" path="/compound-interest-calculator" />
      <div className="calc-header">
        <h1 className="en-only">Compound Interest Calculator</h1>
        <h1 className="ur-only ur-text">کمپاؤنڈ انٹرسٹ کیلکولیٹر</h1>
        <p className="calc-intro en-only">See how your savings or investment grows over time with compound interest.</p>
        <p className="calc-intro ur-only ur-text">معلوم کریں کہ آپ کی بچت یا سرمایہ کاری وقت کے ساتھ کتنی بڑھے گی۔</p>
      </div>

      <div className="calc-box">
        <div className="field">
          <label><span className="en-only">Principal Amount (PKR)</span><span className="ur-only ur-text">اصل رقم (روپے)</span></label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 100000" />
        </div>
        <div className="rate-grid">
          <div className="field">
            <label><span className="en-only">Annual Interest Rate (%)</span><span className="ur-only ur-text">سالانہ شرح سود (%)</span></label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 12" />
          </div>
          <div className="field">
            <label><span className="en-only">Time Period (years)</span><span className="ur-only ur-text">مدت (سال)</span></label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 5" />
          </div>
        </div>
        <div className="field">
          <label><span className="en-only">Compounding Frequency</span><span className="ur-only ur-text">کمپاؤنڈنگ کتنی بار</span></label>
          <select value={freq} onChange={(e) => setFreq(e.target.value)}>
            <option value="1">Annually</option>
            <option value="2">Semi-Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </div>

        <button className="btn" onClick={calculate}>
          <span className="en-only">✨ Calculate</span>
          <span className="ur-only ur-text">✨ حساب لگائیں</span>
        </button>

        {result && (
          <div className="result-box show">
            <div className="label en-only">Final Amount</div>
            <div className="label ur-only ur-text">حتمی رقم</div>
            <div className="value">Rs. {Math.round(result.amount).toLocaleString()}</div>

            <div className="split-bar">
              <div className="split-bar-seg" style={{ width: `${result.principalPct}%`, background: 'linear-gradient(90deg, var(--green), var(--green-dark))' }} />
              <div className="split-bar-seg" style={{ width: `${result.interestPct}%`, background: 'linear-gradient(90deg, var(--gold), #d4a017)' }} />
            </div>
            <div className="split-legend">
              <div className="split-legend-item">
                <span className="split-legend-dot" style={{ background: 'var(--green)' }} />
                <span className="en-only">Principal ({result.principalPct}%)</span>
                <span className="ur-only ur-text">اصل رقم ({result.principalPct}%)</span>
              </div>
              <div className="split-legend-item">
                <span className="split-legend-dot" style={{ background: 'var(--gold)' }} />
                <span className="en-only">Interest Earned ({result.interestPct}%)</span>
                <span className="ur-only ur-text">حاصل شدہ سود ({result.interestPct}%)</span>
              </div>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-value">Rs. {Math.round(result.principal).toLocaleString()}</div>
                <div className="stat-label en-only">Principal Invested</div>
                <div className="stat-label ur-only ur-text">اصل رقم</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-value">Rs. {Math.round(result.interest).toLocaleString()}</div>
                <div className="stat-label en-only">Interest Earned</div>
                <div className="stat-label ur-only ur-text">حاصل شدہ سود</div>
              </div>
            </div>

            {result.rows.length > 1 && (
              <>
                <div className="label en-only" style={{ marginTop: 18 }}>Year-by-Year Growth</div>
                <div className="label ur-only ur-text" style={{ marginTop: 18 }}>سال بہ سال اضافہ</div>
                <div className="timeline">
                  {result.rows.map((row, i) => (
                    <div key={row.year} className={'timeline-item' + (i === result.rows.length - 1 ? ' active' : ' done')}>
                      <div className="timeline-dot" />
                      <div className="timeline-title">Rs. {Math.round(row.value).toLocaleString()}</div>
                      <div className="timeline-sub en-only">Year {row.year}</div>
                      <div className="timeline-sub ur-only ur-text">سال {row.year}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <article className="article">
        <div className="en-only">
          <h2>What is Compound Interest?</h2>
          <p>Compound interest means you earn interest not just on your original amount, but also on the interest already added — so your money grows faster the longer it stays invested. This is often called "interest on interest."</p>
          <h2>Simple vs Compound Interest</h2>
          <p>Simple interest is calculated only on the principal, while compound interest is calculated on principal plus accumulated interest, making it grow exponentially rather than in a straight line.</p>
          <h2>Why does compounding frequency matter?</h2>
          <p>The more often interest compounds — monthly instead of annually, for example — the faster your money grows, since each compounding period adds a little more to the base on which future interest is calculated.</p>
        </div>
        <div className="ur-only ur-text">
          <h2>کمپاؤنڈ انٹرسٹ کیا ہے؟</h2>
          <p>کمپاؤنڈ انٹرسٹ میں آپ کو اصل رقم کے ساتھ ساتھ پہلے حاصل شدہ سود پر بھی سود ملتا ہے، جس سے رقم تیزی سے بڑھتی ہے۔</p>
          <h2>سادہ اور کمپاؤنڈ سود میں فرق</h2>
          <p>سادہ سود صرف اصل رقم پر لگتا ہے جبکہ کمپاؤنڈ سود اصل رقم اور جمع شدہ سود دونوں پر لگتا ہے، جس سے رقم تیزی سے بڑھتی ہے۔</p>
        </div>
      </article>

      <FAQ items={PAGE_FAQS} />
      <RelatedCalculators currentHref="/compound-interest-calculator" />
    </div>
  )
}