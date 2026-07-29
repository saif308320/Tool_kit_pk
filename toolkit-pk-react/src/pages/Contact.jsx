import SeoHead from '../components/SeoHead.jsx'
import { SEO } from '../seoData.js'

export default function Contact() {
  return (
    <div className="static-page">
      <SeoHead {...SEO.contact} />
      <h1 className="en-only">Contact Us</h1>
      <h1 className="ur-only ur-text">ہم سے رابطہ کریں</h1>

      <div className="en-only">
        <p>Have a question, suggestion, or found a bug on one of our calculators? We would love to hear from you — your feedback directly shapes which tools we build next.</p>

        <h2>Email</h2>
        <p>The fastest way to reach us is email: <a href="mailto:toolkitpk.com@gmail.com" style={{ color: 'var(--green)' }}>toolkitpk.com@gmail.com</a></p>

        <h2>What to include</h2>
        <p>If you're reporting a bug, please mention which calculator you were using, what device/browser you're on, and what result you expected versus what you got — this helps us fix things faster.</p>

        <h2>Response time</h2>
        <p>We typically reply within 2–3 business days. Business or advertising inquiries are also welcome at the same address.</p>
      </div>

      <div className="ur-only ur-text">
        <p>کوئی سوال، تجویز ہے، یا کسی کیلکولیٹر میں کوئی مسئلہ نظر آیا ہے؟ ہمیں ضرور بتائیں — آپ کی رائے سے ہمیں اگلے ٹولز بنانے میں مدد ملتی ہے۔</p>

        <h2>ای میل</h2>
        <p>ہم سے رابطے کا تیز ترین طریقہ ای میل ہے: <a href="mailto:toolkitpk.com@gmail.com" style={{ color: 'var(--green)' }}>toolkitpk.com@gmail.com</a></p>

        <h2>کیا شامل کریں</h2>
        <p>اگر آپ کسی خرابی کی اطلاع دے رہے ہیں تو براہ کرم بتائیں کہ آپ کون سا کیلکولیٹر استعمال کر رہے تھے اور کیا نتیجہ متوقع تھا۔</p>

        <h2>جوابی وقت</h2>
        <p>ہم عام طور پر 2 سے 3 کاروباری دنوں میں جواب دیتے ہیں۔</p>
      </div>
    </div>
  )
}